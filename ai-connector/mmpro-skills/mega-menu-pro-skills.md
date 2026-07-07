---
icon: sparkles
---

# AI Skills Reference

Standalone reference for configuring DWC Mega Menu Pro + Header Builder in Etch via the etch-connector. This file covers Sections 1–3 (90% of tasks) plus the parts of Section 6 you need on every session. Sections 4, 5, the rest of Section 6, 7, and 8 live in the companion `mega-menu-pro-skills-reference.md`, in this same folder — it's lookup-only, consulted via Grep, never read in full at session start.

### When to consult the reference file

| If the task needs... | Grep `mega-menu-pro-skills-reference.md` for... |
| --- | --- |
| A specific component prop not already covered in Sections 1–3 (exact key, CSS variable, select value) | Section 4 — Prop reference |
| Scroll-state / sticky-header / overlay-header special styling | Section 5 — Special sticky/overlay styles |
| Adding a brand-new prop to a component, or style-entry-ID / `etch.styles` API details | Section 6 (continued) |
| `DwcConfig.MegaMenu` / `DwcConfig.CenteredLogo` JS-level overrides (absolute last resort) | Section 7 — JavaScript config |
| Checking for / applying a saved template | Section 8 — Templates |

If a task doesn't match any row above, you don't need the reference file at all.

## START HERE — mandatory workflow

You must execute these steps sequentially. You are strictly forbidden from modifying any workspace files or generating styling code until Steps 1 through 4 are successfully completed and validated via terminal logs.

### 0. Skill File First
1. **Read this entire skill file before writing or executing any edits — no exceptions for length.** This file is long enough that a single `Read` call will return a `[Truncated: PARTIAL view]` notice instead of the full content. If you see that notice, Step 0 is NOT complete — continue reading with `offset`/`limit` until you reach the final line and no truncation notice remains. Do not proceed to Step 1 (Connect & Preflight Gate) on a partial read, even if the visible portion looks sufficient for the task at hand.
2. **File read confirmation (mandatory):** Before proceeding past Step 0, state in chat: `"Skill file read: lines 1-[N] of [N], complete."` (substitute the real total line count). If you cannot truthfully make that statement, you have not satisfied Step 0 — go back and finish reading.
3. If the task involves grouped component props (`megaMenu`, `general`, `inBuilder`, `classes`, `relocation`, etc.), do not use direct `setAttribute` or raw serialized strings until you have confirmed the exact helper from this skill file.
4. Use the documented helper functions for grouped props: `getGroup(bid, key)` and `setGroup(bid, key, obj)`.
5. Never delete or remove a native grouped prop from a DWC component as a cleanup step. If a grouped prop exists, leave it disabled rather than removing it.
6. Delete temporary connector scripts immediately after the task is complete and the changes are verified. Do not leave generated `*.js` eval files in the workspace.
7. If the skill file does not show a helper for the requested prop, stop and do not mutate grouped props until the correct pattern is confirmed.

---

### ⚠ PRE-SCRIPT DECLARATION — mandatory before writing any connector script

You are **strictly forbidden** from writing or executing any connector script until you have output the following declaration verbatim in the chat, with every field filled in from real inspection — not assumed. The user can see this output and will catch any item that is skipped, vague, or faked.

**Output this exact block before every script:**

```
PRE-SCRIPT DECLARATION
─────────────────────────────────────────────
Task: [one sentence describing what this script does]
Skills file sections re-read: [list the specific sections consulted for this task]
Props to set: [list every prop] — schema inspected via etch.components.getJson(): YES
Prop keys confirmed (not assumed): [list keys]
Select values from selectOptionsString (not UI label): [list var: value pairs, or N/A]
Default values omitted: YES — [list any prop you considered but omitted because it matched the default, or N/A]
Global props used instead of local: [list, or N/A]
Responsive code included: YES / N/A — [reason if N/A]
slot-content children included in create(): YES / N/A — [reason if N/A]
Class+styles helper used (Section 3 `el()`, not hand-rolled): YES / N/A — [reason if N/A]
Class+styles round-trip verified on 1 node before batch: YES — [node id + getJson class/styles result] / N/A (no classed content in this script)
Intent confirmed with user: YES / [paste the confirmation]
Verification source: LIVE STATE only
─────────────────────────────────────────────
```

**Hard stop conditions — do not proceed if any of the following are true:**
- Any field above is blank, says "TBD", or was filled from memory/assumption rather than live inspection
- Schema was not actually run — `selectOptionsString` values were assumed from the UI label
- A layout is being built without `@container` queries included
- A local prop is being set when a global equivalent exists
- The user has not confirmed intent on a visual/structural change
- A script creates/replaces classed content but built its own node JSON instead of using the
  Section 3 `el()` helper, or scaled to multiple blocks before round-trip-verifying `class` +
  `styles[]` on one node first — a node with `styles[]` set but `attributes.class` omitted saves
  successfully with no error; nothing in the API response reveals the omission without an
  explicit `getJson` round-trip check
- N similar real content blocks (repeated panels, cards, CTAs, etc.) are being created/replaced
  without following Appendix A.3a (build item 1, round-trip-verify it, only then write items 2–N)
- A "survey the current tree" script calls plain `getJson`/`getTree` for a full-subtree dump
  instead of the Section 3 `skim()` helper — full dumps run to thousands of lines for a modest
  nav and cost pure tokens with no benefit over `skim()` for a reconnaissance pass; only pull a
  full `getJson` on a specific node id you are actively debugging

An agent that writes a script without outputting this declaration, or outputs it with fields filled from assumption rather than inspection, has violated the workflow. The declaration is not a formality — it is the proof that the work was done correctly before execution.

---

> Example: set `megaMenu` on DWC Dropdown using the documented helper, not direct raw JSON.
> ```js
> setGroup(dropdownId, 'megaMenu', {
>   enable: '{true}',
>   width: '#dwc-header',
>   breakout: '{false}'
> });
> ```

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

#### TIER 1: Live Schema Property Inspection (Mandatory Pre-requisite)

