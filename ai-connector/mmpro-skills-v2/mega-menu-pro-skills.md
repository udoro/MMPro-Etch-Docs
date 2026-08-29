---
icon: sparkles
---

# AI Skills Reference (v2 candidate)

> **STOP. Do not read this file linearly.**
>
> Read **only as far as "First, decide which path you are on"**, a few lines below, and choose. Then
> read what that section sends you to and nothing else.
>
> Reading straight through costs tens of thousands of tokens before you have decided whether you
> even need them. On a small correction that preamble is most of what the user pays for, and it is
> the single most common way an agent wastes a session here. A truncated first read is not a reason
> to keep paging: it means you started in the wrong place.

Standalone reference for configuring DWC Mega Menu Pro + Header Builder in Etch via the
etch-connector.

## How this file is used

The rule this replaced was "re-read all 1,383 lines before any edit". That rule existed for a real
reason: agents read the skills once, then drift back onto general web-development instinct as a
session runs, and start guessing facts they had already been told. Reading once was demonstrably not
enough, and the full re-read is what stopped it.

**How you re-ground is not the mechanism. Restating the rule is.** Before every mutation you write a
Pre-Script Declaration naming the invariants that apply and quoting each one **verbatim, with its
ID**. That restatement is the anti-drift step, and it is required every time, without exception.

Whether those words come from a fresh read of this file or from the copy already in your context
does not matter and cannot be checked from outside. **What matters is that the quote is exact.** So
the test is on you: if you cannot reproduce a rule word for word, or what you wrote is a paraphrase,
you have already lost it. Re-read that rule here before you proceed. A paraphrased quote is a hard
stop, not a stylistic preference.

Re-reading on a schedule you satisfy from memory protects nothing. Re-reading the moment you notice
you cannot quote a rule protects exactly the case the rule exists for.

**The frequency has not changed. You still re-ground before every mutation.** What changed is the
volume, and how you know what to re-read, because a drifted agent cannot be asked to choose what it
needs: it will not look up a rule it has forgotten exists. So the choice is made for you, from two
things you can observe rather than recall.

| When | What you read | How it is chosen |
| --- | --- | --- |
| Once, at session start | This whole core file | Fixed. It is roughly 700 lines and includes connector setup, the API surface and the block node shape. |
| **Before every mutation** | The **§0 Operating Invariants** that apply, quoted verbatim by ID | Fixed. 24 entries, about one page. No decision to make. |
| **Before every mutation** | The **§0.1 Method Index** rows matching the `etch.*` calls in your draft | Read off your own draft, not recalled. You cannot be wrong about which methods your own script calls. |
| When the task matches a row | The **§0.2 Task Index** target, in the reference file | The task you were given. |

So the per-mutation cost is the card plus a few index rows, not the whole file. That is the only
thing being economised. Everything the old full re-read was protecting is still re-read.

§0 carries exactly two kinds of rule, and the boundary is not a matter of taste:

* **Intent invariants**, which no index can route to, because nothing in a script's syntax reveals
  that you were about to skip Tier 1 of the hierarchy.
* **Silent-failure invariants**, where being wrong throws no error and shows no symptom, so nothing
  will correct you.

A rule that **fails loudly** is deliberately not on the card. A missing `children: []` throws
`expected array, received undefined` and teaches you on the spot, so re-reading it every time buys
nothing. The card stays short or it stops being read, which is the failure mode that started this.

Everything else lives in `mega-menu-pro-skills-reference.md`, in this same folder. It is lookup-only
and is never read in full.

***

## 0. Operating Invariants (quote from this section before every mutation)

Twenty-four rules. Cite them by ID in the Pre-Script Declaration. Full detail for any of them is in
Section 6b of the reference file.

### Part A — intent invariants

No index can route to these, because nothing in a script reveals the intent behind it.

| ID | Rule | Why it is here |
| --- | --- | --- |
| **INV-01** | Work down the hierarchy: native prop, then a `--var` in a `.dwc-*-vars` entry, then a custom stylesheet you create, then JS config. Never skip a tier without stating why the tier above cannot do it. | Skipping tiers is the signature failure. Nothing in the code shows you skipped. |
| **INV-02** | Compare the default against what the block currently HOLDS, not against what you want. Leave a prop alone when it is unset or already correct; write it when the stored value differs, even if the value you need is the default. | "It's the default, skip it" applied to a prop holding a conflicting value silently leaves the old value in place. |
| **INV-03** | When a prop has a Nav-level global and a per-item local version, set the global. Use a local only when that one item genuinely differs. Exception: DWC Dropdown's `dropdownTriggerMode` has no inherit option, so the Nav-level global for it is inert and the per-item value is correct. | The local silently overrides the global, so the mistake is invisible later. |
| **INV-04** | Build a new mega menu from scratch. Never duplicate an existing one to make a template. | A duplicate carries the source's class names and shares its style entries. |
| **INV-05** | Never hand-write global stylesheet CSS for anything a prop or a `--var` can do. | This is what skipping INV-01 looks like in the output. |
| **INV-06** | **Never read the `DWC Mega Menu` stylesheet, and never edit or append to it.** If you need a CSS-level fact it would answer, treat that as a documentation gap: say plainly what you needed and could not find, then proceed on documented behaviour or stop. Never infer prop behaviour from product CSS. | It is the implementation, not the interface. Anything inferred from it can be wrong now, and goes silently stale at the next plugin update. |
| **INV-07** | Never delete or remove a native grouped prop as a cleanup step. Leave it disabled instead. | "Tidying" conflicting legacy values destroys working configuration. |
| **INV-08** | Delete every temporary script the moment it has run, and report the filenames deleted. | Nothing else cleans them up. |

### Part B — silent-failure invariants

Being wrong about any of these throws no error and shows no symptom in the API response.

| ID | Rule | The silence |
| --- | --- | --- |
| **INV-09** | Group attributes take exactly **one** extra brace layer: `'{' + JSON.stringify(obj) + '}'`. `JSON.stringify` already supplies its own braces. | Triple braces mean `megaMenu.enable` never evaluates true and the panel never renders. No error. |
| **INV-10** | Every classed node passed to `create()`/`replace()` needs **both** `attributes.class` and a matching `styles: [styleId]`. Use the `el()` helper; never hand-roll one that sets only one. | A node with `styles[]` and no `class` saves with no error and renders with zero CSS. |
| **INV-11** | Select values come from the right side of ` : ` in the prop table’s Values column, never from the UI label. Read the row before setting any select prop. | A label silently falls back to the default. `Left` fails where `left` works. |
| **INV-12** | On a multi-segment prop path, check each wrapper's `type.specialized` individually. `condition` flattens away; `group` is a real nesting level. | A wrongly flattened group round-trips fine through `getAttribute` and saves cleanly, and the component keeps using defaults. |
| **INV-13** | Component props live in `attributes`. The element tag is `tag`. There is no `n.props` and no `n.tagName`. | Both read `undefined`, the components look empty, and you conclude the menu is custom and start hand-writing CSS. |
| **INV-14** | Component IDs and style-entry IDs are site-specific. Resolve components by name and style entries by selector, every session. Never reuse a block ID across a reload. | Hardcoded IDs find nothing, which reads as "no header on this page". |
| **INV-15** | Never `replace()` a populated block. It resets every attribute on every node in the subtree. To change copy, use `setText` on the text node. | It silently wipes user edits: a swapped image, a changed link, a renamed class. |
| **INV-16** | `addClass` changes the HTML class only and does not touch `styles[]`. `setAttribute(id, 'class', …)` does not persist at all. | The class looks right and the CSS is never emitted. |
| **INV-17** | `etch.styles.create(selector, css)` takes a CSS **string** as the second argument, never an object. | An object reaches PHP as an array and takes the front end down with a critical error. |
| **INV-18** | `etch.styles.setVariable` targets `:root` custom properties. It cannot reach a variable declared inside a style entry, and certainly not one inside a nested block. Read, string-replace, `styles.update`. | It succeeds, writes a `:root` property nothing reads, and the value on screen does not move. |
| **INV-19** | A component block created with `children: []` has no accessible slots in the same script. Include the `etch/slot-content` children at create time, each with a placeholder. | The slot lookup returns `undefined` with no explanation. |
| **INV-20** | Select a slot by its `slotName` field, never by child index. | Index order is not guaranteed, and the wrong slot accepts the content silently. |
| **INV-21** | `copy()`/`pasteAsync()` re-maps block IDs but **not** style-entry IDs. Never use it to clone a panel you intend to restyle independently. | The clone shares live CSS with its source, so editing one edits both. |
| **INV-22** | Percent-encode data-URI SVG: `'data:image/svg+xml,' + encodeURIComponent(svg)`. Never `;utf8,` with raw markup. | Chrome refuses to load it and the pseudo-element or mask simply renders nothing. |
| **INV-23** | For mega menu width use `#dwc-header`, or `.dwc-nest-header` when the overlay header has a constrained width. Never `%` or `100vw`. | `#dwc-header` under a constrained overlay silently spans the full viewport instead of the header. |
| **INV-24** | **A value that persisted is not a value that rendered.** A `getJson`/`getAttribute` read-back is configuration verification only. Never report a change as working on the strength of a read-back. | Every one of the failures above passes a read-back. |

***

## 0.1 Method Index — routed by your own draft script

List the `etch.*` methods your draft calls. You are reading that off the code in front of you, so
you cannot be wrong about the input, and you do not need to know which rules exist. Re-read the
invariants named on each matching row, plus the reference section where a row points to one.

| Method you are about to call | Re-read | Detail |
| --- | --- | --- |
| `blocks.create()` | INV-09, INV-10, INV-19, INV-20 | Ref 9 (A.1 node shapes, A.3 minimal test) |
| `blocks.replace()` | INV-09, INV-10, INV-15, INV-20 | Ref 9 (A.3a build-one-verify-scale) |
| `blocks.update()` | INV-16 | Section 6: `styles` is not part of `BlockPatch` |
| `blocks.setAttribute()` | INV-11, INV-16 | Section 6: select values, class key |
| `blocks.getAttribute()` / `getGroup` | INV-09, INV-12 | Section 6: encoding, condition vs group |
| `setGroup` | INV-09, INV-12 | Section 6: group attribute encoding |
| `blocks.addClass()` / `removeClass()` | INV-16 | Section 6: the `styles[]` gap |
| `blocks.setText()` | INV-15 | Section 6: text-node walk for mixed content |
| `blocks.delete()` | INV-07 | Ref 2a |
| `blocks.copy()` / `pasteAsync()` | INV-21 | Ref 9 (A.6 copy/paste verification) |
| `blocks.duplicate()` | INV-04, INV-21 | Ref 2a |
| `blocks.move()` | — | Section 6: `WRONG_BLOCK_TYPE` parents |
| `styles.create()` | INV-17 | Section 6 |
| `styles.update()` | INV-18 | Ref 3b: read, string-replace, update |
| `styles.setVariable()` | INV-18 | Section 6 |
| `stylesheets.appendAsync()` | INV-05, INV-06 | Section 6: no `update()` exists |
| `components.updateAsync()` | — | Ref 3b: add a prop, modify a component script |
| `history.undo()` / `redo()` | — | Section 6: return void, do not await |
| `saveAsync()` | INV-24 | Section 6: persistence model, which namespaces buffer |

If a method you are calling has no row, that is a gap in this index, not permission to guess. Grep
the reference for the method name before writing the call, then add the row per the Skills Update
rule below.

## 0.2 Task Index — routed by the task you were given

| If the task is... | Read | Also re-read |
| --- | --- | --- |
| Build a new mega menu template | Section 2 (this file) | INV-04, INV-10, INV-19 |
| Rename a class family on existing blocks | Ref 2a | INV-16 |
| Build a themed (light/dark) variant of a panel | Ref 2a | INV-21 |
| Duplicate an existing menu because the user insisted | Ref 2a | INV-04, INV-21 |
| Map a free-form design brief onto settings | Section 2 goal-to-action table + worked example (this file) | INV-01, INV-05 |
| Find the prop that controls a specific behaviour | Ref 4, then `../components/` | INV-11 |
| Style before/after scroll, sticky or overlay states | Ref 5 | INV-01 |
| Add a brand-new prop to a component | Ref 3b, Ref 4 | INV-01 |
| Reach a `DwcConfig` option with no prop equivalent | Ref 7 | INV-01 (this is Tier 4, justify it) |
| Apply or capture a template | Ref 8 | — |

***

## START HERE — mandatory workflow

### First, decide which path you are on. This changes what you read.

**Building something new, changing structure, or you cannot tell yet** → the full-read path below.
Read this file end to end. The cost is real but it is paid once against hours of work.

**Making a targeted change to work that already exists** → the correction path. Jump straight to
**"Returning to existing work"** further down, read only the three things it lists, and do not read
this file in full. A two-line fix does not justify a full read plus a schema dump; on a short session
that preamble is most of what the user pays for.

**How to tell them apart:** if the thing you are changing is already built and you are adjusting it,
you are on the correction path. If you are creating panels, items, or structure that does not exist
yet, you are on the build path. When a "correction" turns out to need new structure, stop and switch
paths at that point, rather than guessing wide at the start.


Execute these sequentially. You are forbidden from modifying any workspace file or generating
styling code until Steps 1 through 4 are complete and validated against live output.

### 0. Ground yourself

