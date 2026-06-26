# DWC Mega Menu Pro — AI Skills Reference

Standalone reference for configuring DWC Mega Menu Pro + Header Builder in Etch via the etch-connector. Read sections 1–3 first — they cover 90% of tasks. Sections 4–7 are lookup-only.

## Before you start

This skills file lives in a folder called `MMPro Etch Docs`.

**Step 1 — Check for developer context file** at `../MMPro Etch/mmpro-dev-context.md` (sibling folder, one level up). If it exists, read it silently — this is a **developer session**. If not found, this is a **user session**.

**Step 2 — Developer session only:** Do not create or update `mmpro-user-context.md`. The dev context file is the only context file for developer sessions.

**Step 2 — User session only:** Look for `mmpro-user-context.md` in the **same folder as this file**. If it exists, read it silently — it contains saved templates. If not found, skip and continue. Do not touch the dev context file.

**Tab name (both sessions):** Always extract from the server output when the user pastes it. Never cache it.

## Connector quick-start

### What the user does
If the user hasn't connected yet, give them exactly these steps — nothing more:

1. In Etch Builder, open Settings → enable **AI Connector**
2. Click the **AI sparkles button** in the lower-left settings bar → **"Connect external AI agent"**
3. Paste `npx @digital-gravy/etch-connector serve` into this chat and send it

### What the agent does (internal — never expose to user)
Once the server output appears in chat:
1. Extract the tab name from: `[etch-connector] + tab "your-site.com" (...)`
2. Run the discovery script silently (block IDs + style entry IDs — see Section 3: Script library)
3. Store tab name, header/nav/toggle block IDs, and style IDs in session memory
4. Ask the user in plain English: **"I'm connected to [tab name]. What would you like to change?"**

**Never** tell the user about block IDs, eval commands, script files, or any internal steps.
**Never** ask the user to run scripts themselves.

### Agent eval syntax (reference)
```bash
npx @digital-gravy/etch-connector eval -t "your-site.com" -f script.js
# For long operations (saveAsync):
npx @digital-gravy/etch-connector eval -t "your-site.com" --timeout 60000 -f script.js
```

**Safe mode:** Scripts only have access to `etch.*` and standard JS built-ins. `window`, `document`, and all browser globals are blocked.

**Exit codes:** `0` = success, `2` = script error, `1` = operational error (tab not found, timeout, connector unreachable).

---

## Agent Skills Update

When you discover something new while working — a pattern that worked, a gotcha that cost time, a faster way to do something — **add it to this file before ending the session**. The next AI agent should start faster than you did.

| Discovery type | Where to add it |
|---|---|
| New task → action mapping | Section 2: Decision tree |
| New reusable script | Section 3: Script library |
| Prop or CSS variable you didn't know about | Section 4: Prop reference |
| Special styles selector you used | Section 5: Special styles |
| Mistake to avoid / API behaviour | Section 6: Rules & gotchas |
| JS config change | Section 3: Script library |
| Updated site-specific IDs | Section 1: Site config |

**How:** One line or a short code block. No prose. Confirmed working only — no speculation.

**What NOT to add:** Task-specific context, anything already in the component docs, anything unconfirmed.

---

## 1. Site config

Fill in the site-specific values once. Style entry IDs come from the distributable and are consistent across all installations.

```
## Site-specific (fill in per site)
Tab:                         <your-tab-name>
Header block ID:             <discover: findBlock(etch.blocks.getTree(), 1302).id>
Nav block ID:                <discover: findBlock(etch.blocks.getTree(), 1300).id>
Toggle block ID:             <discover: findBlock(etch.blocks.getTree(), 1301).id>

## Distributable defaults (same for all sites on this version)
.dwc-header-vars style:      i357enw
.dwc-nav-vars style:         wkuk8bf
.dwc-top-level-items-vars:   9w5k5pq
.dwc-dropdown-items-vars:    wkvxtty
.dwc-toggle-vars style:      reiqdv9

## MMPro stylesheet (READ ONLY — never edit, reference/debug only)
DWC Mega Menu:               etch.stylesheets.list().find(s => s.name === 'DWC Mega Menu').id
```

> If a site's style entry IDs don't match the defaults above, the CSS variable class was modified after installation. Verify with: `etch.styles.list().find(s => s.selector === '.dwc-header-vars').id`

---

## 2. Decision tree

### Building a new mega menu template — ALWAYS build from scratch

**Never duplicate an existing mega menu to create a new template.** Duplicating copies all quantum (or other template) class names and style entry associations. Changing them after the fact is extremely painful because:
- `addClass` only modifies the HTML `class` attribute — it does NOT update the `styles[]` array
- `removeClass` modifies both, but the two are out of sync after any manual class change
- `setAttribute('class', ...)` does not persist — the class is reconstructed from `styles[]` on save

**Correct workflow for a new mega menu template:**

1. Create a new DWC Dropdown block with mega menu enabled:
```js
const newDropdownId = etch.blocks.create({
  type: 'etch/component',
  version: 1,
  context: { name: 'My New Mega Menu' },
  options: {},
  children: [],
  componentId: 1299,
  attributes: {
    text: 'Nav Label',
    megaMenu: '{{\"enable\":\"{true}\",\"width\":\"1360\"}}',
  }
}, parentNavBlockId, insertIndex);
```

