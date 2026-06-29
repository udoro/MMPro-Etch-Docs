---
icon: sparkles
---

# AI Skills Reference

Standalone reference for configuring DWC Mega Menu Pro + Header Builder in Etch via the etch-connector. Read sections 1–3 first — they cover 90% of tasks. Sections 4–7 are lookup-only.

## START HERE — mandatory workflow

You must execute these steps sequentially. You are strictly forbidden from modifying any workspace files or generating styling code until Steps 1 through 4 are successfully completed and validated via terminal logs.

### 0. Skill File First
1. Read this entire skill file before writing or executing any edits.
2. If the task involves grouped component props (`megaMenu`, `general`, `inBuilder`, `classes`, `relocation`, etc.), do not use direct `setAttribute` or raw serialized strings until you have confirmed the exact helper from this skill file.
3. Use the documented helper functions for grouped props: `getGroup(bid, key)` and `setGroup(bid, key, obj)`.
4. Never delete or remove a native grouped prop from a DWC component as a cleanup step. If a grouped prop exists, leave it disabled rather than removing it.
5. Delete temporary connector scripts immediately after the task is complete and the changes are verified. Do not leave generated `*.js` eval files in the workspace.
6. If the skill file does not show a helper for the requested prop, stop and do not mutate grouped props until the correct pattern is confirmed.

---

### ⛔ PRE-SCRIPT DECLARATION — mandatory before writing any connector script

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

This skills file lives in a folder called `MMPro Etch Docs`.

**Step 1 — Check for developer context file** at `../MMPro Etch/mmpro-dev-context.md` (sibling folder, one level up). If it exists, read it silently — this is a **developer session**. If not found, this is a **user session**.

**Step 2 — Developer session only:** Do not create or update `mmpro-user-context.md`. The dev context file is the only context file for developer sessions.

**Step 2 — User session only:** Look for `mmpro-user-context.md` in the **same folder as this file**. If it exists, read it silently — it contains saved templates. If not found, skip and continue. Do not touch the dev context file.

**Step 3 — Load API reference (both sessions).** Check for the cheatsheet at `../ETCH-DEV-API/etch-connector-cheatsheet.md`. If not found locally, WebFetch the following before writing any scripts:
- `https://docs.etchwp.com/public-api/types-reference.html` — block JSON shapes (`etch/svg`, `etch/element`, `etch/text`, etc.)
- `https://docs.etchwp.com/public-api/components.html` — component property types, especially `ConditionComponentProperty` (has nested `properties` children that a shallow schema read will miss)
- `https://design-with-cracka.gitbook.io/etchmegamenupro` — complete DWC Mega Menu Pro prop reference per component. Fetch per-component pages for any prop not already in Section 4 rather than running schema-read scripts to discover stored values.

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

1. Extract the tab name from: `[etch-connector] + tab "your-site.com" (...)`
2. **Preflight — confirm MMPro is on this page (do this before anything else).** First **resolve the
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
3. Ask the user in plain English: **"I'm connected to \[tab name]. What would you like to change?"**

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
- **Performance Thresholds:** `blocks.copy()` / `pasteAsync()` of a full mega menu is heavy (~10s each) because it bundles the whole subtree + every referenced style entry. While great for cloning *one* styled panel, building *many* clean items from scratch via `create()` for lightweight blocks is far faster and avoids dragging demo content. (Confirmed: paste reuses existing style entries by id rather than duplicating them.)

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
//  "navigation", "fields", "ui", "history",
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
etch.blocks.rename(id, name)
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

**What NOT to add:** Task-specific context, anything already in the component docs, anything unconfirmed.

***

## 1. Site config

**Everything here is site-specific — resolve it at runtime, never hardcode.** Both DWC component IDs
**and** style-entry IDs vary per install (observed: components `1298–1302` on one site, `758–762` on
another; toggle-vars `reiqdv9` on one, `2j8195b` on another). Assuming fixed numbers is the #1 cause
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

**Correct workflow — `replace()` + single BEM parent style entry:**

```js
// Step A: Create ONE BEM parent style entry with ALL nested CSS
const bemStyleId = etch.styles.create('.mega-menu-revo-2', `
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 1.25rem;
  background: #3520c0;

  &__cards-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  &__card {
    position: relative;
    ...
    &:hover .mega-menu-revo-2__card-img { transform: translateY(-20px); }
  }

  @container (width < 900px) {
    &__cards-grid { grid-template-columns: repeat(2, 1fr); }
  }
`);

// Step B: Build the block tree (no classes yet) using create() or getJson()
// Step C: Replace the top-level container with fixed JSON — replace() DOES persist styles[]
const newId = etch.blocks.replace(ciBlockId, {
  type: 'etch/element', version: 1, context: { name: 'Mega Menu Revo 2' }, options: {},
  tag: 'div',
  attributes: { class: 'mega-menu-revo-2' },
  styles: [bemStyleId],   // ← only the TOP block needs the style entry
  children: [
    // child blocks: set BEM classes in attributes, leave styles: []
    // Etch auto-creates empty phantom style entries for child classes — harmless
  ]
});
await etch.saveAsync();
```

**Key rules:**