1. **Quote the applicable §0 Operating Invariants.** Before every mutation, on both paths.
   Name them by ID and reproduce each one word for word; if you cannot, re-read it here first.
2. **Read the §0.1 Method Index rows** matching the `etch.*` calls your draft script will make, and
   the §0.2 Task Index row if the task matches one.
3. **Follow every reference pointer those rows give you** before writing the call, not after.
4. If the task involves grouped props (`megaMenu`, `general`, `inBuilder`, `classes`, `relocation`),
   use `getGroup`/`setGroup` from Section 3. Never raw `setAttribute` on a group key.
5. If no helper is documented for the prop you need, stop. Do not mutate grouped props until you
   have confirmed the pattern.

> Example: set `megaMenu` on DWC Dropdown using the documented helper, not direct raw JSON.
> ```js
> setGroup(dropdownId, 'megaMenu', {
>   enable: '{true}',
>   width: '#dwc-header',
>   breakout: '{false}'
> });
> ```

---

### ⚠ PRE-SCRIPT DECLARATION — mandatory before writing any connector script

You are **strictly forbidden** from writing or executing any connector script until you have output
this block, with every field filled from live inspection and from the file in front of you, not from
memory. The user can see it and will catch a field that is vague, skipped, or invented.

**The quotes are the point.** A rule you are remembering cannot produce a verbatim quote, and a
wrong quote is visible to the user in the chat. If you cannot quote an invariant you are relying on,
**that is the drift signal**: stop, Grep this file for it, paste what you find, then continue. It is
not a failure to have to look something up. It is a failure to proceed without doing so.

```
PRE-SCRIPT DECLARATION
─────────────────────────────────────────────
Task: [one sentence]
Methods this script calls: [every etch.* method in the draft — read off the code, not recalled]
Invariants that applies to: [IDs from the Method Index rows above]
Quoted:
  [ID] "[verbatim text of the rule from §0, quoted, not paraphrased]"
  [ID] "[...]"     ← one line per invariant listed above
Reference sections opened: [e.g. "Ref 6b group encoding", or NONE and why]
Props to set: [list] — path + default read from Ref 4: YES, live-checked one key: YES
Prop keys confirmed (not assumed): [list]
Select values (right side of ` : ` in Ref 4, not the UI label): [var: value pairs, or N/A]
Default values omitted: YES — [props considered and omitted as default, or N/A]
Global props used instead of local: [list, or N/A]
Responsive code included: YES / N/A — [reason if N/A]
Mobile edge insets: [for each element whose desktop inset comes from a parent width limit rather than
  its own padding, name what holds it off the screen edge below the collapse breakpoint; "nothing"
  means add the padding before proceeding]
slot-content children included in create(): YES / N/A — [reason if N/A]
Class+styles helper used (Section 3 el(), not hand-rolled): YES / N/A — [reason]
Class+styles round-trip verified on 1 node before batch: YES — [node id + getJson result] / N/A
Intent confirmed with user: YES / [paste the confirmation]
Verification reached: CONFIG ONLY / CONFIG + RENDERED — [if config only, say what is unverified]
─────────────────────────────────────────────
```

**Hard stop conditions — do not proceed if any of these are true:**
- Any field is blank, says "TBD", or was filled from memory rather than inspection
- An invariant is listed but not quoted, or the quote is a paraphrase
- A method in the draft is missing from the "Methods this script calls" line
- Ref 4 was not actually opened, and paths or select values were filled in from memory
- A layout is being built without `@container` queries
- A local prop is being set where a working global equivalent exists (INV-03; trigger mode is exempt)
- The user has not confirmed intent on a visual or structural change
- A script creates or replaces classed content without the Section 3 `el()` helper, or scales to
  multiple blocks before round-trip-verifying `class` + `styles[]` on one node (INV-10)
- N similar content blocks are being created without following Appendix A.3a in the reference
- A reconnaissance pass calls plain `getJson`/`getTree` for a full-subtree dump instead of `skim()`

The declaration is not a formality. It is the proof that the work was done before execution, and the
mechanism that catches drift before it reaches the site.

---
### 1. Connect & Preflight Gate
1. Extract the active tab name from the connector server output logs.
2. Resolve the dynamic DWC component IDs by name immediately. Do not guess or use hardcoded IDs (`1298–1302`).
3. Run an evaluation script to confirm both `findBlock(getTree(), HEADER)` and `findBlock(getTree(), NAV)` return valid block objects.
4. **Hard Stop Condition:** If either block returns `null` or `undefined`, you must immediately halt execution. Output this exact message to the user: `"CRITICAL: DWC Header/Nav not detected on this page/template. Halting operation to prevent custom structural overrides."` Do not write any HTML, CSS, or custom fallback code.

### 2. Scope Clarification & User Confirmation Gate
Before invoking any file editing or code generation tools, you must present the user with a strict choice if the prompt implies a structural layout or style change:
* Ask the user explicitly to confirm:
  - **(a) Restyle / adjust existing items** (retain nav items, alter look/behavior).
  - **(b) Full destructive rebuild from scratch** (wipe active items, build fresh).
* If a visual asset or screenshot is provided, you must explicitly state how you intend to match it and ask if existing layout content must be cleared first.
* **Base class name approval (mandatory):** If the task requires choosing a new base CSS class name — building a new mega menu from scratch, or renaming an existing panel's class family without the user specifying the target name — you must ask the user what they want it called before writing any code. You may suggest 2–3 reasonable options, but the user must explicitly approve a suggestion or provide their own name. Never invent and apply a base class name unilaterally.
* **Ambiguous-phrase resolution (mandatory when building from a free-form design/behavior brief):** Before writing any code, read the brief once specifically looking for phrases with more than one plausible technical reading — not just the (a)/(b) structural choice above. A vague sizing/width phrase, an unstated default/initial state, or two similarly-worded requirements that may or may not map to the same underlying control are all common shapes this takes. **Do not silently pick an interpretation and move on** — resolving that translation is the agent's job, not something a natural-language brief can be expected to spell out. List every such phrase you find and resolve them in the **same single `AskUserQuestion` batch** as the (a)/(b) structural choice and base-class-name approval above — one combined ask, not a drip of follow-ups.
* **The Backup Invariant (Strictly Mandatory for Option B):** If option (b) is selected, you are strictly forbidden from running any destructive code until you generate a temporary script, execute the snippet below via the connector, and save the returned JSON payload to a local backup file (`dwc-header-backup.json`):
  ```js
  const headerBlock = findBlock(etch.blocks.getTree(), compId('DWC Header'));
  return etch.blocks.copy(headerBlock.id); 
  ```
* Do not proceed until the user explicitly replies to your confirmation prompt in the chat.

### 3. Node Shape Validation
When inspecting or traversing the tree layout, you must adhere to the exact component schema properties. 
* Assert that component properties reside within `attributes` (**never** read `n.props`).
* Assert that element tags reside within `tag` (**never** read `n.tagName`).
* **Inspection Protocol:** If you encounter any structural property mutation where you are uncertain of the schema keys, you must write a single-line test script utilizing `getJson(id)` on the specific node, execute it via `-f`, and parse the live terminal return object before continuing.

### 4. Customization Hierarchy & Execution Contract
You are strictly forbidden from skipping down this hierarchy. Reaching for a raw, hand-written custom stylesheet or global CSS rule without proving that Tiers 1 and 2 are incapable of fulfilling the request constitutes a total skill failure. 

#### TIER 1: Prop Reference (Mandatory Pre-requisite)

**Read the prop table in Ref 4 before writing any prop.** It is generated from the Etch component
export, so it is the plugin's own definition of itself: every install of that version has exactly
those paths, defaults and select values. Grep it for the prop you need rather than reading the
section.

Three things it gives you that guessing does not:

* **The path**, fully flattened. Panel section headings are **not** path segments. Inside DWC
  Dropdown's single "General" panel section, **Text** is `props.text` while **Appearance** is
  `props.general.appearance`. Nothing in the UI distinguishes them, and no rule predicts it.
* **The stored value** for select props, as `Label : value`. Store the right-hand side.
* **The default.** Never write a prop to its own default.

**Component IDs are never taken from any document.** The table omits them deliberately; they are
install-local. Resolve by name, every session.

**Full dump only when the table has no row for the prop at all**, which should be rare enough to be
worth reporting. If you find yourself dumping schemas routinely, that is a documentation bug, not a
workflow.

Before moving to Tier 2, state: `"Ref 4 gives [path] = [type/values], default [x]. Live check
confirms/contradicts. There is/is not a native prop for this request."`


#### Before any prop work: check the fingerprints (about 360 bytes)

Ref 4 carries one fingerprint per component, over exactly what it asserts: flattened path, default
and select options. Confirm it describes **this** install before trusting it, then never dump a
schema you did not need.

```js
function flatten(props, path = '', out = []) {
  for (const p of props || []) {
    const k = (p.type && p.type.specialized) || '';
    if (k === 'group')     { flatten(p.properties, path + p.key + '.', out); continue; }
    if (k === 'condition') { flatten(p.properties, path, out); continue; }
    if (!p.key) continue;
    // A 'class' prop stores install-local STYLE IDs; excluded or every install mismatches.
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

**All components match** — Ref 4 is exact for this install. Read the row you need and write the prop.
Do not dump any schema. This is the normal case and it costs about 90 tokens instead of 9,000.

**A component disagrees** — the install differs from the version Ref 4 was generated from. Dump
**only that component**, treat the live schema as authoritative for it, use Ref 4 for the rest, and
say plainly in your report which component diverged so the table can be regenerated.

**The fingerprint check is not optional and not repeatable.** Run it once per session before the
first prop write, then trust the result for the rest of the session.

#### TIER 2: CSS-Variable Overrides
* If and only if Tier 1 confirms no native property controls the layout request, search the `.dwc-*-vars` style entry.
* Modify the layout exclusively by overriding the specific active `--var` within that structural block.

#### TIER 3: Custom Stylesheet (one you create)
* This tier is restricted. You may write custom CSS properties to the custom stylesheet if and only if you have documented in your chat declaration that absolutely no native component property (Tier 1) or CSS variable (Tier 2) exposes control over that layout behavior.

#### TIER 4: JavaScript Configuration Global Overrides
* Absolute last resort. Do not touch global configurations unless all higher options are non-functional.

#### After the tier: apply, persist, verify

5. **Apply, then `await etch.saveAsync()`.** `etch.blocks.*`, `etch.styles.*` and `etch.loops.*` are
   buffered and do not persist without it. `etch.components.*`, `etch.stylesheets.*` and
   `etch.fields.*` persist immediately and must NOT be followed by `saveAsync`.
6. **Verify, and say which level you reached (INV-24).** Read the changed prop or variable back:
   that is configuration verification, and it proves only that the value persisted. Then check the
   **published page** — fetch it, or screenshot it with your own headless browser — which is the
   only thing that proves it rendered. See "Visual verification" for how; you do not need the
   user's browser and must not ask them to relaunch it. Hand something to the user only when it
   genuinely cannot be seen on a public page.

> **🚫 Never write CSS into the global stylesheet to achieve menu styling or behaviour a prop or a
> CSS-variable class can do (INV-05).** Reaching for a hand-written global rule is the signature of
> an agent that skipped the hierarchy above. If you are about to do it, go back to the prop
> reference in Section 4 of the reference file.

## Before you start

This skills file lives in `MMPro Etch Docs/ai-connector/mmpro-skills/`, alongside its reference-file
companion. The full component prop docs (`components/`) are kept single-source at the repo root
(`../../components/`), since that's also where the live GitBook site publishes them from — this repo does
not duplicate them into `mmpro-skills/`. If you installed via `npx mmpro-agentic-skills-etch`, `components/`
ships alongside the skills file (one level up, `../components/`) and will be present. If you only grabbed
the `mmpro-skills` folder on its own some other way, `components/` may not be present; fall back to the
live GitBook URL in Section 4 (reference file) when that happens.

**Step 1 — Check for developer context file** by searching upward from this file's folder for `MMPRO ETCH/mmpro-dev-context.md`, checking each ancestor directory in turn (do not assume a fixed depth: the correct number of levels differs between a repo checkout and an `npx` install, and a hardcoded path silently reports "not found" everywhere). If it exists, read it silently — this is a **developer session**. If not found, this is a **user session**.

**Step 2 — Developer session only:** Do not create or update `mmpro-user-context.md`. The dev context file is the only context file for developer sessions.

**Step 2 — User session only:** Look for `mmpro-user-context.md` in the **same folder as this file**. If it exists, read it silently — it contains saved templates and preferences. If not found, **create it immediately** with the following starter structure and inform the user it has been created:

```md
# MMPro User Context

## Preferences


## Saved Templates


## Session Notes