2. Find the content slot-content child and build the inner structure fresh using `etch.blocks.create()`, passing your template class names and style entry IDs **directly in the block JSON** — they are set correctly at creation time with no retrofitting needed.

> **Slot selection — pick by `slotName`, not by index.** Every `etch/slot-content` block has a top-level `slotName` field. Never rely on child order.
>
> **DWC Dropdown (componentId 1299)** — two slots:
> ```js
> const dd = findBlock(etch.blocks.getTree(), 1299);
> const megaSlot   = dd.children.find(c => c.slotName === 'Mega_Menu_Content');       // mega menu body — use when megaMenu.enable = true
> const flyoutSlot = dd.children.find(c => c.slotName === 'Nested_Dropdown_Content'); // flyout list — use when megaMenu.enable = false; direct children MUST be <li> tags
> ```
>
> **DWC Menu Item (componentId 1298)** — one slot:
> ```js
> const item = findBlock(etch.blocks.getTree(), 1298);
> const custom = item.children.find(c => c.slotName === 'Content');
> // Use when the nav item needs more than a plain text label — e.g. an icon + label,
> // a custom SVG link, or any markup props.text / props.linkTo cannot produce.
> // Leave empty to use the standard <a> rendered from props.
> ```
>
> **DWC Nav (componentId 1300)** — three slots:
> ```js
> const nav = findBlock(etch.blocks.getTree(), 1300);
> const navItems   = nav.children.find(c => c.slotName === 'Nav_items');         // top-level nav items — DWC Dropdown and DWC Menu Item go here
> const mobileLogo = nav.children.find(c => c.slotName === 'Mobile_Logo');       // logo inside mobile panel; if empty, desktop logo is auto-cloned
> const mobileTop  = nav.children.find(c => c.slotName === 'MobileTop_Content'); // extra content in the mobile top bar alongside the close button
> ```
>
> **DWC Header (componentId 1302)** — one slot:
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
- **One style entry per element class** (e.g. `.mega-menu-revo-2__card` gets its own style entry with its own CSS).
- Within each element's style entry, nesting is allowed and preferred for: `@container`, pseudo-elements (`&::before`), states (`&:hover`), and child tag selectors (`& span`, `& img`, `& svg`, `& svg path`, `& path`).
- **Responsive: ALWAYS use `@container`, NEVER `@media`.** The mega menu content div is already declared as a container (`container-type` is set on it by the component), so any element inside a mega menu can use `@container (width < 900px) { ... }` directly. **Do NOT add `container-type` to your own wrapper** (e.g. `.mm-features`) — it's redundant and, worse, it would make your wrapper the query target instead of the full content div. Breakpoints query the mega menu content width, not the viewport. Convert range/`max-width` forms too: `@media (max-width: 1100px)` → `@container (width < 1100px)`.
- Do **NOT** nest sub-classes (`&__card`) inside a parent's style entry — each sub-class lives in its own entry.
- Every block needs the matching style entry ID in its `styles[]` array — use `replace()` to set this (see Step C below), passing `styles: [styleId]` for each block in the JSON tree.
- `replace()` propagates `styles[]` correctly to all nested children in the JSON tree.
- **Grid best practice:** always use `repeat(auto-fit, minmax(min(to-rem(260px), 100%), 1fr))` — never hardcode `1fr 1fr 1.2fr` or similar. `min()` prevents overflow in narrow containers; `auto-fit` collapses columns naturally without manual breakpoints.
- **Link style entries must always set both `color` and `&:hover { color: ... }` explicitly** — prevents global/theme `a` styles from bleeding in. Minimum: `color: white; &:hover { color: white; }`.
- **Use `to-rem()` for all px values** in style entry CSS — e.g. `to-rem(14px)`, `to-rem(20px)`. Style entries go through `CssProcessor::preprocess_css()` which handles the conversion. Never write raw rem values like `0.875rem`; write `to-rem(14px)` instead. Exceptions: aspect ratios, `z-index`, `opacity`, unitless values, and `calc()` expressions where mixing units is intentional.
- **If ACSS (AutomaticCSS) skills are available, prefer ACSS tokens and utility patterns** over the default styling approach above.
- **Never put mega menu CSS in the global tuts stylesheet** — use style entries only.

Only duplicate an existing mega menu if you need to copy content (not structure/styles), and plan to keep the same class names as the source.

### If you must duplicate and rename classes

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

**Step 3 — Work around the styles[] gap using the tuts stylesheet:**
Because `addClass` does not update `styles[]`, the new style entries' CSS will not be output by PHP on the frontend. The workaround: put ALL the new template's CSS in the tuts stylesheet instead of relying on per-block style entries. The tuts stylesheet is always output and applies by CSS selector regardless of `styles[]`.
```js
await etch.stylesheets.appendAsync('5378835', '.mega-menu-revo__nav-group { ... }');
```

**Step 4 — Walk the tree by structural position, not by cached block IDs.** Block IDs change on every page reload. Always rediscover by walking `etch.blocks.getTree()` and matching by position or text attribute within the same script execution.