* **One style entry per element class** (e.g. `.mega-menu-revo-2__card` gets its own style entry with its own CSS).
* Within each element's style entry, nesting is allowed and preferred for: `@container`, pseudo-elements (`&::before`), states (`&:hover`), and child tag selectors (`& span`, `& img`, `& svg`, `& svg path`, `& path`).
* **Responsive: ALWAYS use `@container`, NEVER `@media`.** The mega menu content div is already declared as a container (`container-type` is set on it by the component), so any element inside a mega menu can use `@container (width < 900px) { ... }` directly. **Do NOT add `container-type` to your own wrapper** (e.g. `.mm-features`) — it's redundant and, worse, it would make your wrapper the query target instead of the full content div. Breakpoints query the mega menu content width, not the viewport. Convert range/`max-width` forms too: `@media (max-width: 1100px)` → `@container (width < 1100px)`.
* Do **NOT** nest sub-classes (`&__card`) inside a parent's style entry — each sub-class lives in its own entry.
* Every block needs the matching style entry ID in its `styles[]` array — use `replace()` to set this (see Step C below), passing `styles: [styleId]` for each block in the JSON tree.
* `replace()` propagates `styles[]` correctly to all nested children in the JSON tree.
* **Grid best practice:** always use `repeat(auto-fit, minmax(min(to-rem(260px), 100%), 1fr))` — never hardcode `1fr 1fr 1.2fr` or similar. `min()` prevents overflow in narrow containers; `auto-fit` collapses columns naturally without manual breakpoints.
* **Link style entries must always set both `color` and `&:hover { color: ... }` explicitly** — prevents global/theme `a` styles from bleeding in. Minimum: `color: white; &:hover { color: white; }`.
* **Use `to-rem()` for all px values** in style entry CSS — e.g. `to-rem(14px)`, `to-rem(20px)`. Style entries go through `CssProcessor::preprocess_css()` which handles the conversion. Never write raw rem values like `0.875rem`; write `to-rem(14px)` instead. Exceptions: aspect ratios, `z-index`, `opacity`, unitless values, and `calc()` expressions where mixing units is intentional.
* **If ACSS (AutomaticCSS) skills are available, prefer ACSS tokens and utility patterns** over the default styling approach above.
* **Never put mega menu CSS in the global tuts stylesheet** — use style entries only.

Only duplicate an existing mega menu if you need to copy content (not structure/styles), and plan to keep the same class names as the source.

### Renaming classes on existing blocks (no duplication)

If the blocks already have their own unique style entries (built from scratch, not duplicated), a pure rename only requires updating the style entry selectors — no block-level changes needed. A block's rendered `class` attribute is derived from its `styles[]` entries' selectors, so renaming a selector automatically reflects on every block that references that entry:

```js
// Rename style entry selectors — block class attributes update automatically
await etch.styles.update('styleEntryId', { selector: '.new-base-class' });
await etch.styles.update('styleEntryId2', { selector: '.new-base-class__col' });
// ... repeat for each BEM element
await etch.saveAsync();
```

The `removeClass`/`addClass` + tuts-stylesheet workaround in the section below is only needed **after `duplicate()`**, where blocks share style entry IDs with the source and renaming those entries would affect both.

### If you must duplicate and rename classes

> **⚠ VERIFY (Etch 1.5.4+) — `copy()`/`pasteAsync()` may replace this whole workaround.** Etch 1.5.4 added `etch.blocks.copy(blockId)` → `CopyObject` and `await etch.blocks.pasteAsync(payload, targetId?, index?)`. Unlike `duplicate()`, paste **bundles the referenced global styles, loops, and components and re-creates them with fresh ids** — exactly the `styles[]`/class-rename pain the steps below work around. It never touches the system clipboard, so it works in connector scripts. **Not yet confirmed on a live MMPro install** — before trusting it for mega-menu duplication, test whether the re-mapped style entries keep working class names and whether component-backed blocks (DWC Dropdown etc.) survive the round-trip. Until verified here (confirmed-only rule), keep using the manual process below.

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
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Change header bg colour                                                            | `headerBackgroundColor` prop on header block                                                                                                                                                                                                                                                             |
| Change header bg after scrolling                                                   | `sticky.stickyHeaderBackground` prop → CSS `--header-bg-sticky`                                                                                                                                                                                                                                          |
| Make header transparent on load                                                    | `overlay.overlayHeaderBackground` prop → set to `transparent`                                                                                                                                                                                                                                            |
| Change header bg when hovering a nav item                                          | `overlay.overlayHeaderActiveBackground` prop → CSS `--overlay-header-bg-active`                                                                                                                                                                                                                          |
| Add frosted glass / backdrop blur                                                  | `overlay.overlayHeaderBlur` prop                                                                                                                                                                                                                                                                         |
| Make header stick on scroll                                                        | `sticky.stickyHeader` prop → `{true}`                                                                                                                                                                                                                                                                    |
| Unlock before/after scroll CSS hooks                                               | `sticky.stickyHeader` + `sticky.specialStickyOverlayStyles` + `overlay.overlayHeader` → all `{true}`                                                                                                                                                                                                     |
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
| Set stripe / adaptive height animation                                             | `animation.stripeStyle` or `animation.adaptiveHeight` prop — cannot use both together                                                                                                                                                                                                                    |
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
| Break an icon button dropdown out to the header on mobile (sits next to hamburger) | `megaMenu.enable` must be `true` first — `megaMenu.breakout` is only available when mega menu is enabled. Then toggle `megaMenu.breakout` → `true`. Uses the default mobile breakpoint. For a plain icon button with no panel, use DWC Menu Item + `Content` slot + `relocation.mode: breakout` instead. |

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
function extractBlock(css, marker) {
  const i = css.indexOf(marker);
  const s = css.indexOf('{', i) + 1;
  const e = css.indexOf('}', s);
  return css.slice(s, e).trim();
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

## 4. Prop reference

> **Full reference (online):** this section is a quick reference of the common props. For the
> exhaustive list of every setting **and** the complete `.dwc-*-vars` CSS variables per component,
> read the official docs at <https://design-with-cracka.gitbook.io/etchmegamenupro> (per-component
> pages: DWC Header, DWC Nav, DWC Dropdown, DWC Menu Item, DWC Mobile Toggle). If you have web
> access, fetch them when you need a setting not listed here. Cross-component exceptions (e.g.
> CTA/`lastItemIsButton` styling is DWC Menu Item-only) are in Section 6.

### DWC Header (componentId 1302)