> **Doc-first fast path (try before the full dump below):** Check the component doc — `./components/` next to this file (bundled at release time), or the live GitBook URL if that's missing (see "Before you start") — for the prop's key, type, and select options. If the doc directly covers the exact prop/value needed, skip the full dump and instead run **one targeted live check** — e.g. `etch.components.getJson(RESOLVED_ID).properties.find(p => p.key === 'the.one.key')`, or `etch.blocks.getAttribute(blockId, 'group')` for a block's current value — to confirm that single key/value before writing.
>
> **Fall back to the full dump instead of the fast path when:** the doc doesn't cover the prop; a select prop's option list looks short or generic (docs can be stale here — e.g. `dwc-nav.md`'s Slide In Direction row has listed only 3 options where the live schema had 7, including the exact one a task needed); the doc's guidance conflicts with a gotcha already recorded in Section 6 (e.g. `dwc-nav.md`'s Global Mega Menu Width row lists `100vw` as a valid example value, which Section 6 explicitly bans — never trust a doc example over a recorded gotcha); or this is the first time this session touching this component's props at all.
>
> **The targeted check is still mandatory, never optional** — a doc being current today doesn't guarantee it stays current after the next plugin version. Doc-first shortens the round trip; it does not replace verification.

1. Write a local script file named `inspect-schema.js` in the active workspace directory containing this exact layout:
   ```js
   (async () => {
     const componentJson = await etch.components.getJson(RESOLVED_ID); 
     console.log(JSON.stringify(componentJson.properties, null, 2));
     return { success: true };
   })();
   ```
   *(Ensure `RESOLVED_ID` matches your resolved component ID from Step 1).*
2. Execute the file via your terminal tool using the strict file flag:
   `npx @digital-gravy/etch-connector eval -t "[tab-name]" -f inspect-schema.js`
3. Read the terminal standard output logs (`stdout`) to identify matching properties.
4. Output this exact structural declaration in the chat window using the real terminal output data before generating any final implementation code:
   `"I have read the live schema for ID [ID]. The existing props are: [list relevant props found]. There is/is not a native prop for this request."`
5. Delete `inspect-schema.js` using your workspace file tools immediately after printing the declaration.

#### TIER 2: CSS-Variable Overrides
* If and only if the terminal output from Tier 1 confirms no native property controls the layout request, search the `.dwc-*-vars` style entry.
* Modify the layout exclusively by overriding the specific active `--var` within that structural block.

#### TIER 3: Custom Stylesheets (Tuts)
* This tier is restricted. You may write custom CSS properties to the custom stylesheet if and only if you have documented in your chat declaration that absolutely no native component property (Tier 1) or CSS variable (Tier 2) exposes control over that layout behavior.

#### TIER 4: JavaScript Configuration Global Overrides
* Absolute last resort. Do not touch global configurations unless all higher options are non-functional.




   **STEP 1: MANDATORY LOCAL SCRIPT GENERATION** 
 
      Before editing any file or executing layout changes, you MUST use your file tools to create a temporary script named `inspect-schema.js` in the current working directory containing this exact layout:

```js
// inspect-schema.js
(async () => {
  const componentJson = await etch.components.getJson(1302); 
  console.log(JSON.stringify(componentJson.properties, null, 2));
  return { success: true };
})();
```
*(Note: Replace 1302 with your resolved site-specific component ID).*

   **STEP 2: MANDATORY CLI RUN & DECLARATION** 
You MUST run the temporary file via your terminal tools before generating any output code:
`npx @digital-gravy/etch-connector eval -t "[your-active-tab-name]" -f inspect-schema.js`

Once executed, you MUST explicitly type out this exact declaration in the chat window using the real terminal output data before proceeding:
"I have read the live schema for ID [insert ID]. The existing props are: [list relevant props found]. There is/is not a native prop for this request." 

Only after making this declaration may you move to overriding a `--var` in the `.dwc-*-vars` entry or deleting the temporary file.

   **STEP 3: WORKFLOW ORDER MATRIX** 
   Only proceed to a lower step if the step above it is technically incapable of fulfilling the layout request:
1. COMPONENT PROP — Map the request to a native prop via Section 2 + Section 4. 
2. CSS-VARIABLE CLASS — If no native prop exists, override a `--var` in the relevant `.dwc-*-vars` style entry.
3. CUSTOM STYLESHEET — ONLY for raw CSS properties where absolutely no native prop or `--var` exists in the system.
4. JAVASCRIPT CONFIG — Absolute last resort. (Section 7).
5. **Apply, then `await etch.saveAsync()`** (blocks/styles are buffered).
6. **Verify** — read the changed prop/variable back, and screenshot with CDP (Visual verification).

> **🚫 NEVER write CSS into the global stylesheet to achieve menu styling or behavior that a prop or
> CSS-variable class can do.** Reaching for a hand-written global stylesheet rule is the signature of
> an agent that skipped the hierarchy above. If you find yourself about to do it, go back to the prop reference.

## Before you start

This skills file lives in `MMPro Etch Docs/ai-connector/mmpro-skills/`, alongside its reference-file
companion. The full component prop docs (`components/`) are kept single-source at the repo root
(`../../components/`), since that's also where the live GitBook site publishes them from — this repo does
not duplicate them into `mmpro-skills/`. If you installed via `npx mmpro-agentic-skills-etch`, `components/`
ships alongside the skills file (one level up, `../components/`) and will be present. If you only grabbed
the `mmpro-skills` folder on its own some other way, `components/` may not be present; fall back to the
live GitBook URL in Section 4 (reference file) when that happens.

**Step 1 — Check for developer context file** at `../../MMPRO ETCH/mmpro-dev-context.md` (two levels up). If it exists, read it silently — this is a **developer session**. If not found, this is a **user session**.

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
- `https://design-with-cracka.gitbook.io/etchmegamenupro` — complete DWC Mega Menu Pro prop reference per component. The repo's `components/` folder (`../../components/` from this file, if present) and Section 4 in the reference file cover the same ground locally — prefer those before fetching live, and only fetch per-component pages here for a prop not already in either, or if `components/` isn't present locally.

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
tabs  [--json] [--cdp]                                               # list connected tabs
eval  [code] [-t|--tab name] [-f|--file path] [--timeout ms] [--cdp] # run a script in a tab
# CDP visual-verification commands (shot/html/computed) — see "Visual verification" below
```

`eval` is the workhorse:

```bash
npx @digital-gravy/etch-connector eval -t "your-site.com" -f script.js
# For long operations (saveAsync):
npx @digital-gravy/etch-connector eval -t "your-site.com" --timeout 60000 -f script.js
```

- **CRITICAL AGENT CONSTRAINT — DO NOT EXECUTE INLINE:** PowerShell will silently swallow multi-line inline scripts. You are STRICTLY FORBIDDEN from running multi-line strings directly via `npx @digital-gravy/etch-connector eval`.
  1. You MUST write your JavaScript to a temporary file first (e.g., `temp-query.js`).
  2. Run it using the `-f` flag: `npx @digital-gravy/etch-connector eval -t "site.com" -f temp-query.js`
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
etch.blocks.rename(id, name)                 // nice-name shown in structure panel — see Section 2 "Renaming block nice-names"
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

### Visual verification (CDP mode)

CDP mode connects to Chrome's DevTools directly (bypassing the Etch tab) so the agent can **see** its work — screenshots, rendered HTML, and final computed CSS. Use it to confirm a mega menu actually renders as intended.

**Prerequisite:** Chrome must be running with remote debugging: `chrome --remote-debugging-port=9222`. Add `--cdp` to each command.

> **Don't assume CDP is available — ask first, don't set it up unprompted.** The flag only takes effect on a fresh Chrome launch; an already-running Chrome ignores it, so enabling CDP means fully quitting the user's Chrome (losing their normal profile/session state, e.g. the WordPress login used to test the site) and relaunching with the flag. If a CDP command fails with "cannot reach Chrome remote debugging," don't tell the user to relaunch Chrome by default — ask whether they want to set up CDP for this session, and if not, fall back to attribute-level round-trip verification (`getJson`/`getAttribute` before/after) as the primary verification method instead of visual screenshots.

```bash
# Screenshot (whole page or one element)
npx @digital-gravy/etch-connector shot --cdp -t "your-site.com" -o page.png            # full page
npx @digital-gravy/etch-connector shot --cdp -t "your-site.com" -s ".dwce-nav-nested" -o nav.png
#   flags: -s|--selector  -o|--out  --full  --jpeg  --freeze=false
# Rendered HTML for an element
npx @digital-gravy/etch-connector html ".dwce-dropdown.open" --cdp -t "your-site.com"
# Final computed CSS (omit --props for all)
npx @digital-gravy/etch-connector computed ".dwc-nav-nested-items > li" --cdp -t "your-site.com" --props color,background,display
```

> **`--freeze=false` is essential for mega menus.** By default `shot` freezes the page before capturing, which closes open dropdowns. To screenshot an **open** dropdown/mega menu (or a mid-animation state), pass `--freeze=false`.

**Mega-menu verification workflow** (pairs with the `inBuilder.keepOpen` rule in Section 6):

1. Set `inBuilder.keepOpen` → `{true}` on the DWC Dropdown so the panel stays open, then `await etch.saveAsync()`.
2. `shot --cdp --freeze=false -s "<panel selector>"` to capture the open panel; eyeball layout/colours.
3. Use `computed` to confirm CSS variables resolved (e.g. `--menu-item-clr` shows as the expected colour on `.dwc-nav-nested-items > li`, panel bg on `.dwce-dropdown.open`).
4. Reset `inBuilder.keepOpen` → `{false}` and `await etch.saveAsync()` when done — never leave a menu stuck open.

***

## Agent Skills Update

When you discover something new while working — a pattern that worked, a gotcha that cost time, a faster way to do something — **add it to this file before ending the session**. The next AI agent should start faster than you did.

| Discovery type                             | Where to add it            |
| ------------------------------------------ | -------------------------- |
| New task → action mapping                  | Section 2: Decision tree   |
| New reusable script                        | Section 3: Script library  |
| Prop or CSS variable you didn't know about | Section 4: Prop reference  |
| Special styles selector you used           | Section 5: Special styles  |
| Mistake to avoid / API behaviour           | Section 6: Rules & gotchas |
| JS config change                           | Section 3: Script library  |
| Updated site-specific IDs                  | Section 1: Site config     |

**How:** One line or a short code block. No prose. Confirmed working only — no speculation.

State findings as a direct rule, not a story. Do **not** write "Confirmed live [date]: an agent
did X and it broke because Y" — write the rule and, if useful, the concrete symptom, as plain
present-tense fact. No dates, no "confirmed live," no project names, no "an earlier version of
this doc said."

**What NOT to add:** Task-specific context, anything already in the component docs, anything unconfirmed.

***

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
## MMPro stylesheet (READ ONLY — never edit, reference/debug only)
DWC Mega Menu:  etch.stylesheets.list().find(s => s.name === 'DWC Mega Menu').id
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
> **DWC Dropdown (componentId 1299)** — two slots:
>
> ```js
> const dd = findBlock(etch.blocks.getTree(), 1299);
> const megaSlot   = dd.children.find(c => c.slotName === 'Mega_Menu_Content');       // mega menu body — use when megaMenu.enable = true
> const flyoutSlot = dd.children.find(c => c.slotName === 'Nested_Dropdown_Content'); // flyout list — use when megaMenu.enable = false; direct children MUST be <li> tags
> ```
>
> **DWC Menu Item (componentId 1298)** — one slot:
>
> ```js
> const item = findBlock(etch.blocks.getTree(), 1298);
> const custom = item.children.find(c => c.slotName === 'Content');
> // Use when the nav item needs more than a plain text label — e.g. an icon + label,
> // a custom SVG link, or any markup props.text / props.linkTo cannot produce.
> // Leave empty to use the standard <a> rendered from props.
> ```
>
> **DWC Nav (componentId 1300)** — three slots:
>
> ```js
> const nav = findBlock(etch.blocks.getTree(), 1300);
> const navItems   = nav.children.find(c => c.slotName === 'Nav_items');         // top-level nav items — DWC Dropdown and DWC Menu Item go here
> const mobileLogo = nav.children.find(c => c.slotName === 'Mobile_Logo');       // logo inside mobile panel; if empty, desktop logo is auto-cloned
> const mobileTop  = nav.children.find(c => c.slotName === 'MobileTop_Content'); // extra content in the mobile top bar alongside the close button
> ```
>
> **DWC Header (componentId 1302)** — one slot:
>
> ```js
> const header = findBlock(etch.blocks.getTree(), 1302);
> const body = header.children.find(c => c.slotName === 'default'); // everything in the header bar — DWC Nav, logo, etc.
> ```
>
> **DWC Mobile Toggle (componentId 1301)** — no slots. Self-contained.

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
* **Never put mega menu CSS in the global tuts stylesheet** — use style entries only.

Only duplicate an existing mega menu if you need to copy content (not structure/styles), and plan to keep the same class names as the source.

### Renaming classes on existing blocks (no duplication)

> **⚠ This "class derives from `styles[]`" behaviour applies ONLY to blocks that already exist**
> on the live site — it describes what happens when you rename a style entry's selector that a
> block already references. It does **NOT** mean a brand-new node passed to `create()`/`replace()`
> can omit `attributes.class` and rely on `styles[]` alone — a fresh node needs both set together
> (see "Building classed content for new blocks" in Section 3). A node built with `styles[]` only
> and no `attributes.class` saves with no error and renders with zero CSS.

If the blocks already have their own unique style entries (built from scratch, not duplicated), a pure rename only requires updating the style entry selectors — no block-level changes needed. A block's rendered `class` attribute is derived from its `styles[]` entries' selectors, so renaming a selector automatically reflects on every block that references that entry:

```js
// Rename style entry selectors — block class attributes update automatically
await etch.styles.update('styleEntryId', { selector: '.new-base-class' });
await etch.styles.update('styleEntryId2', { selector: '.new-base-class__col' });
// ... repeat for each BEM element
await etch.saveAsync();
```

The `removeClass`/`addClass` + tuts-stylesheet workaround in the section below is only needed **after `duplicate()`**, where blocks share style entry IDs with the source and renaming those entries would affect both.

### Renaming block nice-names to match renamed classes

Whenever you rename a BEM class family (the subsection above), also rename every affected
block's nice-name (`context.name` — the label shown in Etch's structure/layers panel) so the
panel stays readable. Renaming a style entry's `selector` does **not** touch `context.name`;
these are two separate fields and must be updated separately.

* **Base block** (the one carrying the full base class) gets the Title Case base class name:
  `.mega-menu-apple` becomes `"Mega Menu Apple"`.
* **Every nested BEM sub-element** gets ONLY its element-role part, Title Cased — no base
  prefix repeated (nesting in the structure panel already shows the parent): `.mega-menu-apple__col`
  becomes `"Col"`, `.mega-menu-apple__col-heading` becomes `"Col Heading"`, `.mega-menu-revo__item-icon`
  becomes `"Item Icon"`.
* **Sibling blocks sharing one class** (e.g. repeated card/item blocks from a loop or manual
  duplication) all get the IDENTICAL generic name — never number instances ("Item 1", "Item 2").
* **Always use the generic BEM-derived name, even over a more descriptive existing name.**
  A link block named "AppleCare+" or "Newsroom" still becomes `"Link"`. Content-specific
  names go stale when content changes; generic structural names stay correct.

```js
// className -> nice name: strip the BEM base, Title Case what's left; base class itself
// becomes the full Title Case base name.
function bemToNiceName(className, baseClass) {
  if (className === baseClass) {
    return baseClass.replace(/^\./, '').split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  }
  const part = className.replace(baseClass, '').replace(/^(__|--)/, ''); // e.g. "col-heading"
  return part.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

// Apply alongside the style-entry rename — one rename() per block, same script:
await etch.styles.update(baseStyleId, { selector: newBaseClass });
etch.blocks.rename(baseBlockId, bemToNiceName(newBaseClass, newBaseClass));
// repeat per BEM sub-element block:
etch.styles.update(colHeadingStyleId, { selector: newBaseClass + '__col-heading' });
etch.blocks.rename(colHeadingBlockId, bemToNiceName(newBaseClass + '__col-heading', newBaseClass));
await etch.saveAsync();
```

### Building a themed variant (e.g. light/dark) of an existing panel

To add a recolored sibling of an existing mega-menu panel (e.g. a light-theme duplicate sitting next
to a dark original in the same `Mega_Menu_Content` slot) with **independently editable** CSS — not a
visual clone that shares the source's live styles:

1. **Do not use `copy()`/`pasteAsync()`** — it reuses style-entry ids rather than duplicating them (see "If you must duplicate and rename classes" below).
2. Pick a BEM **modifier** suffix for the new base class (e.g. `--light`) — confirm the exact name with
   the user per the Base class name approval gate.
3. **Discovery — don't dump the full tree by default.** If your clone is programmatic (step 5 reads
   `getJson()` live and clones at runtime), you don't need the panel's content pre-loaded into your own
   context — only the style entries (`selector`+`css`) for the colors you're deciding by hand. A full
   content dump (text/image/SVG values inline) is only needed when you're hand-authoring new JSON
   yourself, e.g. a brand-new panel from a content brief.
   - **But first run a cheap structural skim** — walk the tree and collect only
     `{ type, tag, class, slotName, componentId, hasScript: !!n.script }` per node (omit `text`/long
     `attributes`). This confirms a generic recursive clone is safe to trust. If every node is plain
     `etch/element`/`etch/text`, proceed with style-entries-only. If the skim finds a `componentId`,
     `slotName`, or `script` anywhere in the subtree, your clone function must explicitly handle that
     field (a generic clone that only copies `type/tag/attributes/styles/children/text` will silently
     drop it) — get the full dump for that node before writing the clone.
   - When fetching CSS for multiple known-long entries (data-URI SVG masks, multi-stop gradients), fetch
     them in one targeted query by id rather than grepping a giant dump with line-context limits — long
     CSS strings get truncated/omitted by context-limited greps and you'll have to re-fetch anyway.
4. For every style entry under the source's base class, `etch.styles.create()` a new entry: selector =
   old selector with the base token replaced (`mega-menu-x__card` → `mega-menu-x--light__card`), css =
   old css with the same base-token replace applied first (fixes any internal cross-refs like
   `.mega-menu-x__item:hover &`), then apply your color overrides on top. Build an `oldStyleId → newStyleId` map.
5. Recursively clone the live block tree (`getJson(panelId)`) into a fresh `create()`-ready JSON: drop
   `id`/`parentId`, remap each node's `class` attribute (same base-token replace) and `styles[]` (via the
   id map from step 4), keep everything else (tag, text, image `src`, SVG content, content text) identical
   if the brief asks for "same content, recolored only".
6. `etch.blocks.create(newTree, megaSlotId, originalIndex + 1)` — insert as the next sibling in the same
   slot, never a new dropdown. Set the cloned root's `context.name` to `<original name> Light`; leave
   nested nice-names as cloned (they're already correct per the BEM nice-name convention above).
7. **Batch every target panel into one script with one trailing `await etch.saveAsync()`** — don't run a
   separate `eval` call per panel. A `menus = [{ oldBase, newBase, panelId, slotId, cssOverrides }, ...]`
   config array looped through a single shared clone function is one round trip instead of N, and avoids
   re-pasting the same clone helper into N near-identical files.
8. Re-run the collision check from "Renaming classes" to confirm no pre-existing entries share the new
   modifier'd selectors.

Color mapping that worked well in practice: white/light text (`#fff`, `color-mix(in oklch, white N%, ...)`)
→ `#1d1d1f` / `color-mix(in oklch, #1d1d1f N%, ...)`; saturated dark background gradients → very light
pastel tints of the same hue; gold/tan brand accents (`#d9b06a`, `#e7c98a`) generally read fine on white
as-is — only darken them if used as default-state link/CTA text needing contrast.

### If you must duplicate and rename classes

> **`copy()`/`pasteAsync()` does NOT create fresh style-entry ids.** `etch.blocks.copy(blockId)` → `CopyObject` and `await etch.blocks.pasteAsync(payload, targetId?, index?)` re-map block ids, but a pasted block's `styles[]` array keeps the **exact same style-entry ids** as the source (`idsRemapped: false`) — paste reuses existing style entries, it does not duplicate them. **Do not use `copy()`/`pasteAsync()` to clone a styled panel you intend to recolor or restyle independently** — the clone shares live CSS with the source, so editing either one edits both. Use the manual process below (or build-from-scratch with fresh style entries) whenever the clone needs independent styling. (To verify this on a given Etch version: run the Appendix A.6 snippet and compare `styles[]` on the source vs. the pasted block.)

If the user explicitly asks to duplicate, follow this safe process to rename classes without breaking rendering. Read Section 6 (Rules & gotchas) for the full API behaviour details before starting.

**Step 1 — Create the new style entries first** (before touching any blocks):

```js
// etch.styles.create returns the new style entry ID as a string
const navGroupId = etch.styles.create('.mega-menu-revo__nav-group', 'padding: 1rem; position: relative; gap: 1rem;');
// repeat for every class you are renaming
```

Save the returned IDs — you will need them.

**Step 2 — For each block, use `removeClass` then `addClass` with CSS class name strings:**

```js
etch.blocks.removeClass(blockId, 'old-css-class-name');  // removes class + old style ID from styles[]
etch.blocks.addClass(blockId, 'new-css-class-name');     // adds class to HTML only — styles[] NOT updated
```

`addClass` will add the correct HTML class but will NOT wire the new style entry ID into `styles[]`. See Section 6.

**Step 3 — Work around the styles\[] gap using the tuts stylesheet:** Because `addClass` does not update `styles[]`, the new style entries' CSS will not be output by PHP on the frontend. The workaround: put ALL the new template's CSS in the tuts stylesheet instead of relying on per-block style entries. The tuts stylesheet is always output and applies by CSS selector regardless of `styles[]`.

```js
await etch.stylesheets.appendAsync('5378835', '.mega-menu-revo__nav-group { ... }');
```

**Step 4 — Walk the tree by structural position, not by cached block IDs.** Block IDs change on every page reload. Always rediscover by walking `etch.blocks.getTree()` and matching by position or text attribute within the same script execution.

***

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
| Make a real pill CTA button in the nav                                              | Use a **DWC Menu Item** as the last item + `menuMode.lastItemIsButton`. Each CTA position has its **own independent variable set** in `.dwc-top-level-items-vars`: `--menu-cta-*` (last item), `--menu-cta-2-*` (second-to-last), `--menu-cta-3-*` (third-to-last). Style each button differently — e.g. filled vs outlined — purely through these vars. **Never reach for the tuts stylesheet** to differentiate CTA buttons; use the per-position var sets instead. (Icon-appearance dropdowns cannot be CTA buttons.)                                                                                                          |
| Break an icon button dropdown out to the header on mobile (sits next to hamburger) | `megaMenu.enable` must be `true` first — `megaMenu.breakout` is only available when mega menu is enabled. Then toggle `megaMenu.breakout` → `true`. Uses the default mobile breakpoint. For a plain icon button with no panel, use DWC Menu Item + `Content` slot + `relocation.mode: breakout` instead. **Also explicitly set this Dropdown's own `general.submenuReveal` → `'expand'` (or `'slide'`, whichever direction you actually want)** — `breakout` only relocates the `<li>` in the DOM (`ResponsiveRelocationSystem`); it does NOT change how the dropdown's own panel opens. Left at `"default"`, a **broken-out** dropdown does NOT dynamically inherit whatever `mobile.submenuReveal` is currently set to on DWC Nav — `default` resolves to `'slide'` unconditionally once the item is relocated outside the nav, regardless of the Nav's own setting. Setting the Nav to `'expand'` will NOT fix this, since breakout dropdowns don't track the Nav's value — only an explicit per-dropdown override does. No error is thrown either way. |

***

## 3. Script library

### Core helpers (include at top of every script)

```js
// Resolve DWC component IDs by NAME — they are site-specific, never hardcode (see Section 1).
const compId = (name) => etch.components.list().find(c => c.name === name)?.id;
function getGroup(bid, key) {
  return JSON.parse(etch.blocks.getAttribute(bid, key).slice(1, -1));
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

### Update a block group attribute

```js
// e.g. change nav animation group
const anim = getGroup('w1obdfr', 'animation');
anim.stripeStyle = '{false}';
anim.adaptiveHeight = '{true}';
setGroup('w1obdfr', 'animation', anim);
await etch.saveAsync();
```

### Update a CSS variable in a style entry

> ⚠ **`setVariable` sets a `:root` custom property** — it does NOT modify variables declared inside a style entry's CSS block. First arg is the **variable name**, not a style entry ID.
> Correct: `etch.styles.setVariable('--menu-item-clr', '#1d1d1f')`
> **Wrong (do not use):** `etch.styles.setVariable('styleEntryId', '--menu-item-clr', '#1d1d1f')` — this creates a `:root` property named after the entry ID, which is useless.

To reliably change a variable **inside** a style entry, use read → string-replace → `styles.update`:

```js
const entry = etch.styles.list().find(s => s.selector === '.dwc-top-level-items-vars');
const newCss = entry.css.replaceAll('--menu-item-clr: var(--black, #000);', '--menu-item-clr: #1d1d1f;');
await etch.styles.update(entry.id, { css: newCss });
await etch.saveAsync();
```

### Update a nested special styles block

```js
// Read the style entry's CSS string
let css = etch.styles.list().find(s => s.id === '1mlutc1').css;

// Replace value inside the target block using replaceAll (not replace)
css = css.replaceAll(
  '--menu-item-clr: white;',
  '--menu-item-clr: #1d1d1f;'
);

// Or replace the placeholder comment with values
css = css.replace(
  '    /* add any of the variables above and update value*/\n  }\n\n  /*## STYLES AFTER SCROLLING */',
  '    --menu-item-clr: white;\n  }\n\n  /*## STYLES AFTER SCROLLING */'
);

await etch.styles.update('1mlutc1', { css });
await etch.saveAsync();
```

> **Always use `replaceAll()` not `replace()`** — each CSS block has both a commented-out example AND an active declaration. `replace()` only hits the first (the comment), leaving the active declaration unchanged.

### Add a prop to a component

```js
// 1. Get existing props
const existing = etch.components.getJson(1302).properties;

// 2. Insert at correct position (e.g. after headerBackgroundColor)
const insertIdx = existing.findIndex(p => p.key === 'headerBackgroundColor') + 1;
const newProp = {
  name: 'My New Prop',
  key: 'myNewProp',
  type: { primitive: 'string' },
  default: 'none'
};
const updated = [...existing.slice(0, insertIdx), newProp, ...existing.slice(insertIdx)];

// 3. Update — persists immediately, no saveAsync needed
await etch.components.updateAsync(1302, { properties: updated });
```

### Bind a prop to a CSS variable (component edit mode)

```js
// After adding the prop via updateAsync:
await etch.blocks.enterComponentEditMode('7vc93ik');

// Find the target element inside the component
const tree = etch.blocks.getTree();
const el = tree.find(/* find by attributes.id or tag */);

// Append binding — use {props.propKey} not {propKey}
const current = etch.blocks.getAttribute(el.id, 'style') || '';
etch.blocks.setAttribute(el.id, 'style', current + '; --my-var: {props.myNewProp}');

await etch.blocks.saveComponentEditModeAsync();
etch.blocks.exitComponentEditMode();
await etch.saveAsync();
```

Then add the CSS rule consuming the variable via `etch.stylesheets.appendAsync()` (see below).

### Append to the tuts stylesheet

```js
const css = `
/* My rule */
#dwc-header {
  border-bottom: var(--header-bottom-border);
}
`;
// Stylesheets persist immediately — no saveAsync needed
await etch.stylesheets.appendAsync('5378835', css);
```

### Read current state of all key settings

```js
const allStyles = etch.styles.list();
const allBlocks = etch.blocks.getTree();
const headerBlock = findBlock(allBlocks, 1302);
const navBlock = findBlock(allBlocks, 1300);

return {
  headerAttrs: headerBlock.attributes,
  navAttrs: navBlock.attributes,
  headerVarsCss: allStyles.find(s => s.id === 'fo1m9iu').css,
  topLevelCss: allStyles.find(s => s.id === '1mlutc1').css,
  toggleCss: allStyles.find(s => s.id === '7mjgmt8').css
};
```

### Modify a JS config value in the component script

Use for `DwcConfig.MegaMenu` or `DwcConfig.CenteredLogo` options with no prop equivalent (e.g. `breakinToNavList`, `centerNudge`, `roundOffFactor`).

```js
const comp = etch.components.getJson(1300); // DWC Nav componentId

function findScriptBlock(blocks) {
  for (const b of blocks) {
    if (b.script && b.script.code) return b;
    if (b.children) { const f = findScriptBlock(b.children); if (f) return f; }
  }
}

const sb = findScriptBlock(comp.blocks);
// script.code is plain JS when read via API — no base64 decode needed
sb.script.code = sb.script.code.replace('breakinToNavList: 1,', 'breakinToNavList: 0,');

// Persists immediately — no saveAsync needed
await etch.components.updateAsync(1300, { blocks: comp.blocks });
```

### Common color-mix values

```
72% white:  color-mix(in oklch, white 72%, transparent)
90% white:  color-mix(in oklch, white 90%, transparent)
80% white:  color-mix(in oklch, white 80%, transparent)
7% black:   color-mix(in oklch, black 7%, transparent)
4% black:   color-mix(in oklch, black 4%, transparent)
65% #1d1d1f: color-mix(in oklch, #1d1d1f 65%, transparent)
10% white:  color-mix(in oklch, white 10%, transparent)
```

***

> **Sections 4, 5, and part of Section 6 live in the companion reference file** —
> `mega-menu-pro-skills-reference.md`, in this same folder. See "When to consult the
> reference file" above for exactly when to open it. The rest of Section 6 continues below.

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

### Never set a prop to its default value

If a prop's default is already what you want, leave it unset. Setting a prop to its default adds noise to the component's attribute store and makes it harder to read which settings are intentionally customised. Before setting any prop, check its default value — if they match, skip it. Example: `dropdown.dropdownOffsetGap` defaults to `0px`; setting it to `0` is redundant and should be omitted.

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
* **DO NOT** guess select prop values from their UI label — the stored value is always the right-hand side of the ` : ` separator in `selectOptionsString` (e.g. `"Left : left"` stores `left`, not `Left`; `"Hover only : hover"` stores `hover`). When there is no ` : `, the stored value equals the label. **Always inspect `selectOptionsString` before setting any select prop.** Using a label instead of its stored value silently fails — the component ignores it and falls back to the default.
* **DO NOT** use `menuMode.lastItemIsButton` to make an icon/cart/search button or to right-align it. **`lastItemIsButton` + the `--menu-cta-*` CTA styling only work on DWC *Menu Item* last items, not on DWC *Dropdown* items** (even with `general.appearance: button`/`icon`). For a dropdown-as-icon/button, use the dropdown's own `general.appearance` (`icon`/`button`); trailing icon dropdowns are **right-aligned by default** (no `lastItemIsButton` needed). For dropdowns, `lastItemIsButton` only enables `nonButtonItemsAlignment` (left/center of the other items). *(Not stated in the official component documentation.)*
* **DO NOT** modify selector strings in special styles blocks — only add values inside `{ }`
* **DO NOT** use raw `rgba()` — use `color-mix(in oklch, ...)`
* **DO NOT** use `replace()` — use `replaceAll()` (CSS blocks contain both commented and active declarations)
* **DO NOT** pass multi-line scripts inline — use `-f file.js`
* **DO NOT** wrap connector scripts in an IIFE (`(async () => { ... })()`). The connector already executes the script body as an async function — an IIFE returns a Promise object, not its resolved value, causing the eval to return `null`. Always write top-level `await` and `return` directly.
* **DO NOT** call `saveAsync` after `components.*` or `stylesheets.*`
* **DO NOT** style mega menu content via a custom stylesheet — use props
* **DO NOT** use `{propKey}` in component edit mode bindings — use `{props.propKey}`
* **NEVER edit or `appendAsync` to the `DWC Mega Menu` stylesheet** — it contains the distributable CSS installed by the user. Read it for debugging only.
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
* **Workaround for styles\[] not updating:** Put the CSS in the global tuts stylesheet (always output by PHP) instead of relying on per-block `styles[]`. This avoids the issue entirely — the tuts stylesheet CSS applies by CSS selector regardless of `styles[]`.
* **`setAttribute(id, 'class', value)` does NOT reliably persist the class.** The HTML class attribute is reconstructed from the `styles[]` array on save/reload. Always use `addClass`/`removeClass` to modify classes — never `setAttribute` for the `class` key.
* **Block IDs change on every page reload** — always rediscover by walking `etch.blocks.getTree()`. Never hardcode IDs across sessions or after a reload.
* **`getGroup` returns `undefined` if the group attribute doesn't exist yet on the block** — calling `.slice()` on it will throw. Always guard: `const group = etch.blocks.getAttribute(bid, key) ? getGroup(bid, key) : {};`. `setGroup` has no such problem — it creates the attribute if absent. For group props that may not be initialised (e.g. `inBuilder` on a freshly created dropdown), call `setGroup` directly without reading first.
* **Never `replace()` a populated block** — it resets every attribute on every node, wiping user edits. Edit content in place with `etch.blocks.setText(textNodeId, ...)` + `saveAsync()`. Includes the text-node walk pattern and the mixed-content (heading with `<em>`) note.
* **History recovery** — `etch.history.undo()`/`redo()` (return void, not async) can read back a clobbered value, but doesn't reliably round-trip a `replace()`, so always re-apply the recovered value explicitly with `setAttribute`/`setText` rather than trusting redo.
* **DO NOT** leave a block's nice-name (`context.name`) stale after renaming its class — rename it too via `etch.blocks.rename(id, name)`. Use the generic BEM-derived name (base class Title Cased for the base block, element-role-only Title Cased for sub-elements, identical name across sibling instances) even if the block currently holds a more descriptive content-specific name — generic structural names stay correct as content changes; descriptive ones go stale.
* **A `"condition"`-type wrapper in the schema is UI-only and flattens away — but a `"group"`-type wrapper nested behind a condition is a REAL nesting level. Check `type.specialized` on the wrapper node itself before assuming either way; don't guess from key-path shape alone.** `etch.components.getJson()` shows nested paths like `megaMenu.megaMenu.breakout` or `sticky.stickyEnabled.stickyHeaderBackground` — the middle segment (`type.specialized: "condition"`) only controls when the field shows in the properties panel, so the actual stored attribute is flat: `{ enable, width, breakout }` at the top level of the group object. **This does NOT generalize to every nested-looking path.** `mobile.submenuSlideExtras` is a `type.specialized: "group"` node (sitting behind its own condition wrapper) — its children (`submenuSlideoutDistance`, `submenuSlideoutOpacity`, `fadeItemsOnSlide`) are genuinely nested *inside* `submenuSlideExtras`, not flat siblings under `mobile`. Setting `submenuSlideoutDistance`/`submenuSlideoutOpacity` as flat `mobile.*` siblings round-trips fine via `getAttribute`/`JSON.parse` (looks correct) and saves with no error, but the component never reads that flat location — the live render silently keeps using the 100%/opacity-1 defaults. The only reliable check is the raw distributable component JSON's actual `properties` nesting (e.g. `dwc-header-backup.json`), which shows `submenuSlideoutDistance`/`submenuSlideoutOpacity`/`fadeItemsOnSlide` all as siblings **inside** `submenuSlideExtras`'s own `"properties"` array. **Before writing to any prop reached via a multi-segment path, verify each segment's `type.specialized` individually — `condition` flattens, `group` nests — rather than pattern-matching against one other example.** Correct write: `setGroup(navId, 'mobile', { ...mobileGroup, submenuSlideExtras: groupAttr({ submenuSlideoutDistance: '60%', submenuSlideoutOpacity: '0', fadeItemsOnSlide: '{true}' }) })`.
* **Mega-menu Dropdown breakout items use `[data-breakout-mega="true"]`, NOT `[data-breakout]`.** `[data-breakout]` is the attribute used by DWC Menu Item's `relocation.mode=breakout` and the logo breakout feature — a CSS rule written against `[data-breakout]` for a `megaMenu.breakout` icon-appearance Dropdown will silently match nothing. The distributable stylesheet's own CSS never references `data-breakout-mega` (no rule needs it), so searching stylesheet text for "breakout" surfaces only the unrelated attribute and will not reveal this one. Trace to the component's actual rendered output (CDP `html` command, or the component's own `script.code`) instead of an adjacent-looking selector.
* **`megaMenu.breakout` relocates the `<li>` in the DOM — it does NOT set the dropdown's own opening direction, and does NOT dynamically track DWC Nav's `mobile.submenuReveal`.** `ResponsiveRelocationSystem` (DOM move) and the dropdown's own reveal logic are separate systems (see `javascript-api.md`'s systems table). A broken-out Dropdown left at `general.submenuReveal: 'default'` resolves to `'slide'` unconditionally once relocated outside the nav — **not** whatever the Nav is currently set to; changing the Nav's `mobile.submenuReveal` will not fix a breakout icon stuck sliding in from the side, only an explicit `general.submenuReveal: 'expand'` on that specific Dropdown does. **Always explicitly set `general.submenuReveal` on a breakout Dropdown** (`'expand'` for downward, `'slide'` for from-the-side) rather than leaving it at `'default'`.
* **To hide/fade a breakout dropdown's icon, target the toggle BUTTON inside it, not the dropdown `<li>` wrapper — and remember `.dwc-open` only fires for the MOBILE MENU, not for a breakout dropdown opening its own panel.** Two separate mistakes here:
  1. The `<li>` carries `[data-breakout-mega='true']`, but the actual visible/interactive element is a child `.dwc-submenu-toggle` (same child selector the icon-appearance CSS uses: `&[appearance='icon'] > .dwc-submenu-toggle`). Applying `opacity`/`pointer-events` to `[data-breakout-mega='true']` itself hides the wrong layer.
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


## Appendix A — Authoring payloads, temp-script lifecycle, and quick verification (required)

This appendix contains a small set of **required** rules and helper patterns agents must follow when authoring block JSON or running temporary connector scripts. These items are intentionally brief and prescriptive so every agent can run the minimal tests and succeed first time.

### A.1 Mandatory minimal node shapes (use exactly)
Always include these keys when creating nodes via `etch.blocks.create()` or `replace()`.

- Element node (minimal valid JSON)

```js
{
  type: 'etch/element',
  version: 1,
  context: { name: 'Optional name' },
  options: {},
  tag: 'div',
  attributes: {},
  styles: [],
  children: [ /* child nodes */ ]
}
```

- Text node (minimal valid JSON)

```js
{
  type: 'etch/text',
  version: 1,
  context: {},
  text: 'Your text here',
  attributes: {},
  styles: [],
  children: []
}
```

Notes: omitting `version`, `context`, `styles`, or `children` causes the connector validator to fail with `expected array, received undefined` or similar errors. Treat these keys as required plumbing — not optional.

### A.2 Temporary script lifecycle (required)
Every agent must follow this lifecycle for connector eval scripts and local temp files:

1. Create the temporary `.js` file containing the eval body in the active workspace folder.
2. Run the file via `npx @digital-gravy/etch-connector eval -t "TAB" -f file.js`.
3. Capture and print the raw connector stdout to the session (for audit).
4. Immediately delete the file from the workspace before any other action (no exceptions).

Agents must report the exact deleted filename list back in the chat: `Deleted: [file1.js, file2.js]`.

### A.3 Minimal-test pattern (required before bulk ops)
Before any bulk mutation (create/replace many blocks), run a minimal non-destructive test that:

- Resolves the DWC component IDs by name (DWC Header/Nav/Dropdown/Menu Item/Toggle).
- Finds a single dropdown instance and its `Mega_Menu_Content` slot.
- Creates one minimal element + text node pair using the shapes in A.1 inside that slot.
- If creation succeeds, delete the created test block immediately.

If the test fails, do NOT run the bulk script. Parse the connector error JSON and fix the missing key indicated by the first `path` entry (e.g., add `children: []` if path ends with `children`). Re-run the minimal test until it passes.

### A.3a Build-one-verify-scale (required when creating/replacing N similar real content blocks)

A.3 above validates node **shape** (schema acceptance) with a throwaway placeholder. This is a
separate, additional requirement for a different failure mode: when the task is N blocks sharing
one real content template (e.g. a set of mega-menu panels, a row of cards, repeated CTA items),
schema-valid shape is not the same as "actually renders correctly with the intended classes,
styles, and group attributes." Passing shape validation and saving with no errors does not rule
out defects like malformed group-attribute encoding or a missing `attributes.class` — both can
go undetected across an entire batch, because "did the API call throw" is not the same check as
"does this specific node now have the fields I intended."

**Required sequence:**
1. Build and save the **first real item** only (not a throwaway placeholder — the actual first
   piece of real content).
2. Round-trip it with `getJson` and assert every field you intended is actually present: group
   attributes decode correctly via `getGroup`, every classed node has both `attributes.class` and
   a non-empty `styles[]` (see Section 3 "Building classed content for new blocks"), text content
   matches. If a screenshot tool is available in this session, use it on this one item too.
3. Only after step 2 passes, write items 2–N using the same validated pattern.

Do not build all N items first and debug from user reports or a full batch re-inspection after
the fact — that turns a 1-item fix into an N-item fix, and defects that don't throw errors (like
the two above) can sit undetected across an entire batch until someone looks at the live result.

### A.4 Helper factories (copy into any script to avoid shape mistakes)
Include these small helpers at the top of agent scripts to produce correct node shapes:

```js
function createTextNode(text){
  return { type:'etch/text', version:1, context:{}, text, attributes:{}, styles:[], children:[] };
}
function createElementNode(tag, attrs={}, styles=[], children=[]){
  return { type:'etch/element', version:1, context:{}, options:{}, tag, attributes:attrs, styles, children };
}
function getGroup(bid,key){ const raw = etch.blocks.getAttribute(bid,key); return raw ? JSON.parse(raw.slice(1,-1)) : {}; }
function setGroup(bid,key,obj){ etch.blocks.setAttribute(bid,key,'{'+JSON.stringify(obj)+'}'); }
```

Use these rather than hand-writing node JSON.

### A.5 Idempotency and duplicate avoidance (required)
Before creating a panel for a dropdown, check the slot for an existing panel marker (a data attribute or class your workflow uses). Example check:

```js
const slotJson = etch.blocks.getJson(slotId);
const hasPanel = slotJson.children.some(c => c.attributes?.['data-ephemeral-panel']);
if(hasPanel) continue; // skip
```

If the workflow does not have an agreed marker, create the panel and add `attributes: { 'data-ephemeral-panel': 'true' }` so future runs skip it.

### A.6 Copy/paste verification (optional, but must be tested)
The skill file forbids naive duplication unless verified. To test `etch.blocks.copy()`/`pasteAsync()` safely:

1. Create one authoritative template in-builder (or build-from-scratch in code).
2. Run the verification snippet that copies and pastes once into a test slot, then compare the `styles` arrays of the source and pasted block.
3. If paste re-maps to new style-entry IDs consistently and the pasted block renders correctly, document that evidence in the session and then you may opt to `pasteAsync` for remaining dropdowns.

Verification snippet (run once):

```js
const payload = etch.blocks.copy(templateId);
const newId = await etch.blocks.pasteAsync(payload, testSlotId);
const orig = etch.blocks.getJson(templateId);
const pasted = etch.blocks.getJson(newId);
return { origStyles: orig.styles, pastedStyles: pasted.styles, newId };
```

If `pastedStyles` re-uses the exact same style-entry IDs as `origStyles` (not remapped), abort clone workflow and use build-from-scratch.

### A.7 Timeouts and save discipline
- Minimal test: `--timeout 60000`.
- Bulk operations with many creates/pastes: `--timeout 150000` (or larger if site is slow).
- Batch mutations and call a single `await etch.saveAsync()` at the end. Do not call `saveAsync()` per item.

### A.8 Logging and error parsing (required)
If an eval errors with a validation list, capture the first error object and act on it: the `path` points to the missing key. Example mapping:

- path ends with `"children"` — add `children: []` at that node
- path contains `"version"` — add `version: 1`
- path contains `"context"` — add `context: {}`

Always include the first error object in the session transcript when asking for help.

### A.9 Auto-clean wrapper (recommended)
Agents should run temporary scripts via a one-shot wrapper that writes the file, evals it, logs stdout, and deletes the file before continuing. This wrapper must itself be transient (or printed to the chat for manual execution) and must not leave temp files in the workspace.

---

Agents MUST follow the checks in this appendix in addition to the main skill file. Failure to delete temp scripts or to run the minimal test before bulk operations will be considered a skills violation and must be corrected before continuing work on the site.