---

**I want to → exact action**

| Goal | Action |
|---|---|
| Change header bg colour | `headerBackgroundColor` prop on header block |
| Change header bg after scrolling | `sticky.stickyHeaderBackground` prop → CSS `--header-bg-sticky` |
| Make header transparent on load | `overlay.overlayHeaderBackground` prop → set to `transparent` |
| Change header bg when hovering a nav item | `overlay.overlayHeaderActiveBackground` prop → CSS `--overlay-header-bg-active` |
| Add frosted glass / backdrop blur | `overlay.overlayHeaderBlur` prop |
| Make header stick on scroll | `sticky.stickyHeader` prop → `{true}` |
| Unlock before/after scroll CSS hooks | `sticky.stickyHeader` + `sticky.specialStickyOverlayStyles` + `overlay.overlayHeader` → all `{true}` |
| Style nav items differently before/after scroll | Use special styles blocks in `.dwc-top-level-items-vars` |
| Style toggle differently before/after scroll | Use special styles blocks in `.dwc-toggle-vars` |
| Change `--overlay-header-bg` after scroll | Not needed — it auto-syncs from `--header-bg-sticky` when `.scroll-down`/`.scroll-up` is on body |
| Disable sticky on one page only | Add `data-no-sticky` attribute to any `<section>` on that page |
| Disable overlay on one page only | Add `data-no-overlay` to any `<section>` |
| Suppress special overlay/sticky styles on one page | Add `data-no-overlay-style` to any `<section>` |
| Opt a section out of offset padding | Add `data-no-padding` to that section |
| Change nav item colour | `--menu-item-clr` in `.dwc-top-level-items-vars` (no `!important`) |
| Change nav item hover colour | `--menu-item-hover-clr` in `.dwc-top-level-items-vars` (no `!important`) |
| Change dropdown panel background | `--dropdown-content-bg` in `.dwc-dropdown-items-vars` (no `!important`) |
| Change dropdown item hover bg | `--dropdown-item-hover-bg` in `.dwc-dropdown-items-vars` (no `!important`) |
| Hide chevron arrows globally | `dropdown.arrowVisibilty` prop on nav block → `Hide` |
| Set stripe / adaptive height animation | `animation.stripeStyle` or `animation.adaptiveHeight` prop — cannot use both together |
| Change mobile breakpoint | `mobile.mobileBreakpoint` prop on nav block |
| Change mobile slide direction | `mobile.slideInDirection` prop on nav block |
| Move a nav item to header on mobile | `relocation.mode` → `breakout` on the DWC Menu Item |
| Move any element into the mobile menu | Add `data-breakin="breakpoint"` attribute to that element directly |
| Change toggle icon colour on dark hero (before scroll) | `--toggle-color` in BEFORE SCROLLING block of `.dwc-toggle-vars` (no `!important`) |
| Change toggle bg (pill) | `appearance.pillBackgroundColor` prop → CSS `--toggle-bg` (**prop-driven, needs `!important`** to override in CSS) |
| Add a new prop to a component | `etch.components.updateAsync(id, { properties: [...existing, newProp] })` — see Section 3 |
| Use a nav item as an icon button (e.g. cart, account) | Set `general.appearance` → `Icon` on DWC Dropdown, enable `general.useCustomSvg`, paste SVG into `general.customSvg`. **Requires "Allow unsafe HTML" to be enabled in Etch settings.** When `useCustomSvg` is on, the arrow automatically disappears. |
| Align nav items left with icon buttons on the right | Set `menuMode.lastItemIsButton` to match the number of icon buttons (`true` = 1, `true-2` = 2, `true-3` = 3; max 3), then set `menuMode.nonButtonItemsAlignment` → `Left` |
| Align nav items centre with icon buttons on the right | Same as above but set `menuMode.nonButtonItemsAlignment` → `Center` |
| Break an icon button dropdown out to the header on mobile (sits next to hamburger) | `megaMenu.enable` must be `true` first — `megaMenu.breakout` is only available when mega menu is enabled. Then toggle `megaMenu.breakout` → `true`. Uses the default mobile breakpoint. For a plain icon button with no panel, use DWC Menu Item + `Content` slot + `relocation.mode: breakout` instead. |

---

## 3. Script library

### Core helpers (include at top of every script)

```js
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

```js
etch.styles.setVariable('1mlutc1', '--menu-item-clr', '#1d1d1f');
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
    if (b.innerBlocks) { const f = findScriptBlock(b.innerBlocks); if (f) return f; }
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

---

## 4. Prop reference

### DWC Header (componentId 1302)