```

Do not touch the dev context file. At the end of every user session, update `mmpro-user-context.md` with any new preferences discovered, templates built, or useful things learned about the user's setup — without being asked.

**Precedence rule (both sessions):** If the active context file (dev context, or `mmpro-user-context.md`)
contains a saved preference that conflicts with a default or convention documented elsewhere in this
skills file — e.g. a different naming convention, default class prefix, or workflow preference — the
context file's saved preference always wins. When this happens, explicitly tell the user you're applying
their saved preference instead of the skill file's default (e.g. "Using your saved naming preference from
context instead of the default convention"), so they understand why behavior differs from what's documented.

**Step 3 — Load API reference (both sessions).** Check for the cheatsheet at `../../ETCH-DEV-API/etch-connector-cheatsheet.md`. If not found locally, WebFetch the following before writing any scripts:
- `https://docs.etchwp.com/public-api/types-reference.html` — block JSON shapes (`etch/svg`, `etch/element`, `etch/text`, etc.)
- `https://docs.etchwp.com/public-api/components.html` — component property types, especially `ConditionComponentProperty` (has nested `properties` children that a shallow schema read will miss)
- `https://design-with-cracka.gitbook.io/megamenupro` — complete DWC Mega Menu Pro prop reference per component. The repo's `components/` folder (`../../components/` from this file, if present) and Section 4 in the reference file cover the same ground locally — prefer those before fetching live, and only fetch per-component pages here for a prop not already in either, or if `components/` isn't present locally.

Pay particular attention to: block JSON shapes (`etch/svg` stores `src` in `attributes`, not top-level), `ConditionComponentProperty` nested `properties`, the `{{...}}` group encoding rules, and the full prop list for each DWC component.



**Tab name (both sessions):** Always extract from the server output when the user pastes it. Never cache it.

## Connector quick-start

### What the user does

If the user hasn't connected yet, give them exactly these steps — nothing more:

1. In Etch Builder, open Settings → enable **AI Connector**
2. Click the **AI sparkles button** in the lower-left settings bar → **"Connect external AI agent"**
3. Paste `npx @digital-gravy/etch-connector serve` into this chat and send it

### What the agent does (internal — never expose to user)

Once the server output appears (in chat, or in the terminal if the user ran `serve` there):

1. **Permission setup — ask once, before anything else runs.** Every `npx @digital-gravy/etch-connector`
   call triggers a permission prompt unless the user already has an always-allow rule configured. Before
   the first script of the session, ask directly: *"Would you like me to configure an always-allow rule
   for the etch-connector command so you're not prompted every time?"*
   - **Yes** → add `"Bash(npx @digital-gravy/etch-connector *)"` to `permissions.allow` in
     `~/.claude/settings.json` (global — the connector is used across multiple project folders, not
     one repo). Read the file first, merge into the existing `allow` array, validate the JSON before
     moving on, never overwrite other entries.
     This rule is sufficient **as long as every connector call is a single command**, which is why the
     `eval` examples below pass an absolute path to `-f` and never prefix the call with `cd`. Keep it
     that way and nothing further is needed.
     **If the user reports they are still being prompted**, the cause is almost always a compound
     command: a permission rule must match *every* subcommand independently (separators are `&&`,
     `||`, `;`, `|`, `&` and newlines), so `cd "<dir>" && npx @digital-gravy/etch-connector ...`
     prompts on the `cd` half unless that path sits inside a working directory. Fix it by dropping the
     `cd` and using an absolute `-f` path. Only if something outside your control keeps emitting the
     `cd` form, offer `"Bash(cd *)"` as an additional rule — `cd` has no side effects, but it is a
     broader grant than most users need, so suggest it rather than adding it silently.
   - **No** → don't ask again immediately. Count actual permission prompts for this command from that
     point. After it has fired **two more times**, ask the same question **one final time**. Whatever
     the answer, that's the last ask for the session — never a third time.
2. Extract the tab name from: `[etch-connector] + tab "your-site.com" (...)`
3. **Preflight — confirm MMPro is on this page (do this before anything else).** First **resolve the
   DWC component IDs by name** (`compId('DWC Header')`, `compId('DWC Nav')` — see Section 1; the IDs
   are site-specific, NOT fixed `1298–1302`). Then check that `findBlock(getTree(), HEADER)` and
   `findBlock(getTree(), NAV)` both return a block.
   - **Found** → store tab name, header/nav/toggle block IDs, the resolved component IDs, and the
     `.dwc-*-vars` style IDs in session memory, then continue.
   - **Not found** → the DWC Header/Nav isn't placed on this page. **STOP.** Tell the user plainly
     (e.g. "I don't see the DWC Mega Menu Pro header on this page — is it added to this page/template?")
     and do **not** improvise with custom HTML/CSS. The #1 cause of an agent wrongly deciding the menu
     is "custom" and hand-writing CSS is **searching by the wrong (hardcoded) component ID** or
     walking the tree with bad field names (see "Block node shape"). If `compId('DWC Header')`
     returns a number but `findBlock` returns nothing, the header is on a different page/template —
     not absent.
4. Ask the user in plain English: **"I'm connected to \[tab name]. What would you like to change?"**

**Never** tell the user about block IDs, eval commands, script files, or any internal steps. **Never** ask the user to run scripts themselves.

### Connector commands (agent reference)

Run everything via `npx @digital-gravy/etch-connector <command>`. The agent runs these — never the user.

```bash
serve [--ws-port 7331] [--control-port 7332] [--ws-host 127.0.0.1]   # start the connector (the user pastes this)
tabs  [--json]                                                       # list connected tabs
eval  [code] [-t|--tab name] [-f|--file path] [--timeout ms]        # run a script in a tab
# Do NOT use the shot/html/computed --cdp commands — see "Visual verification" below
```

`eval` is the workhorse:

```bash
# Pass an ABSOLUTE path to -f and never prefix the call with `cd`.
npx @digital-gravy/etch-connector eval -t "your-site.com" -f "C:/full/path/to/script.js"
# For long operations (saveAsync):
npx @digital-gravy/etch-connector eval -t "your-site.com" --timeout 60000 -f "C:/full/path/to/script.js"
```

> **Do not write `cd <dir> && npx @digital-gravy/etch-connector ...`.** Permission rules match each
> subcommand of a compound command separately, so the `cd` half prompts on its own and the user is
> asked again on every call, no matter how many always-allow rules they have added for the
> connector. An absolute `-f` path keeps the command a single subcommand and the prompts stop.

- **CRITICAL AGENT CONSTRAINT — DO NOT EXECUTE INLINE:** PowerShell will silently swallow multi-line inline scripts. You are STRICTLY FORBIDDEN from running multi-line strings directly via `npx @digital-gravy/etch-connector eval`.
  1. You MUST write your JavaScript to a temporary file first (e.g., `temp-query.js`).
  2. Run it using the `-f` flag with an ABSOLUTE path, and no `cd` prefix: `npx @digital-gravy/etch-connector eval -t "site.com" -f "C:/full/path/temp-query.js"`
  3. Delete the temporary file immediately after execution.
- **Async Execution Context:** The script body runs as an **async function**: `await` is available and whatever you `return` comes back on stdout as JSON. `console.log` output is printed separately from the return value.
- **Tab Targeting Rules:** The `-t` parameter is optional when only one tab is actively connected. If multiple tabs are open, the `-t` parameter is strictly mandatory.
- **⚠ Timeout Warning (Non-Aborting State):** A timed-out eval does NOT abort the in-page script. The connector stops *waiting* at `--timeout`, but your `async` code keeps running in the builder. A long per-item loop (e.g., delete-all + paste 10) can keep mutating the layout *after* you get a "timed out" error — producing duplicates or partial states. Always re-read the active state before retrying; do not blindly re-run the code payload.
- **Batching Rule:** Batch mutations into one single script with a single `await etch.saveAsync()` at the end — do not run individual saves per item. Keep loops short and pass a generous `--timeout` parameter (e.g., 150000) for multi-item builds.
- **Performance Thresholds:** `blocks.copy()` / `pasteAsync()` of a full mega menu is heavy (~10s each) because it bundles the whole subtree + every referenced style entry. While great for cloning *one* styled panel, building *many* clean items from scratch via `create()` for lightweight blocks is far faster and avoids dragging demo content.

### Execution Context & Boundaries

**Safe mode restrictions:** Scripts only have access to `etch.*` and standard JS built-ins. `window`, `document`, all browser globals, network requests, and browser storage are strictly blocked. Use native `etch.*` API calls instead of custom DOM access — `encodeURIComponent` and other standard JS built-ins are available.

**Exit codes mapping:** 
* `0` = Success
* `2` = Script compilation/runtime error
* `1` = Operational error (tab not found, timeout, connector unreachable)

**Connection persistence logic:** The connection lives in both the chat that ran `serve` and the open builder tab — it stays alive while both are open, and new chats reuse it **without re-running `serve`**. It ends only if the user closes the serve chat or navigates away from the builder tab. Use exactly one connected tab per site (different sites are fine; never spin up two tabs on the same site). If a session can't reach Etch, verify the original serve chat and builder tab are still open before prompting the user to reconnect.


### `etch` API surface (everything scripts can call)

```js
Object.keys(etch)
// ["blocks", "loops", "styles", "stylesheets", "components",
//  "navigation", "fields", "ui", "history", "skills", "ai",
//  "saveAsync", "apiVersion", "version"]
```

Core methods this skill relies on (full behaviour/gotchas in Section 6):

```js
// blocks — buffered, needs await etch.saveAsync()
etch.blocks.getTree()                        // PublicBlockJson[] — whole document
etch.blocks.getJson(id) / find({type,class,attribute})
etch.blocks.create(json, parentId?, index?)  // parentId null/omitted = document root
etch.blocks.update(id, patch)                // patch: { name?, hidden?, attributes?, text? } — preferred for multi-prop edits
etch.blocks.replace(id, json) / duplicate(id) / move(id, newParentId, index?) / delete(id)
etch.blocks.copy(id) -> CopyObject           // bundles referenced styles/loops/components
await etch.blocks.pasteAsync(payload, targetId?, index?) // re-maps them to fresh ids
etch.blocks.select(id) / deselect() / getSelectedId()
etch.blocks.setText(id, text) / setAttribute(id, key, val) / getAttribute(id, key)
etch.blocks.removeAttribute(id, key)
etch.blocks.rename(id, name)                 // nice-name shown in structure panel — see Section 2a of the reference file
etch.blocks.addClass(id, cls) / removeClass(id, cls) / hasClass(id, cls)  // class STRINGS, not style IDs
etch.blocks.enterComponentEditMode(id) / saveComponentEditModeAsync()
etch.blocks.exitComponentEditMode(options?)  // options: { revert?: boolean } — pass revert:true to discard
etch.blocks.isInComponentEditMode()

// styles — buffered, needs await etch.saveAsync()
etch.styles.list(filter?)                    // [{ id, selector, type, collection, css }]; filter: { type? }
etch.styles.create(selector, cssString) / update(id, { selector?, css? }) / delete(id)
// CSS variables sub-API (targets :root custom properties — NOT style-entry variables):
etch.styles.setVariable('--var-name', value, collection?)   // ⚠ first arg is the VAR NAME, not a style entry ID
etch.styles.getVariable('--var-name', collection?)
etch.styles.listVariables(collection?)       // Record<string, string>
etch.styles.removeVariable('--var-name', collection?)

// persist-immediately (NO saveAsync)
etch.stylesheets.appendAsync(id, css) / list()
etch.components.getJson(cid) / updateAsync(cid, { properties|blocks })
etch.fields.*                                // all async, persist immediately — no saveAsync

// history — returns void, NOT async (do not await)
etch.history.undo() / redo() ; canUndo() / canRedo()
```

### Block node shape (read this before walking the tree)

`getTree()` / `getJson()` return nodes with **exactly** these fields:

```js
{ id, parentId, type, componentId?, slotName?, attributes, children, tag?, text?, options?, context?, script?, styles? }
```

- `id` — block's stable id. `parentId` — parent block id, or `null` at document root.
- `type` — full union: `etch/component` | `etch/element` | `etch/text` | `etch/slot-content` | `etch/slot-placeholder` | `etch/svg` | `etch/dynamic-element` | `etch/dynamic-image` | `etch/loop` | `etch/condition` | `etch/raw-html` | `etch/passthrough` | `etch/post-content`
- `componentId` — number, only on `etch/component` nodes. **DWC components** (Menu Item, Dropdown, Nav, Toggle, Header). The numbers are **site-specific** — resolve them by name (Section 1). This doc writes `1298–1302` as readable placeholders for the resolved `ITEM/DROPDOWN/NAV/TOGGLE/HEADER`.
- `attributes` — object. **For a component instance this is where its bound PROPS live** (group props are `{{…}}`-encoded strings; read with `getGroup`/`getAttribute`, set with `setGroup`/`setAttribute`).
- `children` — array of child nodes. Slots are `etch/slot-content` children identified by `slotName` (pick by `slotName`, never by index).
- `tag` — element tag on `etch/element` (e.g. `'div'`). `text` — content on `etch/text`. `styles` — read-only style-entry IDs.
- `script?` — `{ code: string }` — optional inline script attached to the block. Used by DWC Nav's embedded JS config.

> **⚠ There is NO `n.props` and NO `n.tagName`.** Reading them returns `undefined`, and an agent that walks the tree looking for `props`/`tagName` will see "empty" components and wrongly conclude the page uses a *custom* menu — then fall back to writing CSS by hand. **Props are in `attributes`; the element tag is `tag`.** When in doubt, `getJson(id)` one node and inspect its real keys before assuming.

### Visual verification — check the published page, never the user's browser

There are two levels of assurance and they are not interchangeable. A `getJson`/`getAttribute`
read-back is **configuration verification**: it proves a value persisted. Only looking at output is
**rendered verification**: it proves the page is actually right. Every silent failure in Section 6
passes a read-back. Always say which level you reached.