| Prop key                                | Group        | CSS variable                 | Notes                                                                               |
| --------------------------------------- | ------------ | ---------------------------- | ----------------------------------------------------------------------------------- |
| `headerBackgroundColor`                 | top          | `--header-bg`                | Base header background                                                              |
| `darkBackgroundPreview`                 | top          | —                            | Builder only. Darkens canvas for white-item testing                                 |
| `sticky.stickyHeader`                   | sticky       | —                            | Enables sticky. Add `data-no-sticky` to a section to disable per-page               |
| `sticky.scrollDownVisibility`           | sticky       | —                            | hide-row-1/2/3, show-row-1/2/3, hide-all-rows, Default                              |
| `sticky.scrollUpVisibility`             | sticky       | —                            | reverse, show-row-1/2/3, show-all-rows, Default                                     |
| `sticky.scrollVisibilityDistance`       | sticky       | —                            | Scroll threshold. Supports px, rem, or plain number. Default: `200px`               |
| `sticky.specialStickyOverlayStyles`     | sticky       | —                            | Unlocks special CSS hooks in all five style entries                                 |
| `sticky.stickyHeaderBackground`         | sticky       | `--header-bg-sticky`         | Also auto-syncs `--overlay-header-bg` when scrolled. **Prop-driven → `!important`** |
| `sticky.scrollMargin`                   | sticky       | `--dwc-scroll-margin`        | Anchor link offset. Default: `var(--dwc-header-div-height)`                         |
| `overlay.overlayHeader`                 | overlay      | —                            | Floats header over content. Add `data-no-overlay` to disable per-page               |
| `overlay.overlayHeaderMobile`           | overlay      | —                            | Extends overlay to mobile                                                           |
| `overlay.overlayHeaderWidth`            | overlay      | `--overlay-header-width`     | Width of overlay container                                                          |
| `overlay.overlayHeaderBackground`       | overlay      | `--overlay-header-bg`        | Default (unscrolled) bg. **Prop-driven → `!important`**                             |
| `overlay.overlayHeaderActiveBackground` | overlay      | `--overlay-header-bg-active` | Bg when user hovers a nav item or dropdown opens. **Prop-driven → `!important`**    |
| `overlay.overlayHeaderBlur`             | overlay      | `--overlay-header-blur`      | Backdrop-filter blur on the header overlay element (frosted glass header bar)       |
| `overlay.overlayHeaderRadius`           | overlay      | `--overlay-header-radius`    | Border radius                                                                       |
| `overlay.overlayHeaderInset`            | overlay      | `--overlay-header-inset`     | Offset from viewport edges                                                          |
| `overlay.removeInsetTop`                | overlay      | —                            | Removes top gap                                                                     |
| `overlay.overlayHeaderShadow`           | overlay      | `--overlay-header-shadow`    | Box shadow                                                                          |
| `overlay.offsetSectionPadding`          | overlay      | —                            | Adds top padding to first section. Add `data-no-padding` to opt out                 |
| `accessibilty.skipLink`                 | accessibilty | —                            | Select: Enable / Disable                                                            |
| `accessibilty.customSkipLinkParameter`  | accessibilty | —                            | Format: `#selector \| Label`. Multiple: comma-separated. No ID? Use `main \| Label` |

### DWC Nav (componentId 1300)