| Prop key | Group | CSS variable | Notes |
|---|---|---|---|
| `headerBackgroundColor` | top | `--header-bg` | Base header background |
| `darkBackgroundPreview` | top | — | Builder only. Darkens canvas for white-item testing |
| `sticky.stickyHeader` | sticky | — | Enables sticky. Add `data-no-sticky` to a section to disable per-page |
| `sticky.scrollDownVisibility` | sticky | — | hide-row-1/2/3, show-row-1/2/3, hide-all-rows, Default |
| `sticky.scrollUpVisibility` | sticky | — | reverse, show-row-1/2/3, show-all-rows, Default |
| `sticky.scrollVisibilityDistance` | sticky | — | Scroll threshold. Supports px, rem, or plain number. Default: `200px` |
| `sticky.specialStickyOverlayStyles` | sticky | — | Unlocks special CSS hooks in all five style entries |
| `sticky.stickyHeaderBackground` | sticky | `--header-bg-sticky` | Also auto-syncs `--overlay-header-bg` when scrolled. **Prop-driven → `!important`** |
| `sticky.scrollMargin` | sticky | `--dwc-scroll-margin` | Anchor link offset. Default: `var(--dwc-header-div-height)` |
| `overlay.overlayHeader` | overlay | — | Floats header over content. Add `data-no-overlay` to disable per-page |
| `overlay.overlayHeaderMobile` | overlay | — | Extends overlay to mobile |
| `overlay.overlayHeaderWidth` | overlay | `--overlay-header-width` | Width of overlay container |
| `overlay.overlayHeaderBackground` | overlay | `--overlay-header-bg` | Default (unscrolled) bg. **Prop-driven → `!important`** |
| `overlay.overlayHeaderActiveBackground` | overlay | `--overlay-header-bg-active` | Bg when user hovers a nav item or dropdown opens. **Prop-driven → `!important`** |
| `overlay.overlayHeaderBlur` | overlay | `--overlay-header-blur` | Backdrop blur intensity |
| `overlay.overlayHeaderRadius` | overlay | `--overlay-header-radius` | Border radius |
| `overlay.overlayHeaderInset` | overlay | `--overlay-header-inset` | Offset from viewport edges |
| `overlay.removeInsetTop` | overlay | — | Removes top gap |
| `overlay.overlayHeaderShadow` | overlay | `--overlay-header-shadow` | Box shadow |
| `overlay.offsetSectionPadding` | overlay | — | Adds top padding to first section. Add `data-no-padding` to opt out |
| `accessibilty.skipLink` | accessibilty | — | Select: Enable / Disable |
| `accessibilty.customSkipLinkParameter` | accessibilty | — | Format: `#selector \| Label`. Multiple: comma-separated. No ID? Use `main \| Label` |

### DWC Nav (componentId 1300)