**You can reach rendered verification on your own.** The Etch *builder* sits behind the user's
WordPress session, but the *published page* does not. Anything that renders for a logged-out
visitor — a header, a nav, a mega menu panel — you can check yourself, with no login, without
touching the user's browser, and without asking them to relaunch anything.

**1. Fetch the published page.** Cheapest and often enough. Proves classes, attributes, inline SVG
and text actually reached the markup.

```bash
curl -s "https://the-site.com/a-published-page/" -o page.html
grep -c 'mega-menu-yourname' page.html          # did the panel render at all?
grep -o 'appearance="icon"' page.html | wc -l   # did the icon dropdowns render?
```

**2. Screenshot it with your own headless browser.** Launch a fresh instance on a spare port with
its own profile directory, then kill it when done. It needs no session because the page is public.

```bash
chrome.exe --headless=new --remote-debugging-port=9555 \
  --user-data-dir="<a temp dir>/cdp-profile" --no-first-run about:blank &
```

Then drive it over CDP: `Page.navigate` to the URL, wait for load, `Page.captureScreenshot`
(pass a `clip` to crop to the header). `Runtime.evaluate` gives you `getComputedStyle` for
confirming a CSS variable resolved. Kill the process by the PID owning that port when finished, and
delete the profile directory.

**To capture an OPEN dropdown**, do not reach for builder preview state. Open it on the published
page instead: `Runtime.evaluate` a click or a `mouseenter` on the toggle, wait for the transition,
then capture.

**What this cannot show you**, and must be handed to the user instead:
- Anything on an unpublished or draft page, or content visible only to logged-in users
- Builder-only state such as `inBuilder.keepOpen`
- Changes you have not saved yet — `await etch.saveAsync()` first, or you screenshot the old page

> **Do not use the connector's `--cdp` commands (`shot`, `html`, `computed`), and never ask the user
> to relaunch their browser with `--remote-debugging-port=9222`.** Those attach to the user's own
> Chrome, which means quitting it and losing the WordPress session they are testing with, and they
> fail outright whenever that port is not already open. The published-page route above needs none of
> that. Reserve a request for the user's browser for the rare case that genuinely requires their
> logged-in session, and say why.
## Agent Skills Update

When you discover something new while working — a pattern that worked, a gotcha that cost time, a
faster way to do something — record it before ending the session. The next agent should start faster
than you did.

**Where you record it depends on which session you are in, and you decide that before writing
anything.** The answer comes from Step 1 of "Before you start": a session is a **developer** session
when `MMPRO ETCH/mmpro-dev-context.md` is found by searching upward from this file's folder, and a **user** session otherwise.

| Session | Record findings in | Never edit |
| --- | --- | --- |
| **Developer** | this skills file and its reference companion, routed by the table below | `mmpro-user-context.md` |
| **User** | `mmpro-user-context.md`, in the same folder as this file | this skills file, its reference companion, or `components/` |

**If you did not run Step 1, or cannot tell which session this is, treat it as a user session.** On a
user install this file is a released artifact: the next plugin update overwrites it, so an edit made
here is lost, and until then it leaves that install silently diverged from the version everyone else
is running. Recording to the context file instead costs nothing if you guessed wrong, which makes it
the only safe default.

**User sessions:** add the finding to `mmpro-user-context.md` under Session Notes, in the same
direct-rule style required below. If it is a product-level gotcha rather than a fact about this
install, say so plainly in your closing message so it can be passed upstream, rather than editing
documentation you are not the author of.

**Developer sessions — where each kind of discovery goes:**

| Discovery type                             | Where to add it            |
| ------------------------------------------ | -------------------------- |
| New task → action mapping                  | Section 2 goal-to-action table (this file), and add a §0.2 Task Index row |
| New reusable script                        | Ref 3b, and add a §0.1 Method Index row |
| Prop or CSS variable you didn't know about | Ref 4: Prop reference |
| Special styles selector you used           | Ref 5: Special styles |
| Mistake to avoid / API behaviour           | Section 6 (this file), and the §0 card too if being wrong about it fails silently |
| JS config change                           | Ref 7: JavaScript config (recipe in Ref 3b) |
| Updated site-specific IDs                  | §1 Site config, in this file |

**How:** One line or a short code block. No prose. Confirmed working only — no speculation.

State findings as a direct rule, not a story. Do **not** write "Confirmed live [date]: an agent
did X and it broke because Y" — write the rule and, if useful, the concrete symptom, as plain
present-tense fact. No dates, no "confirmed live," no project names, no "an earlier version of
this doc said."

**What NOT to add:** Task-specific context, anything already in the component docs, anything unconfirmed.

***

**Before you append, fold.** Search this file and the reference for an existing rule covering the
same behaviour and extend that rule instead. Append a new entry only when nothing covers it, and
never restate an existing rule as a fresh summary bullet. Duplication is not just bulk: several
differently-worded copies of one rule invite the next agent to synthesise a wrong composite, and a
card is only authoritative if each rule is stated exactly once.

**Route whatever you add.** A discovery that fits nowhere is a rule no agent will ever reach.

* If being wrong about it **fails silently**, it must also become an `INV-` entry on the §0 card.
* If it attaches to a specific `etch.*` method, it must also get a row in the §0.1 Method Index.
* If it only matters for one kind of task, it must also get a row in the §0.2 Task Index.
* If it fails loudly and needs none of the above, the reference file is its home. Do not put it on
  the card. The card stays short or it stops being read.
## 1. Site config

**Everything here is site-specific — resolve it at runtime, never hardcode.** Both DWC component IDs
**and** style-entry IDs vary per install (e.g. components `1298–1302` on one site, `758–762` on
another; toggle-vars `reiqdv9` on one, `2j8195b` on another) — assuming fixed numbers is the #1 cause
of "the menu looks custom / I can't find the header" failures.

### Resolve DWC component IDs by NAME — do this first, every session

```js
const compId = (name) => etch.components.list().find(c => c.name === name)?.id;
const HEADER   = compId('DWC Header');
const NAV      = compId('DWC Nav');
const TOGGLE   = compId('DWC Mobile Toggle');
const DROPDOWN = compId('DWC Dropdown');
const ITEM     = compId('DWC Menu Item');

// Then locate block instances with the RESOLVED ids:
const headerBlock = findBlock(etch.blocks.getTree(), HEADER);
const navBlock    = findBlock(etch.blocks.getTree(), NAV);
```

> Throughout this doc, examples write `1298`–`1302` (Menu Item / Dropdown / Nav / Toggle / Header) as
> **readable placeholders**. Always substitute your resolved `ITEM / DROPDOWN / NAV / TOGGLE / HEADER`.

### Resolve style-entry IDs by SELECTOR

```js
const styleId = (sel) => etch.styles.list().find(s => s.selector === sel)?.id;
const headerVars = styleId('.dwc-header-vars');
// also: .dwc-nav-vars, .dwc-top-level-items-vars, .dwc-dropdown-items-vars, .dwc-toggle-vars
```

```
## Stylesheets — which one you may touch
The "DWC Mega Menu" stylesheet is OFF LIMITS. Do not read it, edit it, or append to it,
and never look up its id. It is the product's own CSS: the implementation, not the
interface you build against.

Do NOT expect a custom stylesheet to already exist. A fresh install has none, so there is
nothing to look up by name and no id to reuse. If Tier 3 is genuinely unavoidable, create
one and append to that:

const NAME = 'MMPro Custom';
const sheetId = etch.stylesheets.list().find(s => s.name === NAME)?.id
  ?? await etch.stylesheets.createAsync({ name: NAME, css: '/* MMPro custom CSS */' });
await etch.stylesheets.appendAsync(sheetId, css);

createAsync requires BOTH name and css — omitting css fails with HTTP 400 invalid_data.
Create once, then reuse it for the rest of the session.
```

***

## 2. Decision tree

### Building a new mega menu template — ALWAYS build from scratch

**Never duplicate an existing mega menu to create a new template.** Duplicating copies all quantum (or other template) class names and style entry associations. Changing them after the fact is extremely painful because:

* `addClass` only modifies the HTML `class` attribute — it does NOT update the `styles[]` array
* `removeClass` modifies both, but the two are out of sync after any manual class change
* `setAttribute('class', ...)` does not persist — the class is reconstructed from `styles[]` on save

**Correct workflow for a new mega menu template:**

1. Create a new DWC Dropdown block with mega menu enabled. **You MUST include the `etch/slot-content` children in the `children` array** — a component created with `children: []` has no accessible slots in the same script (slots only appear after `saveAsync()`). Pass at least a placeholder child inside each slot you intend to populate:

```js
const newDropdownId = etch.blocks.create({
  type: 'etch/component',
  version: 1,
  context: { name: 'My New Mega Menu' },
  options: {},
  componentId: 1299,
  attributes: {
    text: 'Nav Label',
    megaMenu: '{{\"enable\":\"{true}\",\"width\":\"#dwc-header\"}}',
  },
  children: [
    {
      type: 'etch/slot-content', version: 1, context: {},
      slotName: 'Mega_Menu_Content',
      children: [
        // placeholder — will be replaced with the styled panel via replace()
        { type: 'etch/element', version: 1, context: {}, options: {}, tag: 'div', attributes: {}, children: [] }
      ]
    },
    {
      type: 'etch/slot-content', version: 1, context: {},
      slotName: 'Nested_Dropdown_Content',
      children: []
    }
  ]
}, parentNavBlockId, insertIndex);

// Slots now exist — find the placeholder and replace() with the styled panel
const ddBlock = etch.blocks.getJson(newDropdownId);
const megaSlot = ddBlock.children.find(c => c.slotName === 'Mega_Menu_Content');
const phId = megaSlot.children[0].id;
etch.blocks.replace(phId, buildPanel(columns)); // replace() persists styles[] correctly
```

2. Find the content slot-content child and build the inner structure fresh using `replace()`, passing your template class names and style entry IDs **directly in the block JSON** — they are set correctly at creation time with no retrofitting needed.

> **Slot selection — pick by `slotName`, not by index.** Every `etch/slot-content` block has a top-level `slotName` field. Never rely on child order.
>
> **DWC Dropdown** — two slots:
>
> ```js
> const dd = findBlock(etch.blocks.getTree(), 1299);
> const megaSlot   = dd.children.find(c => c.slotName === 'Mega_Menu_Content');       // mega menu body — use when megaMenu.enable = true
> const flyoutSlot = dd.children.find(c => c.slotName === 'Nested_Dropdown_Content'); // flyout list — use when megaMenu.enable = false; direct children MUST be <li> tags
> ```
>
> **DWC Menu Item** — one slot:
>
> ```js
> const item = findBlock(etch.blocks.getTree(), 1298);
> const custom = item.children.find(c => c.slotName === 'Content');
> // Use when the nav item needs more than a plain text label — e.g. an icon + label,
> // a custom SVG link, or any markup props.text / props.linkTo cannot produce.
> // Leave empty to use the standard <a> rendered from props.
> ```
>
> **DWC Nav** — three slots:
>
> ```js
> const nav = findBlock(etch.blocks.getTree(), 1300);
> const navItems   = nav.children.find(c => c.slotName === 'Nav_items');         // top-level nav items — DWC Dropdown and DWC Menu Item go here
> const mobileLogo = nav.children.find(c => c.slotName === 'Mobile_Logo');       // logo inside mobile panel; if empty, desktop logo is auto-cloned
> const mobileTop  = nav.children.find(c => c.slotName === 'MobileTop_Content'); // extra content in the mobile top bar alongside the close button
> ```
>
> **DWC Header** — one slot:
>
> ```js
> const header = findBlock(etch.blocks.getTree(), 1302);
> const body = header.children.find(c => c.slotName === 'default'); // everything in the header bar — DWC Nav, logo, etc.
> ```
>
> **DWC Mobile Toggle** — no slots. Self-contained.

