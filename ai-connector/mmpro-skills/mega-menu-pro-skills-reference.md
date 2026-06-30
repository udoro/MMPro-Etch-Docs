---
icon: books
---

# AI Skills Reference — Lookup Companion

This is the **lookup-only** companion to `mega-menu-pro-skills.md` (same folder). You do NOT
need to read this file in full at session start — only Grep into the specific section a task
needs, per the "When to consult the reference file" guidance in the main file. Everything here
is unchanged from the main file except where noted.

***

## 4. Prop reference

> **Full reference (local, preferred):** this section is a quick-lookup summary. For exhaustive prop
> descriptions, full slot documentation, and per-component examples, read this repo's `components/`
> folder (`../../components/dwc-header.md`, `dwc-nav.md`, `dwc-dropdown.md`, `dwc-menu-item.md`,
> `dwc-mobile-toggle.md`, relative to this file) — same props as below, with the prose this table omits.
> **Not present if you only downloaded the `mmpro-skills` folder on its own** — it's the same folder
> the live GitBook site's "Components" pages are published from, kept single-source there rather than
> duplicated here. If it's missing, use the online reference below instead.
>
> **Full reference (online):** if the local docs aren't available or don't cover a setting, read the
> official docs at <https://design-with-cracka.gitbook.io/etchmegamenupro> (per-component pages: DWC
> Header, DWC Nav, DWC Dropdown, DWC Menu Item, DWC Mobile Toggle). Cross-component exceptions (e.g.
> CTA/`lastItemIsButton` styling is DWC Menu Item-only) are in Section 6 (in the main file).

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