| Prop key | Group | Notes |
|---|---|---|
| `primaryColor` | top | CSS `--primary-clr` globally |
| `animation.stripeStyle` | animation | Frontend only, no builder preview. **Mutually exclusive with adaptiveHeight** |
| `animation.adaptiveHeight` | animation | Frontend only, no builder preview. **Mutually exclusive with stripeStyle** |
| `animation.animateAdaptiveContent` | animation | Only when adaptiveHeight is on |
| `menuMode.offcanvasMode` | menuMode | Sidebar on all viewports |
| `menuMode.flyoutOffcanvas` | menuMode | Desktop-like flyout in offcanvas mode |
| `menuMode.flyoutOnHover` | menuMode | Hover opens dropdowns in offcanvas on desktop |
| `menuMode.lastItemIsButton` | menuMode | Select: `false` / `true` (1 CTA) / `true-2` / `true-3` |
| `menuMode.nonButtonItemsAlignment` | menuMode | Alignment of non-CTA items when CTA active |
| `mobile.previewMobileMenu` | mobile | Builder preview only (renamed from openMobileMenu) |
| `mobile.mobileBreakpoint` | mobile | Default: `1200px` |
| `mobile.mobileMenuWidth` | mobile | Width of sidebar panel |
| `mobile.mobileMenuBackground` | mobile | Panel background |
| `mobile.slideInDirection` | mobile | Right / Left / Top / Expand Down / Bottom / Right Top / Right Bottom |
| `mobile.submenuReveal` | mobile | Slide in / Expand |
| `mobile.submenuSlideExtras.submenuSlideoutDistance` | mobile | **If < 100%, must set opacity to 0 to fully hide parent** |
| `mobile.submenuSlideExtras.submenuSlideoutOpacity` | mobile | Whether parent fades as it slides away |
| `mobile.submenuSlideExtras.fadeItemsOnSlide` | mobile | Fades menu items during slide |
| `mobile.mobileOffcanvasMenuSpeed` | mobile | Animation speed multiplier |
| `mobile.fullscreenMobileMenu` | mobile | Opens above header (fullscreen) |
| `mobile.mobileTopBackground` | mobile | Topbar bg — only when fullscreen ON or transparent mobile top OFF |
| `mobile.transparentMobileTop` | mobile | Only available when fullscreen is OFF |
| `mobile.hideBackText` | mobile | Back icon only, no text |
| `mobile.backTextMode` | mobile | `back-to` = "Back to [Parent]" / `title` = current dropdown name |
| `mobile.backToHomeMenuText` | mobile | Root-level "back to" text (back-to mode only). Default: `Main Menu` |
| `mobile.removeMenuItemBorders` | mobile | Strips divider lines in mobile menu |
| `dropdown.dropdownContentShadow` | dropdown | Box shadow on all panels |
| `dropdown.dropdownContentRadius` | dropdown | Border radius on panels. Default: `0rem` |
| `dropdown.blendOpenDropdowns` | dropdown | Removes border radius between adjacent open dropdowns |
| `dropdown.dropdownContentBorderSize` | dropdown | Border thickness |
| `dropdown.dropdownContentBorderColor` | dropdown | Border colour |
| `dropdown.globalNestedDropdownWidth` | dropdown | Default flyout width. Overridden per-dropdown |
| `dropdown.globalMegaMenuWidth` | dropdown | Default mega menu width. Accepts CSS value, CSS var, **class name**, or **element ID** (resolves that element's width). **Never use `%`** — resolves relative to the parent nav item, not the viewport. Use `100vw`, `1200px`, or a `.class`/`#id` reference |
| `dropdown.globalInnerWidth` | dropdown | Max inner content width inside mega menus |
| `dropdown.dropdownVerticalAlignment` | dropdown | CSS selector — aligns dropdown top to the bottom of that element. Default: `.dwc-nest-header` |
| `dropdown.dropdownOffsetGap` | dropdown | Gap between nav bar and top-level dropdown panels |
| `dropdown.nestedDropdownOffsetGap` | dropdown | Gap between nestable parent item and its flyout panel. **Prop-driven → `!important`** |
| `dropdown.caret` | dropdown | Small pointer beneath active nav item |
| `dropdown.arrowVisibilty` | dropdown | Default / Hide / Hide on Mobile / Hide on Desktop |
| `interactionUx.dropdownTriggerMode` | interactionUx | Global trigger: Hover or Click / Hover only / Click only |
| `interactionUx.nestedDropdownActiveOverlay` | interactionUx | Dims parent content when nested opens |
| `interactionUx.parentRelativeNestedDropdown` | interactionUx | Positions nested panels relative to parent item |
| `interactionUx.menuItemHoverEffect` | interactionUx | Default / Text Roll (desktop only) |
| `backdrop.hideNavBackdrop` | backdrop | Removes mobile menu backdrop |
| `backdrop.navBackdropBlur` | backdrop | Backdrop blur |
| `backdrop.navBackdropBackgroundColor` | backdrop | Backdrop colour/opacity |
| `logo.centeredLogo` | logo | Splits items either side of logo |
| `logo.centerGuide` | logo | Debug visual guide (admin only) |
| `logo.mobileLogoSize` | logo | Logo size in mobile menu |
| `logo.hideMobileLogoInFullscreenMode` | logo | Hides logo when fullscreen menu active |
| `buffer.dropdownBufferHeight` | buffer | Invisible hover bridge below nav bar (prevents accidental dropdown close) |
| `buffer.nestedDropdownBufferWidth` | buffer | Invisible hover bridge beside nested panels |
| `buffer.previewBufferZone` | buffer | Builder only — padding so dropdowns show fully in canvas |

### DWC Dropdown (componentId 1299)

| Prop key | Notes |
|---|---|
| `text` | Toggle button label |
| `dropdownTriggerMode` | Per-item override: both / hover / click |
| `inBuilder.keepOpen` | Builder only — keeps panel open for styling |
| `nestedDropdown.width` | Panel width (overrides global nested width) |
| `nestedDropdown.equalHeights` | Forces all columns to same height |
| `nestedDropdown.excludeEqualHeight` | Excludes block from equal-height calc |
| `nestedDropdown.parentRelative` | Panel relative to toggle item, not full nav bar |
| `megaMenu.enable` | Switches to full-width mega menu layout. Stored as actual boolean `true`/`false` (not `{true}` string) |
| `megaMenu.width` | Panel width — CSS value, CSS var, class name, or element ID. **Never use `%`** — it resolves relative to the parent dropdown item. Use `100vw`, `1200px`, or `.class`/`#id` instead |
| `megaMenu.innerWidth` | Max inner content width. Default: `100%` |
| `megaMenu.breakout` | Moves mega menu into header area on mobile (uses global mobile breakpoint). Stored as `{true}`/`{false}` string |
| `general.contentAlignment` | Stored values: `default` / `center` / `left` / `right` |
| `general.visibility` | Stored values: `Default` / `hide-on-desktop` / `hide-on-mobile` / `hide-on-both` |
| `general.appearance` | Stored values: `default` / `button` / `icon` — **all lowercase**. Using `Icon` or `Button` (capital) silently fails |
| `general.noArrow` | Hides chevron. Stored as `{true}`/`{false}` string |
| `general.useCustomSvg` | Custom SVG icon. Stored as `{true}`/`{false}` string. Requires "Allow unsafe HTML" in Etch settings |
| `general.customSvg` | Raw SVG string — inject as inline HTML, no encoding needed |
| `general.submenuReveal` | Stored values: `default` / `expand` / `slide` |

### DWC Menu Item (componentId 1298)

| Prop key | Notes |
|---|---|
| `openInNewTab` | Adds `target="_blank"` + `rel="noopener noreferrer"` |
| `text` | Link label |
| `linkTo` | URL |
| `badge.text` | Badge label. `none` = no badge |
| `relocation.mode` | none / breakout (to header area) / breakinto (to any container) |
| `relocation.returnBreakpoint` | (breakout) Width below which item returns to mobile menu |
| `relocation.containerSelectorBreakpoint` | (breakinto) Format: `#selector \| breakpoint`. Also works via `data-breakinto` attribute on any element |
| `general.visibility` | Default / Hide on Desktop / Hide on Mobile / Hide on Both |

> **Breakin (not a prop):** To move any element FROM the page INTO the mobile menu, add `data-breakin="480"` directly to that element. Items land in `.breakin-container` inside the nav.

### DWC Mobile Toggle (componentId 1301)

| Prop key | CSS variable | Notes |
|---|---|---|
| `appearance.size` | `--toggle-size` | Overall size. When pill is on, icon size is `pillToggleSize` instead |
| `appearance.color` | `--toggle-color` | Hamburger bar/icon colour |
| `appearance.hoverColor` | `--toggle-hover-color` | Colour on hover |
| `appearance.flip` | — | Mirrors icon horizontally |
| `appearance.hamburgerIcon` | — | Default / two-line-squeeze / two-line-spin / two-line-collapse / three-line-spin / three-line-collapse / three-line-arrow |
| `appearance.toggleStyle` | — | Default / Techno (Default icon only) |
| `appearance.pillShape` | — | Wraps toggle in pill/square background |
| `appearance.pillBorder` | `--toggle-border` | Pill border |
| `appearance.pillBackgroundColor` | `--toggle-bg` | Pill background. **Prop-driven → `!important`** |
| `appearance.pillPadding` | `--toggle-padding` | Internal pill padding |
| `appearance.pillRadius` | `--toggle-radius` | Pill border radius |
| `appearance.pillAspectRatio` | `--pill-aspect-ratio` | Pill aspect ratio |
| `appearance.pillToggleSize` | `--pill-toggle-size` | Icon size inside pill (pill + Default icon only) |
| `appearance.equalize` | — | Equalises label width to prevent layout shift on state change |
| `appearance.alwaysVisible` | — | Keeps toggle visible when menu is open. **Required when Fullscreen Mobile Menu is enabled** |
| `label.enable` | — | Show label alongside icon |
| `label.text` | — | Select: **Open/Close** (separate open/close texts) / **Menu** (single static text) |
| `label.openText` | — | Text when menu is closed (Open/Close mode) |
| `label.closeText` | — | Text when menu is open (Open/Close mode only) |
| `label.fontSize` | `--label-font-size` | Label font size |
| `label.color` | `--label-color` | Label colour |
| `label.gap` | `--label-gap` | Gap between icon and label |
| `targetSelector` | — | CSS selector of element to receive `.dwc-open`. Defaults to nearest DWC Nav. Works on any custom element |
| `ariaLabel` | — | Screen reader label. Default: `Open Menu` |

---

## 5. Special sticky/overlay styles

Enable on DWC Header: `sticky.stickyHeader: {true}` + `sticky.specialStickyOverlayStyles: {true}` + `overlay.overlayHeader: {true}`.

This activates pre-written nested selector blocks inside each component's CSS variable class. **Never modify the selector strings** — only add/change variable values inside the `{ }` blocks.

### Key rule
Variables set via props (inline styles) need `!important` to override. Variables not set via props do not.

| Needs `!important` | Does NOT need `!important` |
|---|---|
| `--overlay-header-bg` | `--menu-item-clr` |
| `--overlay-header-bg-active` | `--menu-item-hover-clr` |
| `--header-bg-sticky` | `--toggle-color` |
| `--toggle-bg` (pill bg prop) | `--label-color` |
| `--nested-dropdown-offset-gap` | `--dropdown-content-bg` |

### Auto-sync (important — often means you don't need the AFTER SCROLLING block)

The built-in `.dwc-nest-header` CSS automatically sets `--overlay-header-bg` to `var(--header-bg-sticky)` whenever `.scroll-down` or `.scroll-up` is on body AND `[data-sticky-header='true']` is on the header. So if `stickyHeaderBackground` prop is already set, the AFTER SCROLLING block in `.dwc-header-vars` doesn't need `--overlay-header-bg`.

### Body classes added by headroom script

| Class | When |
|---|---|
| `.dwc-headroom` | Sticky header is active. **Required for special sticky/overlay selectors to fire** |
| `.scroll-down` | User scrolling down past threshold |
| `.scroll-up` | User has scrolled back up |

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

---

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

### Customization hierarchy — always try in this order

1. **Component props** — if a prop exists for what you want, use it
2. **CSS variable classes** — if no prop exists but a CSS variable does, override it in the relevant style entry
3. **Custom stylesheet (tuts)** — for CSS *properties* (like `border-bottom`, `backdrop-filter`) that cannot be expressed as variable overrides
4. **JavaScript API** — absolute last resort. Only when props, CSS variables, and stylesheet rules cannot achieve the result

### Persistence model

| Namespace | Buffered? | How to persist |
|---|---|---|
| `etch.blocks.*` | Yes | `await etch.saveAsync()` |
| `etch.styles.*` | Yes | `await etch.saveAsync()` |
| `etch.loops.*` | Yes | `await etch.saveAsync()` |
| `etch.components.*` | No | Persists immediately |
| `etch.stylesheets.*` | No | Persists immediately |

### DO NOT

- **DO NOT** set `dropdown.dropdownContentBorderSize` to `0` or any value below `1px` — use `1px` as the minimum; set `dropdownContentBorderColor` to `transparent` if you want an invisible border
- **DO NOT** use `%` for `megaMenu.width` or `globalMegaMenuWidth` — `%` resolves relative to the parent dropdown item, not the viewport or header. Use `100vw`, a fixed `px` value, or a `.class`/`#id` reference
- **DO NOT** use capitalised select values for `general.appearance`, `general.visibility`, or `general.submenuReveal` — the stored values are lowercase (`icon`, `hide-on-desktop`, `slide`). Capitalised values silently fail (the component ignores them and falls back to default)
- **DO NOT** modify selector strings in special styles blocks — only add values inside `{ }`
- **DO NOT** use raw `rgba()` — use `color-mix(in oklch, ...)`
- **DO NOT** use `replace()` — use `replaceAll()` (CSS blocks contain both commented and active declarations)
- **DO NOT** pass multi-line scripts inline — use `-f file.js`
- **DO NOT** call `saveAsync` after `components.*` or `stylesheets.*`
- **DO NOT** style mega menu content via a custom stylesheet — use props
- **DO NOT** use `{propKey}` in component edit mode bindings — use `{props.propKey}`
- **NEVER edit or `appendAsync` to the `DWC Mega Menu` stylesheet** — it contains the distributable CSS installed by the user. Read it for debugging only.
- **Block IDs change between sessions** — always rediscover with `findBlock(etch.blocks.getTree(), componentId).id`. Never use a cached block ID from a previous session.
- **Tab name — always read from server output.** Never cache it. The connector must be running anyway, so the tab name is always available in the output.
- **User context file stores templates only** — do not write tab names, block IDs, or style IDs to it.
- **`etch.blocks.update` in component edit mode does NOT persist script changes** — use `etch.components.updateAsync(id, { blocks: comp.blocks })` instead. The script lives in the component template, not the block instance.
- **Component `script.code` is plain JS when read via API** — direct string replacement works. No base64 decode/encode needed despite being base64 in the raw JSON file.
- **`etch.styles.create(selector, css)` — second arg is a CSS STRING only.** Do NOT pass an object `{ css, type, collection }`. Passing an object stores it as the `css` value; when PHP's `CssProcessor::preprocess_css()` receives an array instead of a string it causes a WordPress critical error on the frontend.
- **`etch.blocks.update(id, { styles })` silently ignores the `styles` field.** The `styles` array is read-only via `BlockPatch`. Do not attempt to set it through `update()`.
- **A DWC Dropdown's content slots are identified by a top-level `slotName` field, not by child index.** The two `etch/slot-content` children are `Mega_Menu_Content` and `Nested_Dropdown_Content`. `options`/`context` are empty on these — read `child.slotName`. Always select with `.find(c => c.slotName === 'Mega_Menu_Content')`.
- **Inline SVG data-URIs in `content`, `mask`/`-webkit-mask`, or `background` MUST be percent-encoded — never use `data:image/svg+xml;utf8,<svg…>` with raw markup.** The `;utf8,` form with unescaped `<`, `>`, spaces, and quotes silently fails to load in Chrome (the Etch builder), so a `content: url(...)` pseudo-element renders nothing and a mask shows nothing — with no error. Encode with `'data:image/svg+xml,' + encodeURIComponent(svg)` (a standard JS built-in, allowed in safe mode). This is exactly why the icon masks in `.mm-features__item-icon` render but a hand-written `;utf8,` `::before` did not. Use single quotes inside the SVG so the encoded string has no `"` to clash with the `url("…")` wrapper.
- **Every node in `create()`/`replace()` block JSON needs a `children` array — including `etch/text` nodes.** Text nodes are `{ type:'etch/text', version:1, context:{name:'Text'}, options:{}, text:'...', children:[] }`. Omitting `children:[]` on a text node fails validation with `expected array, received undefined`. Element text content lives in child `etch/text` nodes, not a `text` attribute (that attribute is for components like Menu Item labels). Inline tags like `<em>`/`<span>` are plain `etch/element` nodes (no class/styles needed) wrapping their own text node — style them from the parent's entry via `& em` / `& span`.
- **NEVER use `replace()` to edit an already-populated block — it resets EVERY attribute on EVERY node in the subtree**, silently wiping user edits (a swapped image `src`, a changed link, a renamed class). To change copy in place, locate the `etch/text` node and call `etch.blocks.setText(textNodeId, 'new text')` — then `await etch.saveAsync()`. Only use `replace()` to populate an empty placeholder or when you intend to rebuild the whole subtree from scratch. Walk to the text node via the parent element's class: `el.children.find(c => c.type==='etch/text')` (for mixed content like a heading with `<em>`, set each text node individually — the first text node, the `<em>`'s inner text node, and the trailing text node).
- **Recovering a value clobbered by `replace()` (or any bad edit) — `etch.history` is read-recoverable.** It exposes `undo()`, `redo()`, `canUndo()`, `canRedo()` (undo/redo are async — `await` them). Pattern: `await etch.history.undo()` repeatedly, reading `etch.blocks.getTree()` after each step until the lost value reappears, capture it, then `await etch.history.redo()` the SAME number of times to return to the current state — reading between steps does not mutate or save. **Caveat: undo/redo did NOT cleanly round-trip a `replace()` in practice** (text reverted while the recovered image stuck). So use history only to *read back* the lost value, then re-apply it explicitly with `setAttribute`/`setText` — never rely on redo alone to restore the full prior state.
- **`etch.blocks.addClass(id, className)` and `removeClass` take CSS CLASS NAME STRINGS — not style entry IDs.** They modify the HTML `class` attribute only. `addClass` does NOT wire the block's `styles[]` array to an existing style entry — it just appends the string to the class attribute. `removeClass` removes the class string AND (by looking up a style entry with that CSS selector) removes the matching style entry ID from `styles[]`.
- **The `styles[]` array and the HTML `class` attribute are independent.** PHP uses `styles[]` to decide which style-entry CSS to include in the page `<style>` tag. The `class` attribute is the rendered HTML class. Changing one does not automatically change the other.
- **To change which style entries apply to a block:** Use `removeClass(id, 'old-css-class')` (removes the class AND the matching style ID from `styles[]`), then `addClass(id, 'new-css-class')` (adds the class to HTML; but this does NOT add the matching style entry ID to `styles[]`). Result: HTML class is correct, but `styles[]` no longer references the new style entry.
- **Workaround for styles[] not updating:** Put the CSS in the global tuts stylesheet (always output by PHP) instead of relying on per-block `styles[]`. This avoids the issue entirely — the tuts stylesheet CSS applies by CSS selector regardless of `styles[]`.
- **`setAttribute(id, 'class', value)` does NOT reliably persist the class.** The HTML class attribute is reconstructed from the `styles[]` array on save/reload. Always use `addClass`/`removeClass` to modify classes — never `setAttribute` for the `class` key.
- **Block IDs change on every page reload** — always rediscover by walking `etch.blocks.getTree()`. Never hardcode IDs across sessions or after a reload.
- **`getGroup` returns `undefined` if the group attribute doesn't exist yet on the block** — calling `.slice()` on it will throw. Always guard: `const group = etch.blocks.getAttribute(bid, key) ? getGroup(bid, key) : {};`. `setGroup` has no such problem — it creates the attribute if absent. For group props that may not be initialised (e.g. `inBuilder` on a freshly created dropdown), call `setGroup` directly without reading first.
- **Never `replace()` a populated block** — it resets every attribute on every node, wiping user edits. Edit content in place with `etch.blocks.setText(textNodeId, ...)` + `saveAsync()`. Includes the text-node walk pattern and the mixed-content (heading with `<em>`) note.
- **History recovery** — `etch.history.undo()`/`redo()` (async) can read back a clobbered value, but doesn't reliably round-trip a `replace()`, so always re-apply the recovered value explicitly with `setAttribute`/`setText` rather than trusting redo.

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