3. **Do NOT use `etch.blocks.create()` for class/styles** — classes set via `attributes.class` in `create()` JSON are NOT persisted (they're stripped on save/reload because the class attribute is coupled to `styles[]`). Use the workflow below instead.

**Correct workflow — `replace()` + one style entry per element class:**

> **One style entry per BEM element class — never one nested "parent" entry for the whole
> component.** If unsure whether a site already has a convention, check `etch.styles.list()` for
> any existing BEM classes on that install before assuming.

```js
// Step A: Create ONE style entry PER element class (not one nested parent entry)
const STYLE_ID = {};
STYLE_ID['mega-menu-revo-2'] = etch.styles.create('.mega-menu-revo-2', `
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 1.25rem;
  background: #3520c0;
`);
STYLE_ID['mega-menu-revo-2__cards-grid'] = etch.styles.create('.mega-menu-revo-2__cards-grid', `
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @container (width < 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`);
STYLE_ID['mega-menu-revo-2__card'] = etch.styles.create('.mega-menu-revo-2__card', `
  position: relative;

  &:hover .mega-menu-revo-2__card-img { transform: translateY(-20px); }
`);

// Step B: Build the block tree with the Section 3 `el()` helper — every classed node gets
// BOTH attributes.class AND styles: [styleId] together, not just the top-level container.
// Step C: Replace the top-level container with the built JSON — replace() persists styles[]
// correctly on every node in the tree, not just the root.
const newId = etch.blocks.replace(ciBlockId, {
  type: 'etch/element', version: 1, context: { name: 'Mega Menu Revo 2' }, options: {},
  tag: 'div',
  attributes: { class: 'mega-menu-revo-2' },
  styles: [STYLE_ID['mega-menu-revo-2']],
  children: [
    // each child block needs its OWN class + matching styles: [styleId] too — e.g.
    // { tag: 'div', attributes: { class: 'mega-menu-revo-2__cards-grid' }, styles: [STYLE_ID['mega-menu-revo-2__cards-grid']], children: [...] }
  ]
});
await etch.saveAsync();
```

**Key rules:**

* **One style entry per element class** (e.g. `.mega-menu-revo-2__card` gets its own style entry with its own CSS).
* Within each element's OWN style entry, nesting is allowed and preferred for: `@container`, pseudo-elements (`&::before`), states (`&:hover`), and child tag selectors (`& span`, `& img`, `& svg`, `& svg path`, `& path`).
* **Responsive: ALWAYS use `@container`, NEVER `@media`.** The mega menu content div is already declared as a container (`container-type` is set on it by the component), so any element inside a mega menu can use `@container (width < 900px) { ... }` directly. **Do NOT add `container-type` to your own wrapper** (e.g. `.mm-features`) — it's redundant and, worse, it would make your wrapper the query target instead of the full content div. Breakpoints query the mega menu content width, not the viewport. Convert range/`max-width` forms too: `@media (max-width: 1100px)` → `@container (width < 1100px)`.
* Do **NOT** nest sub-classes (`&__card`) inside a *different* class's style entry — each sub-class gets its own `etch.styles.create()` call and lives in its own entry.
* **Every classed node needs BOTH `attributes.class` AND a matching `styles: [styleId]`** — not just the top-level container. Use the Section 3 `el()` helper so both are always set together; see the "Building classed content for new blocks" gotcha for the failure mode when one is set without the other.
* Every block needs the matching style entry ID in its `styles[]` array — use `replace()` to set this (see Step C below), passing `styles: [styleId]` for each block in the JSON tree.
* `replace()` propagates `styles[]` correctly to all nested children in the JSON tree.
* **Grid best practice:** always use `repeat(auto-fit, minmax(min(to-rem(260px), 100%), 1fr))` — never hardcode `1fr 1fr 1.2fr` or similar. `min()` prevents overflow in narrow containers; `auto-fit` collapses columns naturally without manual breakpoints.
* **Link style entries must always set both `color` and `&:hover { color: ... }` explicitly** — prevents global/theme `a` styles from bleeding in. Minimum: `color: white; &:hover { color: white; }`.
* **Use `to-rem()` for all px values** in style entry CSS — e.g. `to-rem(14px)`, `to-rem(20px)`. Style entries go through `CssProcessor::preprocess_css()` which handles the conversion. Never write raw rem values like `0.875rem`; write `to-rem(14px)` instead. Exceptions: aspect ratios, `z-index`, `opacity`, unitless values, and `calc()` expressions where mixing units is intentional.
* **If ACSS (AutomaticCSS) skills are available, prefer ACSS tokens and utility patterns** over the default styling approach above.
* **Never put mega menu CSS in a custom stylesheet** — use style entries only.

Only duplicate an existing mega menu if you need to copy content (not structure/styles), and plan to keep the same class names as the source.

### Worked example — a natural-language brief → props

This is the method: decompose the user's words into props/variables before touching anything. Every
row below is a prop or a CSS-variable override — **none** of it needs hand-written global CSS.
(Confirm exact keys/select values at runtime with `etch.components.getJson(130x).properties`.)

> Brief: *"Apple-style nav. All dropdowns open on hover except Shop and the search icon (click).
> Search icon hidden on mobile. On mobile, search + bag icons sit outside the menu next to the toggle.
> Dropdowns open downward. Mobile menu expands down with a subtle fade-in. Desktop dropdown height
> transitions smoothly between items. Whitish blurred backdrop. Dropdown spans full width but inner
> content matches content width. No item hover background. Hover colour a darker black. Apple logo."*

| Brief phrase | Where it maps |
| --- | --- |
| dropdowns on hover; Shop + Search on click | `interactionUx.dropdownTriggerMode` (Nav) = Hover or Click; then per-item `dropdownTriggerMode: click` on the Shop + Search DWC Dropdowns (1299) |
| search icon hidden on mobile | `general.visibility: hide-on-mobile` on the Search Dropdown (1299) |
| search/bag outside mobile menu, by the toggle | icon-button dropdown with a panel → `megaMenu.enable {true}` then `megaMenu.breakout {true}`; plain icon link → DWC Menu Item + `relocation.mode: breakout` |
| dropdown content opens downward | `general.submenuReveal: expand` (1299); mobile equivalent `mobile.submenuReveal: Expand` (Nav) |
| mobile menu expands down + fade | `mobile.slideInDirection: expand down` + `mobile.submenuSlideExtras.fadeItemsOnSlide` (Nav) |
| desktop dropdown height transitions smoothly | `animation.adaptiveHeight {true}` (Nav) — mutually exclusive with `animation.stripeStyle` |
| whitish blurred backdrop | `backdrop.navBackdropBackgroundColor` (colour/opacity) + `backdrop.navBackdropBlur` (blur intensity) on the DWC Nav. These props control the overlay that appears behind dropdown content when it opens — on both desktop and mobile. |
| full-width panel, inner = content width | `megaMenu.enable {true}`, width via `dropdown.globalMegaMenuWidth: #dwc-header` for full-width headers — or **`.dwc-nest-header`** when using overlay header with a constrained width (the inner wrap is what carries the constrained width, not `#dwc-header`). **Never `100vw`/`%`**. Inner content width via `megaMenu.innerWidth` / `dropdown.globalInnerWidth` |
| no item hover background | already default; if present, `--dropdown-item-hover-bg: transparent` in `.dwc-dropdown-items-vars` |
| hover colour = darker black | `--menu-item-hover-clr` in `.dwc-top-level-items-vars` (no `!important`) |
| use the Apple logo | locate the logo block and set its image `src` / inline SVG |

Only the "whitish backdrop" row may fall to a CSS-variable class — everything else is a prop. That
ratio (props-first, CSS-variable rarely, global stylesheet never) is what a correct build looks like.

***

**I want to → exact action**

| Goal                                                                               | Action                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Change header bg colour                                                            | `headerBackgroundColor` prop on header block                                                                                                                                                                                                                                                             |
| Change header bg after scrolling                                                   | `sticky.stickyHeaderBackground` prop → CSS `--header-bg-sticky`                                                                                                                                                                                                                                          |
| Make header transparent on load                                                    | `overlay.overlayHeaderBackground` prop → set to `transparent`                                                                                                                                                                                                                                            |
| Change header bg when hovering a nav item                                          | `overlay.overlayHeaderActiveBackground` prop → CSS `--overlay-header-bg-active`                                                                                                                                                                                                                          |
| Add frosted glass / backdrop blur                                                  | `headerBlur` prop → CSS `--header-blur`                                                                                                                                                                                                                                                                  |
| Make header stick on scroll                                                        | `sticky.stickyHeader` prop → `{true}`                                                                                                                                                                                                                                                                    |
| Unlock before/after scroll CSS hooks                                               | `sticky.stickyHeader` + `sticky.specialStickyOverlayStyles` + `overlay.overlayHeader` — all `{true}`                                                                                                                                                                                                     |
| Style nav items differently before/after scroll                                    | Use special styles blocks in `.dwc-top-level-items-vars`                                                                                                                                                                                                                                                 |
| Style toggle differently before/after scroll                                       | Use special styles blocks in `.dwc-toggle-vars`                                                                                                                                                                                                                                                          |
| Change `--overlay-header-bg` after scroll                                          | Not needed — it auto-syncs from `--header-bg-sticky` when `.scroll-down`/`.scroll-up` is on body                                                                                                                                                                                                         |
| Disable sticky on one page only                                                    | Add `data-no-sticky` attribute to any `<section>` on that page                                                                                                                                                                                                                                           |
| Disable overlay on one page only                                                   | Add `data-no-overlay` to any `<section>`                                                                                                                                                                                                                                                                 |
| Suppress special overlay/sticky styles on one page                                 | Add `data-no-overlay-style` to any `<section>`                                                                                                                                                                                                                                                           |
| Opt a section out of offset padding                                                | Add `data-no-padding` to that section                                                                                                                                                                                                                                                                    |
| Change nav item colour                                                             | `--menu-item-clr` in `.dwc-top-level-items-vars` (no `!important`)                                                                                                                                                                                                                                       |
| Change nav item hover colour                                                       | `--menu-item-hover-clr` in `.dwc-top-level-items-vars` (no `!important`)                                                                                                                                                                                                                                 |
| Change dropdown panel background                                                   | `--dropdown-content-bg` in `.dwc-dropdown-items-vars` (no `!important`)                                                                                                                                                                                                                                  |
| Change dropdown item hover bg                                                      | `--dropdown-item-hover-bg` in `.dwc-dropdown-items-vars` (no `!important`)                                                                                                                                                                                                                               |
| Hide chevron arrows globally                                                       | `dropdown.arrowVisibilty` prop on nav block → `Hide`                                                                                                                                                                                                                                                     |
| Set stripe / adaptive height animation                                             | `animation.stripeStyle` or `animation.adaptiveHeight` prop → cannot use both together                                                                                                                                                                                                                    |
| Change mobile breakpoint                                                           | `mobile.mobileBreakpoint` prop on nav block                                                                                                                                                                                                                                                              |
| Change mobile slide direction                                                      | `mobile.slideInDirection` prop on nav block                                                                                                                                                                                                                                                              |
| Move a nav item to header on mobile                                                | `relocation.mode` → `breakout` on the DWC Menu Item                                                                                                                                                                                                                                                      |
| Move any element into the mobile menu                                              | Add `data-breakin="breakpoint"` attribute to that element directly                                                                                                                                                                                                                                       |
| Change toggle icon colour on dark hero (before scroll)                             | `--toggle-color` in BEFORE SCROLLING block of `.dwc-toggle-vars` (no `!important`)                                                                                                                                                                                                                       |
| Change toggle bg (pill)                                                            | `appearance.pillBackgroundColor` prop → CSS `--toggle-bg` (**prop-driven, needs `!important`** to override in CSS)                                                                                                                                                                                       |
| Add a new prop to a component                                                      | `etch.components.updateAsync(id, { properties: [...existing, newProp] })` — see Section 3                                                                                                                                                                                                                |
| Use a nav item as an icon button (e.g. cart, account)                              | Set `general.appearance` → `Icon` on DWC Dropdown, enable `general.useCustomSvg`, paste SVG into `general.customSvg`. **Requires "Allow unsafe HTML" to be enabled in Etch settings.** When `useCustomSvg` is on, the arrow automatically disappears.                                                    |
| Put icon-appearance dropdowns (search/cart) on the right                           | **Default — do nothing.** Trailing icon-appearance DWC Dropdowns are right-aligned automatically. Do **NOT** set `lastItemIsButton` for them (that is a DWC **Menu Item** CTA feature — see gotchas).                                                                                                     |
| Left/centre-align the other items while icons stay right                           | Set `menuMode.nonButtonItemsAlignment` → **`left`** / **`center`** (lowercase — capital `Left` silently fails). Needs `lastItemIsButton` set. This prop is condition-nested inside `menuMode` and requires a recursive schema search to find its stored values.                                                                       |
| Make a real pill CTA button in the nav                                              | Use a **DWC Menu Item** as the last item + `menuMode.lastItemIsButton`. Each CTA position has its **own independent variable set** in `.dwc-top-level-items-vars`: `--menu-cta-*` (last item), `--menu-cta-2-*` (second-to-last), `--menu-cta-3-*` (third-to-last). Style each button differently — e.g. filled vs outlined — purely through these vars. **Never reach for a custom stylesheet** to differentiate CTA buttons; use the per-position var sets instead. (Icon-appearance dropdowns cannot be CTA buttons.)                                                                                                          |
| Break an icon button dropdown out to the header on mobile (sits next to hamburger) | `megaMenu.enable` must be `true` first — `megaMenu.breakout` is only available when mega menu is enabled. Then toggle `megaMenu.breakout` → `true`. Uses the default mobile breakpoint. For a plain icon button with no panel, use DWC Menu Item + `Content` slot + `relocation.mode: breakout` instead. **Also explicitly set this Dropdown's own `general.submenuReveal` → `'expand'` (or `'slide'`, whichever direction you actually want)** — `breakout` only relocates the `<li>` in the DOM (`ResponsiveRelocationSystem`); it does NOT change how the dropdown's own panel opens. Left at `"default"`, a **broken-out** dropdown does NOT dynamically inherit whatever `mobile.submenuReveal` is currently set to on DWC Nav — `default` resolves to `'slide'` unconditionally once the item is relocated outside the nav, regardless of the Nav's own setting. Setting the Nav to `'expand'` will NOT fix this, since breakout dropdowns don't track the Nav's value — only an explicit per-dropdown override does. No error is thrown either way. |

***

## 3. Core helpers

### Core helpers (include at top of every script)

```js
// Resolve DWC component IDs by NAME — they are site-specific, never hardcode (see Section 1).
const compId = (name) => etch.components.list().find(c => c.name === name)?.id;
function getGroup(bid, key) {
  // Guarded: returns {} when the group attribute does not exist on the block yet.
  // Unguarded, .slice() on undefined throws — e.g. inBuilder on a freshly created dropdown.
  const raw = etch.blocks.getAttribute(bid, key);
  return raw ? JSON.parse(raw.slice(1, -1)) : {};
}
function setGroup(bid, key, obj) {
  etch.blocks.setAttribute(bid, key, '{' + JSON.stringify(obj) + '}');
}
function findBlock(nodes, cid) {
  for (const n of nodes) {
    if (n.componentId === cid) return n;
    const f = findBlock(n.children || [], cid);
    if (f) return f;
  }
}
// Default to this for ANY "survey the current tree" pass (initial reconnaissance before a
// rebuild, checking what a page already contains, etc.) — do NOT call plain getJson/getTree
// for a full-subtree dump unless you are actively debugging one specific node you already
// know the id of. A full dump of even a modest nav (7 items, some nested 3 levels deep) runs
// to 4,000+ lines / 200KB+ and has to be read back in multiple paginated chunks — pure token
// cost with no benefit over the fields below for a reconnaissance pass.
function skim(node) {
  return {
    id: node.id, type: node.type, tag: node.tag, componentId: node.componentId,
    slotName: node.slotName, class: node.attributes && node.attributes.class,
    hasScript: !!node.script, childCount: (node.children || []).length,
    children: (node.children || []).map(skim),
  };
}
function extractBlock(css, marker) {
  const i = css.indexOf(marker);
  const s = css.indexOf('{', i) + 1;
  const e = css.indexOf('}', s);
  return css.slice(s, e).trim();
}
// New-block group attributes (create()/replace() JSON) use the SAME encoding as setGroup —
// one extra brace layer, NOT two. Do not hand-roll '{{' + JSON.stringify(obj) + '}}' — that's
// a triple-brace bug that silently makes megaMenu.enable never take effect, with no error thrown.
function groupAttr(obj) { return '{' + JSON.stringify(obj) + '}'; }
```

### Building classed content for new blocks (create()/replace()) — use this exact helper

**Do not deviate from this pattern:** a brand-new node handed to
`create()`/`replace()` needs **both** `attributes.class` (the literal class-name string) AND
`styles: [styleId]` (pointing at the matching style entry) set together on every node that has
a class. Neither field alone is enough — a node with only `styles: [...]` and no `attributes.class`
saves with NO error and NO visible symptom in the API response; the panel simply renders with zero
CSS applied, discoverable only by a live `getJson` round-trip or by the user inspecting the actual
page. (The "class is derived from `styles[]`" behaviour described under "Renaming classes on
existing blocks" applies only to blocks that **already exist** — renaming a style entry's selector
retroactively updates every block that already references it. It does **not** mean a fresh node's
class can be omitted at creation time.)

Always build classed nodes with this helper — do not hand-roll a version that sets only one of
the two fields:

```js
// STYLE_ID: map every BEM class name used in this script to its style entry id (Section 1/3).
const STYLE_ID = {
  'my-panel': 'abc123', 'my-panel__title': 'def456', // ...etc, filled in per task
};
function textNode(text) { return { type: 'etch/text', version: 1, context: {}, text, attributes: {}, styles: [], children: [] }; }
function el(tag, className, attrs = {}, children = []) {
  const finalAttrs = className ? Object.assign({ class: className }, attrs) : attrs;
  const styleIds = className && STYLE_ID[className] ? [STYLE_ID[className]] : [];
  return { type: 'etch/element', version: 1, context: {}, options: {}, tag, attributes: finalAttrs, styles: styleIds, children };
}
// pass className = null for elements that need no class (e.g. <li>, <a> wrappers, svg primitives)
```

**Mandatory before scaling to more than one block:** round-trip one built node through
`getJson` and confirm both fields are present, per the Pre-Script Declaration gate:

```js
const check = etch.blocks.getJson(newId);
if (!check.attributes.class || !check.styles.length) {
  throw new Error('class/styles missing after replace() — do not batch-apply, fix el() usage first');
}
```

## 6. Rules & gotchas

### Group attribute encoding — always exactly one extra brace layer, never two

Every group attribute (`megaMenu`, `general`, `mobile`, `inBuilder`, nested groups like
`mobile.submenuSlideExtras`, etc.) is stored as `'{' + JSON.stringify(obj) + '}'` — ONE
extra `{`/`}` wrap around the JSON object string, giving exactly **two** braces total on
each side (`{{"enable":"{true}",...}}`). This is what `setGroup`/`getGroup` (Core helpers,
Section 3) do — e.g. `mobile.submenuSlideExtras: "{{\"fadeItemsOnSlide\":\"{false}\"}}"`.

**Do not write `'{{' + JSON.stringify(obj) + '}}'` for a new block's group attribute** —
`JSON.stringify(obj)` already supplies the object's own `{`/`}`, so adding two more braces
produces **three** total on each side. Etch does not recognize a triple-brace-wrapped group:
`megaMenu.enable` silently never evaluates true, and the mega-menu panel never renders, with
no error thrown anywhere.

Always build new-block group attributes with the same helper used for existing blocks:
```js
function groupAttr(obj) { return '{' + JSON.stringify(obj) + '}'; }
// e.g. attributes: { megaMenu: groupAttr({ enable: '{true}', width: '#dwc-header', breakout: '{false}' }) }
```
After creating/editing any group attribute, round-trip it once with `getGroup` before scaling
to many blocks — this is cheap and catches an encoding mistake immediately instead of after
a full batch build.

### Editing workflow — keep the panel open while styling

Before editing any mega menu / dropdown, set `inBuilder.keepOpen` to `{true}` on that DWC Dropdown so the panel stays open in the builder for the user to watch; toggle it back to `{false}` (or remove it) once the edits are done. Set/read it via the `inBuilder` group attribute:

```js
function setGroup(bid,key,obj){ etch.blocks.setAttribute(bid,key,'{'+JSON.stringify(obj)+'}'); }
setGroup(dropdownId, 'inBuilder', { keepOpen: '{true}' });  // before edits
await etch.saveAsync();
// ...do the styling...
setGroup(dropdownId, 'inBuilder', { keepOpen: '{false}' }); // when done
await etch.saveAsync();
```

Always pair them — never leave a menu stuck open at the end of a session.

### Execution discipline — name the method before writing it

**Before writing any script line, identify the documented method by name.** If you cannot point to the specific section of this skills file or the API docs that covers the approach you are about to use, look it up first. Do not proceed on familiarity or assumption.

This applies mid-task, not just at session start. Reading docs once at the beginning creates awareness — it does not replace consulting them at each decision point during execution.




### Save first, then verify. And when they disagree, stop early.

**`saveAsync()` before you fetch anything.** An unsaved change reads back perfectly from
`getJson`/`getAttribute`, because those read the editor, not the database. The published page will
show the old value and you will have two trustworthy-looking sources contradicting each other.

**Which page do your edits appear on?** The builder tab's `post_id` is not necessarily the page you
should fetch. A published page names itself in its own `link: <.../wp-json/wp/v2/pages/N>` response
header, so fetch the page and read that header to confirm you are looking at the right one before
concluding anything from what you see.

**When the page contradicts the editor, work cheapest-cause-first and stop at the first hit:**

1. **Did you actually save?** Run `saveAsync()` again and re-fetch. This is almost always the answer.
2. **Is the response cached?** Check `cf-cache-status` and friends. `DYNAMIC` rules caching out.
3. **Are you on the right page?** Compare the `link` header above against what you edited.

**Three checks is the budget.** If none explains it, stop and report the discrepancy plainly. Do not
start sweeping other pages, listing templates, or auditing the site. A one-attribute change is never
worth a site-wide search, and the cause is nearly always item 1.

### Returning to existing work: do not pay full startup for a small change

A correction to something already built is not a new build, and the full-read-plus-full-dump opening
is the single largest cost in a short session. On a long build it is a rounding error; on a one-prop
fix it can be most of what the user pays for.

**When the task is a targeted change to work that already exists**, read this much and no more:

1. The **Rules & gotchas** section, which is where silent failures live.
2. The **one** Ref 4 row for the prop you are changing, after the fingerprint check.
3. The **specific block** you are editing, found by name or selector. Not the tree.

**Do not** re-read this file end to end, dump component schemas, walk the whole block tree, or
inventory panels you are not touching. You already know the shape of the work; you are changing one
thing in it.

**If a context file records the build** (see the session rules above), read it first. It is there so
a later correction does not rediscover decisions that were already made and written down.

**Escalate only on evidence.** If the change turns out to touch structure you do not have, or a prop
whose behaviour contradicts what you were told, stop and read the section that covers it. Widening
because a task feels risky is how a five-minute fix costs an hour.

### Recon budget: scale it to the operation

**Under option (b), a destructive rebuild, stop reading once you can build.** You need four things:
the header block's id with its parent and index, the component ids resolved by name, the surviving
`.dwc-*-vars` style entries (these outlive the rebuild and are your Tier 2 targets), and the backup.
Take those, then start building.

**Do not inventory content you are about to delete.** Listing the current nav items, reading their
props, or walking the existing panel tree describes something that will not exist in five minutes.

**If you walk the tree twice, you did not know what you were looking for the first time.** Three
whole-tree reads in a row is not thoroughness, it is a search without a query. Decide what you need,
then take it in one targeted read.

For a **non-destructive** edit the opposite holds: you must know what is there before you change it.
But target the block you are touching, not the whole document.

Ordering note: the Backup Invariant gates destructive code, not reads, so recon before the backup is
permitted. It is still the wrong order, for a plain reason. If the session dies during recon nothing
has been destroyed, so nothing is lost except the recon itself. Take the cheap backup early and the
expensive reading later.

**Write temp scripts with your file-writing tool, never a shell heredoc.** Script bodies are full of
quotes, backticks, `$` and regex, all of which the shell tries to interpret. `cat > f <<'EOF'`
fails to parse and writes nothing, so you lose the call and learn nothing. Write the file directly
and the shell never sees the contents.

### Never set a prop to its default value

**Compare the default against what the block currently holds, not against what you want.** If the
block has no value for the prop, or already holds the value you want, leave it alone: writing it
adds noise to the attribute store and hides which settings were deliberate.

**But if the block holds a different value, you must write, even when the value you need happens to
be the default.** A Dropdown sitting on `click` does not become `both` because `both` is the
default; the stored `click` keeps winning until something overwrites it. "Skip it, that's the
default" is correct only for a prop that is unset or already correct, and applying it to a prop with
a conflicting stored value silently fails the task while looking like good hygiene.

Example: on a block that has never had `dropdown.dropdownOffsetGap` set, writing `0` is redundant,
because the default is already `0px`. On a block currently holding `24px`, writing `0` is required.

### Global vs local props — always prefer global for consistent behavior

When a prop has both a **global** (nav-level) and a **local** (per-dropdown) version, **always use the global prop** if you want the same value across all dropdowns. Never configure the same prop individually on each dropdown — it creates maintenance overhead and the local value silently overrides the global. Only set a local override when a specific dropdown genuinely needs a different value from the rest.

Examples: `dropdown.globalMegaMenuWidth` (nav) vs `megaMenu.width` (per-dropdown) — `dropdown.globalNestedDropdownWidth` (nav) vs `nestedDropdown.width` (per-dropdown). This principle applies to any prop pair that has both a global and a local equivalent.


### Persistence model

| Namespace            | Buffered? | How to persist           |
| -------------------- | --------- | ------------------------ |
| `etch.blocks.*`      | Yes       | `await etch.saveAsync()` |
| `etch.styles.*`      | Yes       | `await etch.saveAsync()` |
| `etch.loops.*`       | Yes       | `await etch.saveAsync()` |
| `etch.components.*`  | No        | Persists immediately     |
| `etch.stylesheets.*` | No        | Persists immediately     |
| `etch.fields.*`      | No        | Persists immediately (all methods are async, no saveAsync) |

### DO NOT

> ⚠ **CRITICAL — READ BEFORE WRITING ANY `create()` CALL FOR A COMPONENT BLOCK**
> A DWC component block (`etch/component`) created with `children: []` has **no accessible slots in the same script**. Slot children only materialise after `saveAsync()` and a reload. If you need to access a slot immediately (to populate a mega menu panel, for example), you **must** include the `etch/slot-content` children in the `children` array at create time — with at least a placeholder element inside each slot you intend to populate. Then call `etch.blocks.getJson(newId)` to retrieve the slot, and `replace()` the placeholder with your styled content. The block type `etch/slot-content` is a valid authoring type (it is listed in the full `type` union in "Block node shape"). Passing `children: []` and then trying to find a slot child in the same script will always return `undefined`.

* **DO NOT** set `dropdown.dropdownContentBorderSize` to `0` or any value below `1px` — use `1px` as the minimum; set `dropdownContentBorderColor` to `transparent` if you want an invisible border
* **DO NOT** use `%` or `100vw` for `megaMenu.width` / `globalMegaMenuWidth`. `%` resolves relative to the parent dropdown item; `100vw` includes the scrollbar width and causes horizontal overflow. **For full-width headers, use `#dwc-header` (or the `header` tag)**. **For overlay headers with a constrained width, use `.dwc-nest-header`** — `.dwc-nest-header` is always the header inner wrap selector and is the element that actually carries the overlay-constrained width. Using `#dwc-header` with a constrained overlay header will make panels span the full viewport width instead of the header width.
* **DO NOT** guess select prop values from their UI label — the stored value is always the right-hand side of the ` : ` separator in `selectOptionsString` (e.g. `"Left : left"` stores `left`, not `Left`; `"Hover only : hover"` stores `hover`). When there is no ` : `, the stored value equals the label. **Always read the prop table’s Values column before setting any select prop.** Using a label instead of its stored value silently fails — the component ignores it and falls back to the default.

* **`interactionUx.dropdownTriggerMode` on DWC Nav is inert. Set the trigger per Dropdown.** A DWC
  Dropdown's own `dropdownTriggerMode` has no `default`/inherit option, so whatever value it holds
  always wins and the Nav-level global never takes effect. This is the one documented exception to
  preferring a global over a per-item local: for trigger mode there is no working global, and setting
  it is a silent no-op. Do not "fix" a per-item trigger by removing it to fall back on the Nav global.

* **When a user asks for hover, set `both`, not `hover`. This one has a required output.**
  `both` opens on hover *and* on click, so it delivers the hover behaviour asked for while staying
  reachable by keyboard and on touch, where a hover-only trigger is simply unusable. "Open on hover"
  from a user is a description of what they want to happen, not an instruction to disable clicking.
  **Set `hover` only if the user has explicitly said click must not open the panel.** Either way,
  state in your reply which value you set and why, in one line. Silently choosing `hover` is the
  failure this rule exists to prevent: it is invisible in a read-back, invisible in a screenshot, and
  it makes the menu unusable for keyboard and touch users.

* **Custom SVGs on `icon`- and `button`-appearance Dropdowns must be stroke-based.** The
  distributable stylesheet colours them with
  `.dwce-dropdown:is([appearance="icon"], [appearance="button"]) > .dwc-submenu-toggle > button svg { stroke: var(--icon-clr) !important }`.
  A fill-based glyph therefore ignores `--icon-clr` entirely and renders in whatever colour is baked
  into the markup, or invisibly. Author these with `fill="none"` and `stroke="currentColor"`. This
  applies only to those toggle SVGs: **the logo is a different element and is not stroke-coloured**,
  so a fill-based logo is correct and must not be "fixed" to match.
* **DO NOT** derive a prop's PATH from a heading in `components/`. Those docs describe the Etch
  settings **panel**, and the panel's grouping is not the API's grouping. Inside DWC Dropdown's single
  "General" section, **Text** is `text` and **Dropdown Trigger Mode** is `dropdownTriggerMode`
  (both top-level), while **Appearance**, **No Arrow**, **Use Custom SVG** and **Custom SVG** are
  `general.appearance`, `general.noArrow`, `general.useCustomSvg` and `general.customSvg`. Four
  of the seven fields in one panel section carry the prefix and three do not, and nothing on screen
  tells them apart. Take paths from the prop reference or a live read; a wrong path writes an
  attribute nothing reads, with no error.
* **Padding that desktop does not need is the padding mobile is missing.** When an element sits
  inside a constrained parent (e.g. `dropdown.globalInnerWidth: min(1224px, 100%)`), the gap to the
  screen edge is supplied by the **parent**, not by the element. Below the collapse breakpoint that
  constraint stops producing any gap and the content goes edge to edge. The failure is not that you
  forgot a rule: padding never entered the design at all, because on desktop there was nothing to
  see, so the responsive pass has no padding to vary. For every element whose desktop inset comes
  from a parent width limit rather than its own padding, name what holds it off the screen edge on
  mobile. If the answer is nothing, add the padding.
  **`dropdown.globalInnerWidth` and `megaMenu.innerWidth` are exactly such parents, and neither
  reaches the mobile drawer.** Once the nav collapses, a mega menu panel renders as a mobile submenu
  panel, the inner-width wrapper stops applying, and the panel measures the full viewport at
  `left: 0`. Even a self-insetting value like `min(980px, calc(100% - 2.5rem))` protects desktop and
  narrow desktop while leaving mobile edge to edge. Give the panel root its own `padding-inline`
  inside `@container (width < <mobileBreakpoint>)`; it cannot double up with the inner width,
  because above that breakpoint the container query does not match. `--menu-item-inline-padding`
  sets the same trap: the mobile drawer supplies no inset of its own, so a small value in the MOBILE
  ONLY block of `.dwc-top-level-items-vars` puts every mobile menu item hard against the edge.
  **`padding-block` on the panel root is a different matter: on an expand-mode mega menu it is
  forced to zero and you must not fight it.** The plugin ships
  `[data-submenu-reveal="expand"][data-megamenu="true"] .dwc-dropdown-content > :is(div, li) {
  padding-block: 0 !important }`, because the panel opens and closes by animating
  `grid-template-rows` from `0fr` to `1fr` on `.dwc-dropdown-content` under `overflow: hidden`. A
  `0fr` row only reaches zero height when its content contributes none, so vertical padding on the
  direct child would hold the panel permanently open. **Put `padding-block` on an inner wrapper
  `div` nested inside the panel root instead.** The `>` combinator does not reach the wrapper, while
  its height still sits inside the collapsing row, so the collapse keeps working. Do not try to reuse
  the direct child for this: it is the element the plugin fades (`opacity: 0`, back to `1` on
  `.open.active`), so it is not a spare layer. `padding-inline` is untouched by the rule and belongs
  on the panel root as above. Symptoms of getting this wrong are a panel that will not close on
  mobile, or vertical padding that silently never applies; `display: flow-root` and other
  margin-collapse fixes do nothing here, because the cause is an `!important` declaration, not
  collapsing margins.
  **Never hardcode that rule's breakpoint.** `1200px` is only the shipped default: at runtime the
  engine rewrites every `max-width` media query in its own style tag to the nav's
  `data-mobile-breakpoint`, so scope your own CSS to the same configured value. When offcanvas is
  active the engine skips that rewrite and uses `5000px`, which puts the rule in force at every
  viewport width rather than only on mobile.
* **DO NOT** use `menuMode.lastItemIsButton` to make an icon/cart/search button or to right-align it. **`lastItemIsButton` + the `--menu-cta-*` CTA styling only work on DWC *Menu Item* last items, not on DWC *Dropdown* items** (even with `general.appearance: button`/`icon`). For a dropdown-as-icon/button, use the dropdown's own `general.appearance` (`icon`/`button`); trailing icon dropdowns are **right-aligned by default** (no `lastItemIsButton` needed). For dropdowns, `lastItemIsButton` only enables `nonButtonItemsAlignment` (left/center of the other items). *(Not stated in the official component documentation.)*
* **DO NOT** modify selector strings in special styles blocks — only add values inside `{ }`
* **DO NOT** use raw `rgba()` — use `color-mix(in oklch, ...)`
* **DO NOT** use `replace()` — use `replaceAll()` (CSS blocks contain both commented and active declarations)
* **DO NOT** pass multi-line scripts inline — use `-f file.js`
* **DO NOT** wrap connector scripts in an IIFE (`(async () => { ... })()`). The connector already executes the script body as an async function — an IIFE returns a Promise object, not its resolved value, causing the eval to return `null`. Always write top-level `await` and `return` directly.
* **DO NOT** call `saveAsync` after `components.*` or `stylesheets.*`
* **DO NOT** style mega menu content via a custom stylesheet — use props
* **DO NOT** use `{propKey}` in component edit mode bindings — use `{props.propKey}`
* **NEVER read, edit, or `appendAsync` to the `DWC Mega Menu` stylesheet** — it contains the distributable CSS installed by the user, and it is the implementation, not the interface. Do not open it to work out what a prop does or which selector a feature uses: it is ~188KB, inferring behaviour from a selector is unreliable, and any conclusion drawn from it goes stale at the next plugin update. If you need a CSS-level fact and cannot find it in Section 2, Section 4, Section 6 or the component docs, that is a documentation gap — say plainly what you needed and could not find, then proceed on documented behaviour or stop. Never look up this stylesheet's id.
* **Block IDs change between sessions** — always rediscover with `findBlock(etch.blocks.getTree(), componentId).id`. Never use a cached block ID from a previous session.
* **Tab name — always read from server output.** Never cache it. The connector must be running anyway, so the tab name is always available in the output.
* **User context file stores templates only** — do not write tab names, block IDs, or style IDs to it.
* **`etch.blocks.update` in component edit mode does NOT persist script changes** — use `etch.components.updateAsync(id, { blocks: comp.blocks })` instead. The script lives in the component template, not the block instance.
* **Component `script.code` is plain JS when read via API** — direct string replacement works. No base64 decode/encode needed despite being base64 in the raw JSON file.
* **`etch.styles.setVariable('--var-name', value)` sets a `:root` custom property — it does NOT modify variables declared inside a style entry.** The first argument is the **variable name** (e.g. `'--menu-item-clr'`), not a style entry ID. A more-specific selector rule in a style entry will override any `:root` value. To reliably change a CSS variable inside a style entry, read the CSS string, string-replace the declaration, and call `etch.styles.update(id, { css })`.
* **Before any `etch.styles.*` call, confirm the method applies to the target.** `setVariable` cannot reach variables inside nested CSS blocks (e.g. `&[appearance='icon']`, `&[appearance='button']`). If the variable lives inside a nested selector, stop — use read → string-replace within that block only → `styles.update`. Never use `setVariable` as a shortcut without first confirming the variable is at the root level of the style entry.
* **`etch.styles.create(selector, css)` — second arg is a CSS STRING only.** Do NOT pass an object `{ css, type, collection }`. Passing an object stores it as the `css` value; when PHP's `CssProcessor::preprocess_css()` receives an array instead of a string it causes a WordPress critical error on the frontend.
* **`styles` is not part of `BlockPatch` and cannot be set via `etch.blocks.update()`.** `BlockPatch` only accepts `{ name?, hidden?, attributes?, text? }`. The `styles` array is read-only on `PublicBlockJson`; wire it at creation time via `replace()` with `styles: [styleId]` in the JSON, or use `addClass`/`removeClass`.
* **A DWC Dropdown's content slots are identified by a top-level `slotName` field, not by child index.** The two `etch/slot-content` children are `Mega_Menu_Content` and `Nested_Dropdown_Content`. `options`/`context` are empty on these — read `child.slotName`. Always select with `.find(c => c.slotName === 'Mega_Menu_Content')`.
* **Inline SVG data-URIs in `content`, `mask`/`-webkit-mask`, or `background` MUST be percent-encoded — never use `data:image/svg+xml;utf8,<svg…>` with raw markup.** The `;utf8,` form with unescaped `<`, `>`, spaces, and quotes silently fails to load in Chrome (the Etch builder), so a `content: url(...)` pseudo-element renders nothing and a mask shows nothing — with no error. Encode with `'data:image/svg+xml,' + encodeURIComponent(svg)` (a standard JS built-in, allowed in safe mode). Use single quotes inside the SVG so the encoded string has no `"` to clash with the `url("…")` wrapper.
* **Every node in `create()`/`replace()` block JSON needs a `children` array — including `etch/text` nodes.** Text nodes are `{ type:'etch/text', version:1, context:{name:'Text'}, options:{}, text:'...', children:[] }`. Omitting `children:[]` on a text node fails validation with `expected array, received undefined`. Element text content lives in child `etch/text` nodes, not a `text` attribute (that attribute is for components like Menu Item labels). Inline tags like `<em>`/`<span>` are plain `etch/element` nodes (no class/styles needed) wrapping their own text node — style them from the parent's entry via `& em` / `& span`.
* **`create()` accepts `null` (or an omitted `parentId`) to insert at the document root.** Inserting under a parent that can't contain the block — a text block, a void element like `img`, or a text container handed a block-level child — throws `WRONG_BLOCK_TYPE`. The same rule applies to `move()` (the block is left in place) and to indexed `pasteAsync()`.
* **NEVER use `replace()` to edit an already-populated block — it resets EVERY attribute on EVERY node in the subtree**, silently wiping user edits (a swapped image `src`, a changed link, a renamed class). To change copy in place, locate the `etch/text` node and call `etch.blocks.setText(textNodeId, 'new text')` — then `await etch.saveAsync()`. Only use `replace()` to populate an empty placeholder or when you intend to rebuild the whole subtree from scratch. Walk to the text node via the parent element's class: `el.children.find(c => c.type==='etch/text')` (for mixed content like a heading with `<em>`, set each text node individually — the first text node, the `<em>`'s inner text node, and the trailing text node).
* **Recovering a value clobbered by `replace()` (or any bad edit) — `etch.history` is read-recoverable.** It exposes `undo()`, `redo()`, `canUndo()`, `canRedo()` (both return `void` — do NOT await). Pattern: call `etch.history.undo()` repeatedly, reading `etch.blocks.getTree()` after each step until the lost value reappears, capture it, then call `etch.history.redo()` the SAME number of times to return to the current state — reading between steps does not mutate or save. **Caveat: undo/redo did NOT cleanly round-trip a `replace()` in practice** (text reverted while the recovered image stuck). So use history only to _read back_ the lost value, then re-apply it explicitly with `setAttribute`/`setText` — never rely on redo alone to restore the full prior state.
* **`etch.blocks.addClass(id, className)` and `removeClass` take CSS CLASS NAME STRINGS — not style entry IDs.** They modify the HTML `class` attribute only. `addClass` does NOT wire the block's `styles[]` array to an existing style entry — it just appends the string to the class attribute. `removeClass` removes the class string AND (by looking up a style entry with that CSS selector) removes the matching style entry ID from `styles[]`.
* **The `styles[]` array and the HTML `class` attribute are independent.** PHP uses `styles[]` to decide which style-entry CSS to include in the page `<style>` tag. The `class` attribute is the rendered HTML class. Changing one does not automatically change the other.
* **To change which style entries apply to a block:** Use `removeClass(id, 'old-css-class')` (removes the class AND the matching style ID from `styles[]`), then `addClass(id, 'new-css-class')` (adds the class to HTML; but this does NOT add the matching style entry ID to `styles[]`). Result: HTML class is correct, but `styles[]` no longer references the new style entry.
* **Workaround for styles\[] not updating:** Put the CSS in a custom stylesheet you create (always output by PHP) instead of relying on per-block `styles[]`. This avoids the issue entirely — a custom stylesheet's CSS applies by CSS selector regardless of `styles[]`.
* **`setAttribute(id, 'class', value)` does NOT reliably persist the class.** The HTML class attribute is reconstructed from the `styles[]` array on save/reload. Always use `addClass`/`removeClass` to modify classes — never `setAttribute` for the `class` key.
* **Block IDs change on every page reload** — always rediscover by walking `etch.blocks.getTree()`. Never hardcode IDs across sessions or after a reload.
* **`getGroup` returns `undefined` if the group attribute doesn't exist yet on the block** — calling `.slice()` on it will throw. Always guard: `const group = etch.blocks.getAttribute(bid, key) ? getGroup(bid, key) : {};`. `setGroup` has no such problem — it creates the attribute if absent. For group props that may not be initialised (e.g. `inBuilder` on a freshly created dropdown), call `setGroup` directly without reading first.
* **Never `replace()` a populated block** — it resets every attribute on every node, wiping user edits. Edit content in place with `etch.blocks.setText(textNodeId, ...)` + `saveAsync()`. Includes the text-node walk pattern and the mixed-content (heading with `<em>`) note.
* **History recovery** — `etch.history.undo()`/`redo()` (return void, not async) can read back a clobbered value, but doesn't reliably round-trip a `replace()`, so always re-apply the recovered value explicitly with `setAttribute`/`setText` rather than trusting redo.
* **DO NOT** leave a block's nice-name (`context.name`) stale after renaming its class — rename it too via `etch.blocks.rename(id, name)`. Use the generic BEM-derived name (base class Title Cased for the base block, element-role-only Title Cased for sub-elements, identical name across sibling instances) even if the block currently holds a more descriptive content-specific name — generic structural names stay correct as content changes; descriptive ones go stale.
* **A `"condition"`-type wrapper in the schema is UI-only and flattens away — but a `"group"`-type wrapper nested behind a condition is a REAL nesting level. Check `type.specialized` on the wrapper node itself before assuming either way; don't guess from key-path shape alone.** `etch.components.getJson()` shows nested paths like `megaMenu.megaMenu.breakout` or `sticky.stickyEnabled.stickyHeaderBackground` — the middle segment (`type.specialized: "condition"`) only controls when the field shows in the properties panel, so the actual stored attribute is flat: `{ enable, width, breakout }` at the top level of the group object. **This does NOT generalize to every nested-looking path.** `mobile.submenuSlideExtras` is a `type.specialized: "group"` node (sitting behind its own condition wrapper) — its children (`submenuSlideoutDistance`, `submenuSlideoutOpacity`, `fadeItemsOnSlide`) are genuinely nested *inside* `submenuSlideExtras`, not flat siblings under `mobile`. Setting `submenuSlideoutDistance`/`submenuSlideoutOpacity` as flat `mobile.*` siblings round-trips fine via `getAttribute`/`JSON.parse` (looks correct) and saves with no error, but the component never reads that flat location — the live render silently keeps using the 100%/opacity-1 defaults. The only reliable check is the raw distributable component JSON's actual `properties` nesting (e.g. `dwc-header-backup.json`), which shows `submenuSlideoutDistance`/`submenuSlideoutOpacity`/`fadeItemsOnSlide` all as siblings **inside** `submenuSlideExtras`'s own `"properties"` array. **Before writing to any prop reached via a multi-segment path, verify each segment's `type.specialized` individually — `condition` flattens, `group` nests — rather than pattern-matching against one other example.** Correct write: `setGroup(navId, 'mobile', { ...mobileGroup, submenuSlideExtras: groupAttr({ submenuSlideoutDistance: '60%', submenuSlideoutOpacity: '0', fadeItemsOnSlide: '{true}' }) })`.
* **Mega-menu Dropdown breakout items use `[data-breakout-mega="true"]`, NOT `[data-breakout]`.** `[data-breakout]` is the attribute used by DWC Menu Item's `relocation.mode=breakout` and the logo breakout feature — a CSS rule written against `[data-breakout]` for a `megaMenu.breakout` icon-appearance Dropdown will silently match nothing. The distributable stylesheet's own CSS never references `data-breakout-mega` (no rule needs it), so searching stylesheet text for "breakout" surfaces only the unrelated attribute and will not reveal this one. Trace to the component's actual rendered output (fetch the published page, or read the component's own `script.code`) instead of an adjacent-looking selector.
* **`megaMenu.breakout` relocates the `<li>` in the DOM — it does NOT set the dropdown's own opening direction, and does NOT dynamically track DWC Nav's `mobile.submenuReveal`.** `ResponsiveRelocationSystem` (DOM move) and the dropdown's own reveal logic are separate systems (see `javascript-api.md`'s systems table). A broken-out Dropdown left at `general.submenuReveal: 'default'` resolves to `'slide'` unconditionally once relocated outside the nav — **not** whatever the Nav is currently set to; changing the Nav's `mobile.submenuReveal` will not fix a breakout icon stuck sliding in from the side, only an explicit `general.submenuReveal: 'expand'` on that specific Dropdown does. **Always explicitly set `general.submenuReveal` on a breakout Dropdown** (`'expand'` for downward, `'slide'` for from-the-side) rather than leaving it at `'default'`. **A relocated item is no longer an `<li>`.** The engine builds a fresh `<div>`, copies every attribute onto it (`data-breakout-mega` included), moves the children across, and prepends that `<div>` to `nav.dwce-nav-nested` (the same element as `.dwc-nest-menu`). **Never tag-qualify the selector**: `li[data-breakout-mega='true']` matches nothing on mobile and any rule hung off it silently never applies. Write `& > [data-breakout-mega='true']` instead. **Prepending is also why source order reverses once more than one item breaks out**, so two icons authored Search then Bag come out Bag then Search. Restore the intended order with `order` on the nav's direct children, scoped to `html.dwc-mobile` so desktop is untouched, and set `.dwc-nav-wrapper { order: 0 }` as well, or its own default `order: 0` places it ahead of both icons.
* **To hide/fade a breakout dropdown's icon, target the toggle BUTTON inside it, not the dropdown `<li>` wrapper — and remember `.dwc-open` only fires for the MOBILE MENU, not for a breakout dropdown opening its own panel.** Two separate mistakes here:
  1. The `<li>` carries `[data-breakout-mega='true']`, but the actual visible/interactive element is a child `.dwc-submenu-toggle` (same child selector the icon-appearance CSS uses: `&[appearance='icon'] > .dwc-submenu-toggle`). Applying `opacity`/`pointer-events` to `[data-breakout-mega='true']` itself hides the wrong layer. The `<li>` is not purely a wrapper, though: it carries its own visible ring from `--breakout-border` in `.dwc-top-level-items-vars` (default `solid 1px color-mix(in oklch, var(--primary-clr) 50%, transparent)`), so fading only the toggle leaves that ring hanging in the header with nothing inside it. For bare-glyph breakout icons set `--breakout-border: none` rather than trying to fade it.
  2. `.dwc-open` is added when the **mobile hamburger drawer** opens — it does NOT appear when a breakout dropdown (e.g. a relocated Search/Bag icon) opens **its own panel**; that's a completely different open state, since the item no longer lives inside the mobile menu subtree at all. That case instead adds `.open` to the breakout `<li>` itself: `[data-breakout-mega='true'].open`. If you only fade on `:has(.dwc-open)`, opening a breakout dropdown's own panel won't trigger the fade at all.

  A third mistake compounds these: **`[data-breakout-mega='true'].open` fires whenever that dropdown's own panel opens, at ANY viewport — not just mobile.** Without scoping, clicking a breakout icon's own panel on *desktop* fades that same icon out (since opening it adds `.open` regardless of breakpoint), even though the whole "fade icon on open" requirement is mobile-only — unscoped CSS silently breaks desktop too (icon vanishes on desktop click). Must wrap in the plugin's own mobile-scope convention (same one used in `.dwc-top-level-items-vars`'s "MOBILE ONLY STYLES" block):

  ```css
  html.dwc-mobile .dwc-nest-header__container:has(.dwc-open, [data-breakout-mega='true'].open) [data-breakout-mega='true'] > .dwc-submenu-toggle {
    opacity: 0;
  }
  html:not(.dwc-mobile) .dwc-nest-header__container [data-breakout-mega='true'] > .dwc-submenu-toggle {
    opacity: 1; /* desktop: never affected by open state */
  }
  ```
