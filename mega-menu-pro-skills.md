# DWC Mega Menu Pro — AI Skills Reference

Standalone reference for configuring DWC Mega Menu Pro + Header Builder in Etch via the etch-connector. Read sections 1–3 first — they cover 90% of tasks. Sections 4–7 are lookup-only.

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
| `dropdown.globalMegaMenuWidth` | dropdown | Default mega menu width. Accepts CSS value, CSS var, **class name**, or **element ID** (resolves that element's width) |
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
| `megaMenu.enable` | Switches to full-width mega menu layout |
| `megaMenu.width` | Panel width — CSS value, CSS var, class name, or element ID |
| `megaMenu.innerWidth` | Max inner content width. Default: `100%` |
| `megaMenu.breakout` | Moves mega menu into header area on mobile (uses global mobile breakpoint) |
| `general.contentAlignment` | Panel horizontal alignment: default / center / left / right |
| `general.visibility` | Desktop only / Mobile only / Hide on Both / Default |
| `general.appearance` | Default (link) / Button / Icon |
| `general.noArrow` | Hides chevron (not available for icon appearance) |
| `general.useCustomSvg` | Custom chevron SVG. Requires "Allow unsafe HTML" in Etch settings |
| `general.customSvg` | SVG code |
| `general.submenuReveal` | Per-dropdown mobile reveal: Default / Expand / Slide |

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

- **DO NOT** modify selector strings in special styles blocks — only add values inside `{ }`
- **DO NOT** use raw `rgba()` — use `color-mix(in oklch, ...)`
- **DO NOT** use `replace()` — use `replaceAll()` (CSS blocks contain both commented and active declarations)
- **DO NOT** pass multi-line scripts inline — use `-f file.js`
- **DO NOT** call `saveAsync` after `components.*` or `stylesheets.*`
- **DO NOT** style mega menu content via a custom stylesheet — use props
- **DO NOT** use `{propKey}` in component edit mode bindings — use `{props.propKey}`
- **NEVER edit or `appendAsync` to the `DWC Mega Menu` stylesheet** — it contains the distributable CSS installed by the user. Read it for debugging only.

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
