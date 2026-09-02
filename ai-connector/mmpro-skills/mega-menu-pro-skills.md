---
icon: sparkles
---

# AI Skills Reference

Entry point for configuring DWC Mega Menu Pro + Header Builder in Etch via the etch-connector.

**This file is short on purpose. Read all of it, then read only what it sends you to.**

The detail lives in two companions in this same folder:

| File | What it is | When to read it |
| --- | --- | --- |
| `mega-menu-pro-skills-build.md` | The full workflow, API surface, block shapes, rules and gotchas | In full, on the build path only |
| `mega-menu-pro-skills-reference.md` | Prop tables, special styles, JS config, appendices | Never in full. Grep one section |

***

## Which path are you on

**Correction path** — you are changing something that already exists: a prop value, a colour, a
size, a class. The structure is built and you are adjusting it.

**Build path** — you are creating structure that does not exist yet: new panels, new items, a new
header, or a rebuild.

If you cannot tell, you are on the build path. If a correction turns out to need new structure, stop
and switch at that point rather than guessing wide at the start.

***

## Correction path

Read these three things and nothing else:

1. **The invariants below.** They are the whole of what fails silently.
2. **Section 6 (Rules & gotchas) in `mega-menu-pro-skills-build.md`**, grepped for the feature you
   are touching. Not the whole file.
3. **One row of Section 4** in the reference file, for the prop you are changing, after the
   fingerprint check below.

Then find the specific block you are editing by name or selector, change it, save, verify, stop.

**Do not** read the build file end to end, dump component schemas, walk the whole block tree, or
inventory anything you are not touching. A one-value change does not justify a full read; on a short
session that preamble is most of what the user pays for.

### Invariants that apply on every path

* **Group attributes take exactly one extra brace layer:** `'{' + JSON.stringify(obj) + '}'`.
  Triple braces mean the group never evaluates and the panel never renders. No error is thrown.
* **Select values are the right-hand side of ` : ` in the prop table**, never the UI label.
  `Expand Down (from Header) : expand down` stores `expand down`. A label silently falls back.
* **A classed node needs both `attributes.class` and a `styles[]` entry.** One without the other
  renders unstyled and reads back as fine.
* **Compare a default against what the block currently HOLDS, not against what you want.** A
  Dropdown sitting on `click` does not become `both` because `both` is the default.
* **Component IDs are install-local.** Resolve by name every session. Never paste an ID from any
  document, including this one.
* **`saveAsync()` before you verify.** An unsaved change reads back perfectly from `getJson`,
  because that reads the editor, not the database.
* **A value that persisted is not a value that rendered.** A read-back proves configuration only.
  Say which level you reached.

### Before any prop work: check the fingerprints

Section 4 of the reference file carries one fingerprint per component. Confirm it describes this
install, then dump nothing.

```js
function flatten(props, path = '', out = []) {
  for (const p of props || []) {
    const k = (p.type && p.type.specialized) || '';
    if (k === 'group')     { flatten(p.properties, path + p.key + '.', out); continue; }
    if (k === 'condition') { flatten(p.properties, path, out); continue; }
    if (!p.key) continue;
    const def = k === 'class' ? '<local>' : (p.default ?? '');
    out.push(path + p.key + '|' + def + '|' + (p.selectOptionsString ?? ''));
  }
  return out;
}
const hash = (s) => { let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(36); };
const out = {};
for (const c of etch.components.list()) {
  if (!/^DWC /.test(c.name)) continue;
  const rows = flatten(etch.components.getJson(c.id).properties);
  out[c.name] = rows.length + ':' + hash(rows.sort().join('\n'));
}
return JSON.stringify(out);
```

All match → the table is exact, read your row and write. A component disagrees → dump **only that
component** and treat live as authoritative for it.

### Running a script

**Make yourself a working subdirectory** and keep every temporary script in it, then delete the
directory when you are done. A shared working directory may hold other people's files, and a bare
filename lands wherever the current directory happens to be, which on a workspace holding several
projects is routinely the wrong repo.

Write the script to a file with your file-writing tool, never a shell heredoc, then:

```
npx @digital-gravy/etch-connector eval -t "your-site.com" -f "C:/absolute/path/to/script.js"
```

Absolute path, no `cd` prefix. No IIFE: the connector already runs the body as an async function, so
a wrapper returns an unresolved Promise and the eval yields `null`. Use top-level `await`/`return`.
Delete the script when it has run.

**Use `node` for any scripting or parsing. Never `python` or `jq`.** Node is guaranteed, because the
connector runs on it; nothing else is installed on every machine. Do not check whether an
alternative exists either, since a probe costs the same round trip as the failure it avoids.

### When the page disagrees with the editor

Cheapest cause first, stop at the first hit: **did you save**, **is it cached** (`cf-cache-status`),
**are you on the right page** (a published page names itself in its `link: <.../wp-json/wp/v2/pages/N>`
header; the builder's `post_id` is not necessarily it). Three checks is the budget. If none explains
it, report the discrepancy and stop. Never sweep other pages or audit the site.

***

## Build path

Read `mega-menu-pro-skills-build.md` in full, then follow its workflow from "START HERE". The cost is
real and it is paid once against hours of work. Everything above still applies.

***

## Agent Skills Update

Where you record a finding depends on the session, and you decide that before writing anything. A
session is a **developer** session when `MMPRO ETCH/mmpro-dev-context.md` is found by searching
upward from this file's folder, and a **user** session otherwise.

| Session | Record findings in | Never edit |
| --- | --- | --- |
| **Developer** | these skills files, routed by the table in the build file | `mmpro-user-context.md` |
| **User** | `mmpro-user-context.md`, in this folder | these skills files or `components/` |

**If you cannot tell, treat it as a user session.** On a user install these files are released
artifacts: the next update overwrites them, so an edit is lost and leaves that install silently
diverged in the meantime.

**Ask before you write, in either session.** Never edit a skills file or `mmpro-user-context.md`
on your own initiative. Show the person the exact text you want to add or change, say which file
and which section it belongs in, and wait for them to agree.

This is not politeness. You are proposing a permanent rule from a single session, and you are the
worst placed to judge whether it generalises: what looks like a discovery is often this install,
this theme, or your own earlier mistake. The developer knows which it is and you do not. A wrong
rule written into these files is worse than no rule, because every later session reads it as
settled fact and works around a problem that was never real.

Show the diff, name the file, wait. If the answer is no, drop it rather than recording it
somewhere else.

***

## Before you say you are done

End every task with a short report. Four lines, not a paragraph.

**Time.** Take a timestamp before your first connector call and another at the end, and give
the elapsed figure. Do not estimate it from memory afterwards.

```bash
date +%s        # before you start, and again at the end
```

**Round trips.** How many connector calls you made. This is the number that tracks what the
task cost, because each one is a full request. A build that took twelve calls and one that took
three are not the same task, whatever the clock says.

**What changed.** Blocks, props and style entries you touched, by name. If you replaced or deleted
anything, say so first.

**What you verified, and how.** Say which level you reached. A read-back proves a value persisted;
only looking at the rendered page proves it is right. If you could not check something, name it as
unverified rather than leaving it inside a list of things that sound checked.

**Do not report tokens or cost.** You have no way to measure either, and a number you cannot
measure is a number you invented. The real figures are in the `/cost` command, which reads the
tool's own accounting.

Example:

```
7m 51s, 9 connector calls.
Built: 1 wrapper, 1 slider, 7 slides, 11 style entries.
Verified: rendered. Screenshot of the published page, dots measured at 10x10.
Unverified: the builder view, which needs your session.
```