* **`etch.stylesheets` has no `update()` — only `list()` and `appendAsync()`.** To fix CSS already appended to a stylesheet, append a corrective rule rather than trying to edit in place; the old dead rule is harmless if it never matched anything. (`etch.styles.update(id, {...})` exists but is a different namespace — style *entries*, not whole stylesheets.) *(Note: Etch's public API reference — `ETCH-DEV-API/docs/public-api/stylesheets.md` — documents `etch.stylesheets.updateAsync()`/`createAsync()`/`deleteAsync()` as real methods with working examples, which may reflect a connector-specific proxy limitation rather than a genuinely missing method. Re-verify live with a quick `typeof etch.stylesheets.updateAsync` check before trusting either claim.)*
* **`403 rest_cookie_invalid_nonce` on `saveAsync()` (or any `etch.*` write) means the user's WordPress session has logged out** — it is not a connector bug. Stop immediately, tell the user plainly, and ask them to log back into WordPress, refresh the Etch builder tab, then reconnect (re-run `serve` if the connection dropped). **Critically: any buffered call you assumed succeeded right before the failed `saveAsync()` (e.g. a `delete()` or `update()`) did NOT actually persist** — after reconnecting, re-read live state via `getTree()`/`getJson()` before trusting that a pre-error mutation took effect, rather than assuming it did.
* **A sticky header's translucent/blurred-on-scroll look does NOT require `sticky.specialStickyOverlayStyles` or any `.dwc-header-vars` special-styles-block CSS.** `overlay.overlayHeader: {true}` + `overlay.overlayHeaderBackground` (translucent value) + `headerBlur` on the DWC Header, combined with `sticky.stickyHeader: {true}`, is sufficient on its own — the overlay background/blur only visually engages once the header is in its stuck/sticky state. This contradicts the literal reading of the "Unlock before/after scroll CSS hooks" row in Section 2's "I want to" table (which implies `specialStickyOverlayStyles` is required); that prop is only needed for *further* per-state fine-tuning (e.g. differentiating hover-open vs not), not for the basic translucent-on-scroll effect. Try the simple 3-prop combo first before reaching for the special-styles scaffold.
* **To swap a logo for an inline vector, `replace()` the `etch/svg` node with an `etch/element` of `tag: 'svg'`.** An `etch/svg` block holds a URL in `attributes.src` and fetches it; it is not a container for markup. Build the vector as a normal element tree instead — `{ type:'etch/element', tag:'svg', attributes:{ viewBox, xmlns } }` with `tag:'path'` element children carrying `attributes.d` — and colour it from the parent's style entry via `& svg path { fill: ... }`.
* **No prop distributes top-level nav items across the header width.** `menuMode.nonButtonItemsAlignment` only left/centre-aligns the group, and `--menu-items-gap` only changes the gap. For a nav whose items spread edge to edge inside a constrained header (Apple-style), set `max-width` on the `.dwc-nest-header__container` style entry and add `flex: 1 1 auto` to `.dwc-nav-wrapper` / `.dwce-nav-nested` plus `justify-content: space-between` on `.dwc-nav-nested-items`, each scoped with `html:not(.dwc-mobile) &` so mobile is untouched. **Also give the top-level `<li>` items `flex-grow: 1`.** Spreading the items alone leaves dead space between their hit areas, and with `animation.adaptiveHeight` enabled the pointer crossing that gap closes and reopens the panel, so the height morph visibly stutters on every move from one item to the next. Growing the items until their boxes touch keeps the hover continuous and the transition smooth. These are ordinary style entries, never the distributable stylesheet.

***

## Everything else

The reference file `mega-menu-pro-skills-reference.md` in this folder holds Section 4 (prop
reference), Section 5 (special sticky/overlay styles), Section 7 (JS config), Section 8 (templates),
Section 2a (renaming, theming and cloning existing panels), Section 3b (script recipes) and
Section 9 (Appendix A).

Everything there is a **procedure or a lookup table**: how to carry out an operation, or one value to
read. Nothing there tells you which prop controls which behaviour, or how two features interact.
That knowledge is in this file, in Section 2 and Section 6, because not having it does not make you
do the wrong thing, it makes you go hunting, and hunting is more expensive than reading.

Reach the reference through the Method Index or the Task Index. Do not read it in full.