| Prop key                                            | Group         | Notes                                                                                                                                                                                                                                                        |
| --------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `primaryColor`                                      | top           | CSS `--primary-clr` globally                                                                                                                                                                                                                                 |
| `animation.stripeStyle`                             | animation     | Frontend only, no builder preview. **Mutually exclusive with adaptiveHeight**                                                                                                                                                                                |
| `animation.adaptiveHeight`                          | animation     | Frontend only, no builder preview. **Mutually exclusive with stripeStyle**                                                                                                                                                                                   |
| `animation.animateAdaptiveContent`                  | animation     | Only when adaptiveHeight is on                                                                                                                                                                                                                               |
| `menuMode.offcanvasMode`                            | menuMode      | Sidebar on all viewports                                                                                                                                                                                                                                     |
| `menuMode.flyoutOffcanvas`                          | menuMode      | Desktop-like flyout in offcanvas mode                                                                                                                                                                                                                        |
| `menuMode.flyoutOnHover`                            | menuMode      | Hover opens dropdowns in offcanvas on desktop                                                                                                                                                                                                                |
| `menuMode.lastItemIsButton`                         | menuMode      | Select: `false` / `true` (1 CTA) / `true-2` / `true-3`. **CTA-button styling only applies to DWC *Menu Item* last items — NOT to icon/button-appearance DWC Dropdowns.** Each CTA position has its **own independent variable set** in `.dwc-top-level-items-vars` — `--menu-cta-*` (last), `--menu-cta-2-*` (second-to-last), `--menu-cta-3-*` (third-to-last) — so two or three buttons can be styled completely differently (e.g. filled vs outlined) using only CSS vars. Never use the tuts stylesheet to differentiate CTA buttons. For trailing icon dropdowns this prop does nothing but enable `nonButtonItemsAlignment`; do not use it to right-align them (that's default). |
| `menuMode.nonButtonItemsAlignment`                  | menuMode      | Stored values: `left` / `center` (lowercase — `Left` silently fails). Needs `lastItemIsButton` set. **⚠ Condition-nested prop** — lives inside the `lastItem` condition inside `menuMode`; a shallow `menuMode.properties` read misses it. Use a recursive schema search to discover it. Trailing icon-appearance dropdowns are right-aligned by default regardless.                                                                                                     |
| `mobile.previewMobileMenu`                          | mobile        | Builder preview only (renamed from openMobileMenu)                                                                                                                                                                                                           |
| `mobile.mobileBreakpoint`                           | mobile        | Default: `1200px`                                                                                                                                                                                                                                            |
| `mobile.mobileMenuWidth`                            | mobile        | Width of sidebar panel                                                                                                                                                                                                                                       |
| `mobile.mobileMenuBackground`                       | mobile        | Panel background                                                                                                                                                                                                                                             |
| `mobile.slideInDirection`                           | mobile        | Right / Left / Top / Expand Down / Bottom / Right Top / Right Bottom                                                                                                                                                                                         |
| `mobile.submenuReveal`                              | mobile        | Slide in / Expand                                                                                                                                                                                                                                            |
| `mobile.submenuSlideExtras.submenuSlideoutDistance` | mobile        | **If < 100%, must set opacity to 0 to fully hide parent**                                                                                                                                                                                                    |
| `mobile.submenuSlideExtras.submenuSlideoutOpacity`  | mobile        | Whether parent fades as it slides away                                                                                                                                                                                                                       |
| `mobile.submenuSlideExtras.fadeItemsOnSlide`        | mobile        | Fades menu items during slide                                                                                                                                                                                                                                |
| `mobile.mobileOffcanvasMenuSpeed`                   | mobile        | Animation speed multiplier                                                                                                                                                                                                                                   |
| `mobile.fullscreenMobileMenu`                       | mobile        | Opens above header (fullscreen)                                                                                                                                                                                                                              |
| `mobile.mobileTopBackground`                        | mobile        | Topbar bg — only when fullscreen ON or transparent mobile top OFF                                                                                                                                                                                            |
| `mobile.transparentMobileTop`                       | mobile        | Only available when fullscreen is OFF                                                                                                                                                                                                                        |
| `mobile.hideBackText`                               | mobile        | Back icon only, no text                                                                                                                                                                                                                                      |
| `mobile.backTextMode`                               | mobile        | `back-to` = "Back to \[Parent]" / `title` = current dropdown name                                                                                                                                                                                            |
| `mobile.backToHomeMenuText`                         | mobile        | Root-level "back to" text (back-to mode only). Default: `Main Menu`                                                                                                                                                                                          |
| `mobile.removeMenuItemBorders`                      | mobile        | Strips divider lines in mobile menu                                                                                                                                                                                                                          |
| `dropdown.dropdownContentShadow`                    | dropdown      | Box shadow on all panels                                                                                                                                                                                                                                     |
| `dropdown.dropdownContentRadius`                    | dropdown      | Border radius on panels. Default: `0rem`                                                                                                                                                                                                                     |
| `dropdown.blendOpenDropdowns`                       | dropdown      | Removes border radius between adjacent open dropdowns                                                                                                                                                                                                        |
| `dropdown.dropdownContentBorderSize`                | dropdown      | Border thickness                                                                                                                                                                                                                                             |
| `dropdown.dropdownContentBorderColor`               | dropdown      | Border colour                                                                                                                                                                                                                                                |
| `dropdown.globalNestedDropdownWidth`                | dropdown      | Default flyout width. Overridden per-dropdown                                                                                                                                                                                                                |
| `dropdown.globalMegaMenuWidth`                      | dropdown      | Default mega menu width. Accepts CSS value, CSS var, **class name**, or **element ID** (resolves that element's width). For full-width, use **`#dwc-header`** (or the `header` tag) — it matches the header exactly. **Never `100vw`/`%`**: `100vw` includes the scrollbar width → horizontal overflow; `%` resolves relative to the parent nav item. Fixed values like `1200px` are also fine. ⚠ **Overlay header caveat:** when `overlay.overlayHeader` is enabled with a constrained width (not full-width), `#dwc-header` resolves to the full viewport width — NOT the constrained header width. The constrained width is applied to the inner wrap, not the outer header element. Use **`.dwc-nest-header`** instead — this is always the selector for the header inner wrap and correctly resolves to the overlay-constrained width. |
| `dropdown.globalInnerWidth`                         | dropdown      | Max inner content width inside mega menus                                                                                                                                                                                                                    |
| `dropdown.dropdownVerticalAlignment`                | dropdown      | CSS selector — aligns dropdown top to the bottom of that element. Default: `.dwc-nest-header`                                                                                                                                                                |
| `dropdown.dropdownOffsetGap`                        | dropdown      | Gap between nav bar and top-level dropdown panels                                                                                                                                                                                                            |
| `dropdown.nestedDropdownOffsetGap`                  | dropdown      | Gap between nestable parent item and its flyout panel. **Prop-driven → `!important`**                                                                                                                                                                        |
| `dropdown.caret`                                    | dropdown      | Small pointer beneath active nav item                                                                                                                                                                                                                        |
| `dropdown.arrowVisibilty`                           | dropdown      | Default / Hide / Hide on Mobile / Hide on Desktop                                                                                                                                                                                                            |
| `interactionUx.dropdownTriggerMode`                 | interactionUx | Global trigger: Hover or Click / Hover only / Click only                                                                                                                                                                                                     |
| `interactionUx.nestedDropdownActiveOverlay`         | interactionUx | Dims parent content when nested opens                                                                                                                                                                                                                        |
| `interactionUx.nestedDropdownActiveOverlayColor`    | interactionUx | Colour and opacity of the dim overlay when a nested dropdown opens                                                                                                                                                                                           |
| `interactionUx.nestedDropdownInactiveBlur`          | interactionUx | Blurs inactive parent dropdown content while a nested panel is open                                                                                                                                                                                          |
| `interactionUx.parentRelativeNestedDropdown`        | interactionUx | Positions nested panels relative to parent item                                                                                                                                                                                                              |
| `interactionUx.menuItemHoverEffect`                 | interactionUx | Default / Text Roll (desktop only)                                                                                                                                                                                                                           |
| `backdrop.hideNavBackdrop`                          | backdrop      | Removes the overlay that appears when dropdown content opens                                                                                                                                                                                                 |
| `backdrop.navBackdropBlur`                          | backdrop      | Blur intensity of the scrim that appears over the page when dropdowns open                                                                                                                                                                                   |
| `backdrop.navBackdropBackgroundColor`               | backdrop      | Colour and opacity of the scrim that appears over the page when dropdowns open                                                                                                                                                                               |
| `logo.centeredLogo`                                 | logo          | Splits items either side of logo                                                                                                                                                                                                                             |
| `logo.centerGuide`                                  | logo          | Debug visual guide (admin only)                                                                                                                                                                                                                              |
| `logo.mobileLogoSize`                               | logo          | Logo size in mobile menu                                                                                                                                                                                                                                     |
| `logo.hideMobileLogoInFullscreenMode`               | logo          | Hides logo when fullscreen menu active                                                                                                                                                                                                                       |
| `buffer.dropdownBufferHeight`                       | buffer        | Invisible hover bridge below nav bar (prevents accidental dropdown close)                                                                                                                                                                                    |
| `buffer.nestedDropdownBufferWidth`                  | buffer        | Invisible hover bridge beside nested panels                                                                                                                                                                                                                  |
| `buffer.previewBufferZone`                          | buffer        | Builder only — padding so dropdowns show fully in canvas                                                                                                                                                                                                     |

### DWC Dropdown (componentId 1299)

| Prop key                            | Notes                                                                                                                                                                               |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`                              | Toggle button label                                                                                                                                                                 |
| `dropdownTriggerMode`               | Per-item override: both / hover / click                                                                                                                                             |
| `inBuilder.keepOpen`                | Builder only — keeps panel open for styling                                                                                                                                         |
| `nestedDropdown.width`              | Panel width (overrides global nested width)                                                                                                                                         |
| `nestedDropdown.equalHeights`       | Forces all columns to same height                                                                                                                                                   |
| `nestedDropdown.excludeEqualHeight` | Excludes block from equal-height calc                                                                                                                                               |
| `nestedDropdown.parentRelative`     | Panel relative to toggle item, not full nav bar                                                                                                                                     |
| `megaMenu.enable`                   | Switches to full-width mega menu layout. Stored as `"{true}"`/`"{false}"` string — same as all boolean group props (NOT an actual boolean)                                                                              |
| `megaMenu.width`                    | Panel width — CSS value, CSS var, class name, or element ID. For full-width use **`#dwc-header`** (or `header` tag). **Never `100vw`/`%`** — `100vw` adds the scrollbar width (horizontal overflow); `%` resolves relative to the parent dropdown item. `1200px` etc. also fine |
| `megaMenu.innerWidth`               | Max inner content width. Default: `100%`                                                                                                                                            |
| `megaMenu.breakout`                 | Moves mega menu item into header area on mobile (uses global mobile breakpoint). Stored as `{true}`/`{false}` string                                                                |

> **⚠ Common agent mistake — enabling mega menu on an existing dropdown.**
> `megaMenu` is a **group prop** encoded as a `{{...}}` string. You cannot set sub-keys individually with `setAttribute`. Always read the full group, mutate, and write back:
> ```js
> // CORRECT
> const mm = getGroup(dropdownId, 'megaMenu');
> mm.enable = '{true}';
> mm.width  = '#dwc-header';
> setGroup(dropdownId, 'megaMenu', mm);
> await etch.saveAsync();
>
> // WRONG — throws INVALID_ARGUMENT (no prop named "megaMenu.enable" exists)
> // etch.blocks.setAttribute(dropdownId, 'megaMenu.enable', '{true}');
> ```
> For a **new** dropdown block, pass the encoded group in `create()` attributes:
> ```js
> attributes: { megaMenu: '{{' + JSON.stringify({ enable:'{true}', width:'#dwc-header', breakout:'{false}' }) + '}}' }
> ```

| `general.contentAlignment`          | Stored values: `default` / `center` / `left` / `right`                                                                                                                              |
| `general.visibility`                | Stored values: `Default` / `hide-on-desktop` / `hide-on-mobile` / `hide-on-both`                                                                                                    |
| `general.appearance`                | Stored values: `default` / `button` / `icon` — **all lowercase**. Using `Icon` or `Button` (capital) silently fails                                                                 |
| `general.noArrow`                   | Hides chevron. Stored as `{true}`/`{false}` string                                                                                                                                  |
| `general.useCustomSvg`              | Custom SVG icon. Stored as `{true}`/`{false}` string. Requires "Allow unsafe HTML" in Etch settings                                                                                 |
| `general.customSvg`                 | Raw SVG string — inject as inline HTML, no encoding needed                                                                                                                          |
| `general.submenuReveal`             | Stored values: `default` / `expand` / `slide`                                                                                                                                       |

#### Styling a dropdown in icon / button appearance — `.dwc-dropdown-items-vars`

A dropdown set to `general.appearance` = `icon` or `button` defaults to a **black pill background with a white glyph**. These values live inside **nested blocks** in `.dwc-dropdown-items-vars` (`&[appearance='icon']` / `&[appearance='button']`), **not** at the root — so `etch.styles.setVariable` can't reach them. Edit the block's CSS instead (read the entry, string-replace inside the target block, `etch.styles.update`):

```css
/* inside .dwc-dropdown-items-vars */
&[appearance='icon'] > .dwc-submenu-toggle {
  --menu-item-bg: var(--black, #000);      /* the pill/circle background — transparent for a plain icon */
  --menu-item-hover-bg: var(--black, #000);
  --menu-item-clr: var(--white, #fff);
  --icon-clr: var(--white, #fff);          /* glyph colour (SVG stroke) */
  --icon-hover-clr: var(--white, #fff);
  --icon-size: to-rem(14px);               /* glyph size */
  --button-max-diameter: to-rem(45px);     /* tap-target diameter */
  --menu-item-radius: 50vw;                /* 50vw = circle */
}
/* &[appearance='button'] block uses the same vars; --icon-size: 0 (text, not a glyph) */
```

Plain Apple-style icon (no bg, dark glyph): in the **`icon` block only**, set `--menu-item-bg`/`--menu-item-hover-bg` → `transparent` and `--icon-clr`/`--icon-hover-clr` → your dark colour. **Edit only the `icon` block** — the `button` block has identical variable names, so a global replace would hit both. This one change fixes desktop and the breakout icon colour on mobile together.

### DWC Menu Item (componentId 1298)

| Prop key                                 | Notes                                                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `openInNewTab`                           | Adds `target="_blank"` + `rel="noopener noreferrer"`                                                    |
| `text`                                   | Link label                                                                                              |
| `linkTo`                                 | URL                                                                                                     |
| `badge.text`                             | Badge label. `none` = no badge                                                                          |
| `relocation.mode`                        | none / breakout (to header area) / breakinto (to any container)                                         |
| `relocation.returnBreakpoint`            | (breakout) Width below which item returns to mobile menu                                                |
| `relocation.containerSelectorBreakpoint` | (breakinto) Format: `#selector \| breakpoint`. Also works via `data-breakinto` attribute on any element |
| `general.visibility`                     | Default / Hide on Desktop / Hide on Mobile / Hide on Both                                               |

> **Breakin (not a prop):** To move any element FROM the page INTO the mobile menu, add `data-breakin="480"` directly to that element. Items land in `.breakin-container` inside the nav.

### DWC Mobile Toggle (componentId 1301)

| Prop key                         | CSS variable           | Notes                                                                                                                     |
| -------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `appearance.size`                | `--toggle-size`        | Overall size. When pill is on, icon size is `pillToggleSize` instead                                                      |
| `appearance.color`               | `--toggle-color`       | Hamburger bar/icon colour                                                                                                 |
| `appearance.hoverColor`          | `--toggle-hover-color` | Colour on hover                                                                                                           |
| `appearance.flip`                | —                      | Mirrors icon horizontally                                                                                                 |
| `appearance.hamburgerIcon`       | —                      | Default / two-line-squeeze / two-line-spin / two-line-collapse / three-line-spin / three-line-collapse / three-line-arrow |
| `appearance.toggleStyle`         | —                      | Default / Techno (Default icon only)                                                                                      |
| `appearance.pillShape`           | —                      | Wraps toggle in pill/square background                                                                                    |
| `appearance.pillBorder`          | `--toggle-border`      | Pill border                                                                                                               |
| `appearance.pillBackgroundColor` | `--toggle-bg`          | Pill background. **Prop-driven → `!important`**                                                                           |
| `appearance.pillPadding`         | `--toggle-padding`     | Internal pill padding                                                                                                     |
| `appearance.pillRadius`          | `--toggle-radius`      | Pill border radius                                                                                                        |
| `appearance.pillAspectRatio`     | `--pill-aspect-ratio`  | Pill aspect ratio                                                                                                         |
| `appearance.pillToggleSize`      | `--pill-toggle-size`   | Icon size inside pill (pill + Default icon only)                                                                          |
| `appearance.equalize`            | —                      | Equalises label width to prevent layout shift on state change                                                             |
| `appearance.alwaysVisible`       | —                      | Keeps toggle visible when menu is open. **Required when Fullscreen Mobile Menu is enabled**                               |
| `label.enable`                   | —                      | Show label alongside icon                                                                                                 |
| `label.text`                     | —                      | Select: **Open/Close** (separate open/close texts) / **Menu** (single static text)                                        |
| `label.openText`                 | —                      | Text when menu is closed (Open/Close mode)                                                                                |
| `label.closeText`                | —                      | Text when menu is open (Open/Close mode only)                                                                             |
| `label.fontSize`                 | `--label-font-size`    | Label font size                                                                                                           |
| `label.color`                    | `--label-color`        | Label colour                                                                                                              |
| `label.gap`                      | `--label-gap`          | Gap between icon and label                                                                                                |
| `targetSelector`                 | —                      | CSS selector of element to receive `.dwc-open`. Defaults to nearest DWC Nav. Works on any custom element                  |
| `ariaLabel`                      | —                      | Screen reader label. Default: `Open Menu`                                                                                 |

***

## 5. Special sticky/overlay styles

Enable on DWC Header: `sticky.stickyHeader: {true}` + `sticky.specialStickyOverlayStyles: {true}` + `overlay.overlayHeader: {true}`.

This activates pre-written nested selector blocks inside each component's CSS variable class. **Never modify the selector strings** — only add/change variable values inside the `{ }` blocks.

### Key rule

Variables set via props (inline styles) need `!important` to override. Variables not set via props do not.

| Needs `!important`             | Does NOT need `!important` |
| ------------------------------ | -------------------------- |
| `--overlay-header-bg`          | `--menu-item-clr`          |
| `--overlay-header-bg-active`   | `--menu-item-hover-clr`    |
| `--header-bg-sticky`           | `--toggle-color`           |
| `--toggle-bg` (pill bg prop)   | `--label-color`            |
| `--nested-dropdown-offset-gap` | `--dropdown-content-bg`    |

### Auto-sync (important — often means you don't need the AFTER SCROLLING block)

The built-in `.dwc-nest-header` CSS automatically sets `--overlay-header-bg` to `var(--header-bg-sticky)` whenever `.scroll-down` or `.scroll-up` is on body AND `[data-sticky-header='true']` is on the header. So if `stickyHeaderBackground` prop is already set, the AFTER SCROLLING block in `.dwc-header-vars` doesn't need `--overlay-header-bg`.

### Body classes added by headroom script

| Class           | When                                                                               |
| --------------- | ---------------------------------------------------------------------------------- |
| `.dwc-headroom` | Sticky header is active. **Required for special sticky/overlay selectors to fire** |
| `.scroll-down`  | User scrolling down past threshold                                                 |
| `.scroll-up`    | User has scrolled back up                                                          |

### `.dwc-header-vars` selector blocks

```css
/*## STYLES BEFORE SCROLLING */
html:not(.dwc-mobile):has([data-sticky-overlay-special-style='true'][data-sticky-header='true']):not(:has([data-no-sticky], [data-no-overlay-style])) .dwc-headroom:not(.scroll-up, .scroll-down) &:not(:has(.dwce-dropdown.open, .dwc-nav-nested-items > li:hover)) {
  /* add variables here */
}

/*## STYLES BEFORE SCROLLING - HOVER */
html:not(.dwc-mobile):has([data-sticky-overlay-special-style='true'][data-sticky-header='true']):not(:has([data-no-sticky], [data-no-overlay-style])) .dwc-headroom:not(.scroll-up, .scroll-down) &:has(.dwce-dropdown.open, .dwc-nav-nested-items > li:hover) {
  /* add variables here */
}

/*## STYLES AFTER SCROLLING */
html:not(.dwc-mobile):has([data-sticky-overlay-special-style='true'][data-sticky-header='true']):not(:has([data-no-sticky], [data-no-overlay-style])) .dwc-headroom:is(.scroll-up, .scroll-down) &:not(:has(.dwce-dropdown.open, .dwc-nav-nested-items > li:hover)) {
  /* add variables here */
}

/*## STYLES AFTER SCROLLING - HOVER */
html:not(.dwc-mobile):has([data-sticky-overlay-special-style='true'][data-sticky-header='true']):not(:has([data-no-sticky], [data-no-overlay-style])) .dwc-headroom:is(.scroll-up, .scroll-down) &:has(.dwce-dropdown.open, .dwc-nav-nested-items > li:hover) {
  /* add variables here */
}

/*## MOBILE — MENU OPEN */
.dwc-mobile:has([data-sticky-overlay-special-style='true'][data-sticky-header='true']):not(:has([data-no-sticky], [data-no-overlay-style])) .dwc-headroom &:has(.dwce-toggle.is-active) {
  /* --overlay-header-bg: white !important; */
}
```

### `.dwc-top-level-items-vars` selector blocks

```css
/*## STYLES BEFORE SCROLLING */
html:not(.dwc-mobile):has([data-sticky-overlay-special-style='true'][data-sticky-header='true']):not(:has([data-no-sticky], [data-no-overlay-style])) .dwc-headroom:not(.scroll-up, .scroll-down) .dwc-nav-nested-items > & {
  /* --menu-item-clr: white; */
}

/*## STYLES BEFORE SCROLLING - HOVER */
html:not(.dwc-mobile):has([data-sticky-overlay-special-style='true'][data-sticky-header='true']):not(:has([data-no-sticky], [data-no-overlay-style])) .dwc-headroom:not(.scroll-up, .scroll-down) .dwce-nav-nested:has(.dwce-dropdown.open, .dwc-nav-nested-items > li:hover) .dwc-nav-nested-items > & {
  /* add variables here */
}

/*## STYLES AFTER SCROLLING */
html:not(.dwc-mobile):has([data-sticky-overlay-special-style='true'][data-sticky-header='true']):not(:has([data-no-sticky], [data-no-overlay-style])) .dwc-headroom:is(.scroll-up, .scroll-down) .dwce-nav-nested:not(:has(.dwce-dropdown.open, .dwc-nav-nested-items > li:hover)) .dwc-nav-nested-items > & {
  /* add variables here */
}

/*## STYLES AFTER SCROLLING - HOVER */
html:not(.dwc-mobile):has([data-sticky-overlay-special-style='true'][data-sticky-header='true']):not(:has([data-no-sticky], [data-no-overlay-style])) .dwc-headroom:is(.scroll-up, .scroll-down) .dwce-nav-nested:has(.dwce-dropdown.open, .dwc-nav-nested-items > li:hover) .dwc-nav-nested-items > & {
  /* add variables here */
}
```

### `.dwc-dropdown-items-vars` selector blocks

```css
/*## STYLES BEFORE SCROLLING - HOVER */
html:not(.dwc-mobile):has([data-sticky-overlay-special-style='true'][data-sticky-header='true']):not(:has([data-no-sticky], [data-no-overlay-style])) .dwc-headroom:not(.scroll-up, .scroll-down) .dwce-nav-nested:has(.dwce-dropdown.open, .dwc-nav-nested-items > li:hover) .dwc-nav-nested-items & {
  /* add variables here */
}

/*## STYLES AFTER SCROLLING - HOVER */
html:not(.dwc-mobile):has([data-sticky-overlay-special-style='true'][data-sticky-header='true']):not(:has([data-no-sticky], [data-no-overlay-style])) .dwc-headroom:is(.scroll-up, .scroll-down) .dwce-nav-nested:has(.dwce-dropdown.open, .dwc-nav-nested-items > li:hover) .dwc-nav-nested-items & {
  /* add variables here */
}
```

### `.dwc-toggle-vars` selector blocks

> Toggle is mobile-only. These selectors apply to all viewports — no need for desktop guards.

```css
/*## STYLES BEFORE SCROLLING */
html:has([data-sticky-overlay-special-style='true'][data-sticky-header='true']):not(:has([data-no-sticky], [data-no-overlay-style], .dwce-nav-nested.dwc-open)) .dwc-headroom:not(.scroll-up, .scroll-down) & {
  /* --toggle-color: white; */
}

/*## STYLES BEFORE SCROLLING - MENU OPEN */
html:has([data-sticky-overlay-special-style='true'][data-sticky-header='true'] .dwce-nav-nested.dwc-open):not(:has([data-no-sticky], [data-no-overlay-style])) .dwc-headroom:not(.scroll-up, .scroll-down) & {
  /* --toggle-color: black; */
}

/*## STYLES AFTER SCROLLING */
html:has([data-sticky-overlay-special-style='true'][data-sticky-header='true']):not(:has([data-no-sticky], [data-no-overlay-style])) .dwc-headroom:is(.scroll-up, .scroll-down) .dwce-nav-nested:not(:has(.dwce-dropdown.open, .dwc-nav-nested-items > li:hover)) & {
  /* add variables here */
}

/*## STYLES AFTER SCROLLING - MENU OPEN */
html:has([data-sticky-overlay-special-style='true'][data-sticky-header='true'] .dwce-nav-nested.dwc-open):not(:has([data-no-sticky], [data-no-overlay-style])) .dwc-headroom:is(.scroll-up, .scroll-down) & {
  /* --toggle-color: red; */
}
```

***

## 6. Rules & gotchas

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

### Customization hierarchy — always try in this order

1. **Component props** — if a prop exists for what you want, use it
2. **CSS variable classes** — if no prop exists but a CSS variable does, override it in the relevant style entry
3. **Custom stylesheet (tuts)** — for CSS _properties_ (like `border-bottom`, `backdrop-filter`) that cannot be expressed as variable overrides
4. **JavaScript API** — absolute last resort. Only when props, CSS variables, and stylesheet rules cannot achieve the result

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

> ⛔ **CRITICAL — READ BEFORE WRITING ANY `create()` CALL FOR A COMPONENT BLOCK**
> A DWC component block (`etch/component`) created with `children: []` has **no accessible slots in the same script**. Slot children only materialise after `saveAsync()` and a reload. If you need to access a slot immediately (to populate a mega menu panel, for example), you **must** include the `etch/slot-content` children in the `children` array at create time — with at least a placeholder element inside each slot you intend to populate. Then call `etch.blocks.getJson(newId)` to retrieve the slot, and `replace()` the placeholder with your styled content. The block type `etch/slot-content` is a valid authoring type (it is listed in the full `type` union in "Block node shape"). Passing `children: []` and then trying to find a slot child in the same script will always return `undefined`.

* **DO NOT** set `dropdown.dropdownContentBorderSize` to `0` or any value below `1px` — use `1px` as the minimum; set `dropdownContentBorderColor` to `transparent` if you want an invisible border
* **DO NOT** use `%` or `100vw` for `megaMenu.width` / `globalMegaMenuWidth`. `%` resolves relative to the parent dropdown item; `100vw` includes the scrollbar width and causes horizontal overflow. **For full-width headers, use `#dwc-header` (or the `header` tag)**. **For overlay headers with a constrained width, use `.dwc-nest-header`** — `.dwc-nest-header` is always the header inner wrap selector and is the element that actually carries the overlay-constrained width. Using `#dwc-header` with a constrained overlay header will make panels span the full viewport width instead of the header width.
* **DO NOT** guess select prop values from their UI label — the stored value is always the right-hand side of the ` : ` separator in `selectOptionsString` (e.g. `"Left : left"` stores `left`, not `Left`; `"Hover only : hover"` stores `hover`). When there is no ` : `, the stored value equals the label. **Always inspect `selectOptionsString` before setting any select prop.** Using a label instead of its stored value silently fails — the component ignores it and falls back to the default.
* **DO NOT** use `menuMode.lastItemIsButton` to make an icon/cart/search button or to right-align it. **`lastItemIsButton` + the `--menu-cta-*` CTA styling only work on DWC *Menu Item* last items, not on DWC *Dropdown* items** (even with `general.appearance: button`/`icon`). For a dropdown-as-icon/button, use the dropdown's own `general.appearance` (`icon`/`button`); trailing icon dropdowns are **right-aligned by default** (no `lastItemIsButton` needed). For dropdowns, `lastItemIsButton` only enables `nonButtonItemsAlignment` (left/center of the other items). *(Confirmed by testing — this exception is not stated in the official component documentation.)*
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
* **Inline SVG data-URIs in `content`, `mask`/`-webkit-mask`, or `background` MUST be percent-encoded — never use `data:image/svg+xml;utf8,<svg…>` with raw markup.** The `;utf8,` form with unescaped `<`, `>`, spaces, and quotes silently fails to load in Chrome (the Etch builder), so a `content: url(...)` pseudo-element renders nothing and a mask shows nothing — with no error. Encode with `'data:image/svg+xml,' + encodeURIComponent(svg)` (a standard JS built-in, allowed in safe mode). This is exactly why the icon masks in `.mm-features__item-icon` render but a hand-written `;utf8,` `::before` did not. Use single quotes inside the SVG so the encoded string has no `"` to clash with the `url("…")` wrapper.
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

### Adding a new prop — full flow

Three steps always required:

1. **Add prop definition** via `etch.components.updateAsync` — splice into existing array at correct position
2. **Bind prop to CSS variable** via component edit mode — adds `--my-var: {props.myPropKey}` to element inline style
3. **Apply the CSS rule** via `etch.stylesheets.appendAsync` — writes `element { property: var(--my-var); }`

Both steps 2 and 3 are required: step 2 injects the value into the variable, step 3 consumes the variable as an actual style.

### Style entry IDs are site-specific

Default template IDs (fresh install) differ from any live site. Always discover at runtime:

```js
etch.styles.list().find(s => s.selector === '.dwc-header-vars').id
```

### `etch.styles` API shape

```js
// CSS rules (buffered — needs saveAsync)
etch.styles.list(filter?)              // [{ id, selector, type, collection, css }]; filter: { type? }
etch.styles.create(selector, cssStr)   // returns new id (CSS STRING only — not an object)
etch.styles.update(id, { css })        // patch css and/or selector
etch.styles.delete(id)                 // remove a rule

// :root CSS custom properties (buffered — needs saveAsync)
// ⚠ First arg is always the VARIABLE NAME, not a style entry ID
etch.styles.setVariable('--var', value, collection?)
etch.styles.getVariable('--var', collection?)
etch.styles.listVariables(collection?)   // Record<string, string>
etch.styles.removeVariable('--var', collection?)
```

***

## 7. JavaScript config (last resort)

The DWC Nav exposes `window.DwcConfig.MegaMenu` and `window.DwcConfig.CenteredLogo`. Set these BEFORE the component initialises to override JS-level defaults. Only use when props and CSS cannot achieve the result.

Key `DwcConfig.MegaMenu` options:

* `menuAutoExpansion` — auto-expands dropdown containing current page link on mobile
* `closeNavOnClick` — closes nav when clicking links
* `closeOnHashClickOnly` — only close on hash links
* `closeOnMobileOnly` — only close on mobile
* `closeNavOnClickExclude` — CSS selector to exclude from close-on-click
* `reinitializeOnURLchange` — SPA/page transition support
* `propagateVariables` — CSS variables to propagate from nav-scoped elements to `:root`
* `backTextMode` — overrides back button text mode
* `viewportGutter` — gutter used for dropdown overflow/clamping calculations

`DwcConfig.CenteredLogo`:

* `enable`, `forceCenteredLogo`, `centerNudge`, `roundOffFactor`, `allowOddItems`

***

## 8. Templates

Before starting any styling work, check this section and inform the user of available templates. Ask if they wish to apply one before making any changes.

> **Agent instruction:** At the start of a styling session, say: "Available templates: \[list names here]. Would you like to apply one as a starting point, or configure manually?"

Applying a template sets a predefined delta of prop values, CSS variable overrides, and stylesheet rules. It overwrites the relevant settings — always confirm with the user before applying.

### How templates are captured (for new template creation)

1. User builds the desired look visually in Etch
2. AI captures current state via connector (prop groups + style entry CSS)
3. AI diffs against the distributable JSON provided by the user (e.g. v1.1.2) — the authoritative baseline
4. Only the delta is saved here as the template definition

### How templates are applied

Read the delta for the chosen template and set each value directly — no diffing needed at apply time.

**Before applying — confirmation table format:**

Show the user a table with four columns: What / Component / Where (class + prop/variable) / Value. Always include both the component name AND the CSS variable class so the user knows exactly where to find each setting.

Example row: `44px nav height | DWC Header | .dwc-header-vars → --header-min-height | 44px`

Always ask for confirmation before applying.

**After applying — status table format:**

Mirror the same table with a ✓ Status column and the exact value that was set. End with: "Would you like to adjust anything?"

***

_No templates defined yet._

***

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

- path ends with `"children"` → add `children: []` at that node
- path contains `"version"` → add `version: 1`
- path contains `"context"` → add `context: {}`

Always include the first error object in the session transcript when asking for help.

### A.9 Auto-clean wrapper (recommended)
Agents should run temporary scripts via a one-shot wrapper that writes the file, evals it, logs stdout, and deletes the file before continuing. This wrapper must itself be transient (or printed to the chat for manual execution) and must not leave temp files in the workspace.

---

Agents MUST follow the checks in this appendix in addition to the main skill file. Failure to delete temp scripts or to run the minimal test before bulk operations will be considered a skills violation and must be corrected before continuing work on the site.