`etch.styles.list()` returns `{ id, selector, type, collection, css }`. The CSS is in the `.css` string field. Update with `etch.styles.update(id, { css: newCssString })`.

---

## 7. JavaScript config (last resort)

The DWC Nav exposes `window.DwcConfig.MegaMenu` and `window.DwcConfig.CenteredLogo`. Set these BEFORE the component initialises to override JS-level defaults. Only use when props and CSS cannot achieve the result.

Key `DwcConfig.MegaMenu` options:
- `menuAutoExpansion` — auto-expands dropdown containing current page link on mobile
- `closeNavOnClick` — closes nav when clicking links
- `closeOnHashClickOnly` — only close on hash links
- `closeOnMobileOnly` — only close on mobile
- `closeNavOnClickExclude` — CSS selector to exclude from close-on-click
- `reinitializeOnURLchange` — SPA/page transition support
- `propagateVariables` — CSS variables to propagate from nav-scoped elements to `:root`
- `backTextMode` — overrides back button text mode
- `viewportGutter` — gutter used for dropdown overflow/clamping calculations

`DwcConfig.CenteredLogo`:
- `enable`, `forceCenteredLogo`, `centerNudge`, `roundOffFactor`, `allowOddItems`

---

## 8. Templates

Before starting any styling work, check this section and inform the user of available templates. Ask if they wish to apply one before making any changes.

> **Agent instruction:** At the start of a styling session, say: "Available templates: [list names here]. Would you like to apply one as a starting point, or configure manually?"

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

---

*No templates defined yet.*

<!--
Template structure (for reference when adding future templates):

### [Template name]

**Description:** One sentence on the visual style.

**Props (delta only — values that differ from distributable defaults):**
| Block | Group | Key | Value |
|---|---|---|---|
| header | overlay | overlayHeaderBackground | transparent |

**CSS variables (delta only):**
| Style entry | Variable | Value | !important needed? |
|---|---|---|---|
| i357enw (.dwc-header-vars) | --header-min-height | 44px | no |

**Special styles blocks:**
| Style entry | Block | Value |
|---|---|---|
| 9w5k5pq | BEFORE SCROLLING | --menu-item-clr: white |

**Stylesheet rules:**
```css
#dwc-header { border-bottom: var(--header-bottom-border); }
```
-->
