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

Every settable prop on all five components. Generated from the Etch component export, so it matches
the components the plugin ships. Do not hand-edit the generated block.

**Reading the tables**

* **Path** is what you set, always fully flattened, e.g. `props.general.appearance`.
* **Panel section headings are not path segments.** Etch's settings panel groups fields visually and
  that grouping is not the API shape. Inside DWC Dropdown's single "General" panel section, **Text**
  is `props.text` while **Appearance** is `props.general.appearance`. Nothing on screen
  distinguishes them. Take the path from this table, never from a heading in `components/`.
* **Paths are unique within a component, not across them.** `dropdownTriggerMode` is top-level on
  DWC Dropdown and `interactionUx.dropdownTriggerMode` on DWC Nav.
* **Attribute** is the `data-*` the prop writes onto the element, and is ground truth when a prop
  and the rendered DOM disagree. `style only` means it writes no attribute.
* **Default** is the component's own default. **Never set a prop to its default value.**
* **Values** shows select options as `Label : stored-value` where the two differ. **Store the
  right-hand side.** `Expand Down (from Header) : expand down` stores `expand down`.
* **Shown when** records the panel condition. It affects only whether Etch displays the field.
* **No component IDs appear here, deliberately.** They are install-local. Always resolve by name.

<!-- GENERATED:PROPS start -->

*Generated from Mega Menu Pro **1.2.2**. Paths, defaults and select values are properties of
the plugin version, identical on every install of it. Component IDs are install-local and are
deliberately absent: always resolve them by name.*

#### Schema fingerprints — check these before trusting the tables below

Run the fingerprint check in Section 3 (about 360 bytes returned) and compare per component.
A match means this table describes the install exactly and you need no schema dump at all.
A mismatch means the install differs from the version above: **dump only the components that
disagree**, and treat the live schema as authoritative for those. Do not dump the ones that match.

| Component | Fingerprint |
| --- | --- |
| DWC Menu Item | `16:ewqg76` |
| DWC Dropdown | `22:1y5oqyo` |
| DWC Nav | `56:1jaftl0` |
| DWC Mobile Toggle | `26:quzir` |
| DWC Header | `33:vskoe2` |

### DWC Menu Item

| Prop | Path | Attribute | Default | Values / notes |
| --- | --- | --- | --- | --- |
| Open in new tab | `props.openInNewTab` | `data-open-new-tab` | `false` | `true` / `false` |
| Text | `props.text` | style only | `Link Item` | Shown when `slots.Content.empty` |
| Link to | `props.linkTo` | `href` | `#` | Shown when `slots.Content.empty` |
| Text | `props.badge.text` | style only | `none` | Shown when `slots.Content.empty` |
| Font Size | `props.badge.fontSize` | `style` | `0.75rem` | Shown when `props.badge.text !== "none"` |
| Color | `props.badge.color` | `style` | `#fff` | Shown when `props.badge.text !== "none"` |
| Background Color | `props.badge.backgroundColor` | `style` | `#000` | Shown when `props.badge.text !== "none"` |
| Border Radius | `props.badge.borderRadius` | `style` | `0.5em` | Shown when `props.badge.text !== "none"` |
| Padding | `props.badge.padding` | `style` | `0.1em 0.5em;` | Shown when `props.badge.text !== "none"` |
| Gap | `props.badge.gap` | `style` | `1em` | Shown when `props.badge.text !== "none"` |
| Mode | `props.relocation.mode` | style only | `none` | `none` / `Move to header on mobile : breakout` / `Move to a specific container on mobile : breakinto` / `Move to mobile menu footer : breakin` |
| Return Breakpoint | `props.relocation.returnBreakpoint` | `data-breakout` |  | Item will move to the header at the Mobile Breakpoint. Set a lower breakpoint where the item returns to the mobile menu, for example, 480. Leave empty to keep the item in the header.. Shown when `props.relocation.mode === "breakout"` |
| Container Selector \| Breakpoint | `props.relocation.containerSelectorBreakpoint` | `data-breakinto` |  | E.g. #my-div \| 767. NOTE: You can also move any element to any container - add the attribute 'data-breakinto = .container-selector \| breakpoint' to the target element.. Shown when `props.relocation.mode === "breakinto"` |
| Visibility | `props.general.visibility` | `data-breakpoint-visibility` | `Default` | `Default` / `Hide on Desktop : hide-on-desktop` / `Hide on Mobile : hide-on-mobile` / `Hide on Both (not rendered) : hide-on-both` |
| Link class | `props.classes.linkClass` | `class` | `dwce-text-link` |  |
| Styling Classes | `props.classes.stylingClasses` | `class` | *(install-local style ids)* | Shown when `!props.classes` |

### DWC Dropdown

| Prop | Path | Attribute | Default | Values / notes |
| --- | --- | --- | --- | --- |
| Text | `props.text` | style only | `Dropdown` |  |
| Link Parent Item | `props.linkParentItem` | style only | `false` | `true` / `false` |
| URL | `props.url` | `href` | `#` | Shown when `props.linkParentItem` |
| Dropdown Trigger Mode | `props.dropdownTriggerMode` | `data-toggle` | `both` | `both` / `hover` / `click` |
| Keep open | `props.inBuilder.keepOpen` | `data-keep-open` | `false` | `true` / `false` |
| Width | `props.nestedDropdown.width` | `style` | `inherit` | Shown when `!props.megaMenu.enable` |
| Equal Heights | `props.nestedDropdown.equalHeights` | `data-equal-dropdown-height` | `false` | `true` / `false`. Shown when `!props.megaMenu.enable` |
| Exclude Equal Height | `props.nestedDropdown.excludeEqualHeight` | `data-exclude-from-equal-height` | `false` | `true` / `false`. Shown when `!props.megaMenu.enable` |
| Parent Relative | `props.nestedDropdown.parentRelative` | `data-parent-relative-dropdown` | `false` | `true` / `false`. Shown when `!props.megaMenu.enable` |
| Enable | `props.megaMenu.enable` | `data-megamenu` | `false` | `true` / `false` |
| Width | `props.megaMenu.width` | `data-content-width` |  | E.g. 1200px, 100vw, var(--content-width), .class, #ID.. Shown when `props.megaMenu.enable` |
| Inner Width | `props.megaMenu.innerWidth` | `style` | `inherit` | Mega Menu Content Width. Default is 100%.. Shown when `props.megaMenu.enable` |
| Breakout | `props.megaMenu.breakout` | `data-breakout-mega` | `false` | `true` / `false`. Shown when `props.megaMenu.enable` |
| Content Alignment | `props.general.contentAlignment` | `data-content-align` | `default` | `default` / `center` / `left` / `right` |
| Visibility | `props.general.visibility` | `data-breakpoint-visibility` | `Default` | `Default` / `Hide on Desktop : hide-on-desktop` / `Hide on Mobile : hide-on-mobile` / `Hide on Both (not rendered) : hide-on-both` |
| Appearance | `props.general.appearance` | `appearance` | `default` | `Default : default` / `Button : button` / `Icon : icon` |
| No Arrow | `props.general.noArrow` | `data-no-arrow` | `false` | `true` / `false` |
| Use Custom SVG | `props.general.useCustomSvg` | style only | `false` | `true` / `false` |
| Custom SVG | `props.general.customSvg` | style only |  | Paste SVG code here. Shown when `props.general.useCustomSvg` |
| Submenu  Reveal | `props.general.submenuReveal` | `data-submenu-reveal` | `default` | `Default : default` / `Expand : expand` / `Slide : slide` |
| List item class | `props.classes.listItemClass` | `class` | `dwce-dropdown` |  |
| Styling Classes | `props.classes.stylingClasses` | `class` | *(install-local style ids)* | Shown when `!props.classes` |

### DWC Nav

| Prop | Path | Attribute | Default | Values / notes |
| --- | --- | --- | --- | --- |
| Primary Color | `props.primaryColor` | `style` | `var(--primary, crimson)` |  |
| Stripe Style | `props.animation.stripeStyle` | `data-stripe-style` | `false` | `true` / `false` |
| Adaptive Height | `props.animation.adaptiveHeight` | `data-adaptive-height` | `false` | `true` / `false` |
| - Animate Adaptive Content | `props.animation.animateAdaptiveContent` | `data-animate-adaptive-content` | `false` | `true` / `false`. Shown when `props.animation.adaptiveHeight` |
| Offcanvas Mode | `props.menuMode.offcanvasMode` | `data-offcanvas` | `false` | `true` / `false` |
| - Flyout Offcanvas | `props.menuMode.flyoutOffcanvas` | `data-flyout-offcanvas` | `false` | `true` / `false`. Shown when `props.menuMode.offcanvasMode` |
| - Flyout on Hover | `props.menuMode.flyoutOnHover` | `data-offcanvas-hover` | `false` | `true` / `false`. Shown when `props.menuMode.offcanvasMode` |
| LAST ITEM is button | `props.menuMode.lastItemIsButton` | `data-last-item-is-button` | `false` | `None : false` / `Last Button : true` / `Last 2 Buttons : true-2` / `Last 3 Buttons : true-3` |
| -- Non Button Items alignment | `props.menuMode.nonButtonItemsAlignment` | `data-last-item-is-button-alignment` | `Default` | `Default` / `Left : left` / `Center : center`. Shown when `props.menuMode.lastItemIsButton !== "false"` |
| Preview Mobile Menu | `props.mobile.previewMobileMenu` | `data-open-mobile-menu` | `false` | `true` / `false` |
| Mobile Breakpoint | `props.mobile.mobileBreakpoint` | `data-mobile-breakpoint` | `1200px` |  |
| Mobile Menu Width | `props.mobile.mobileMenuWidth` | `style` | `450px` |  |
| Mobile Menu Background | `props.mobile.mobileMenuBackground` | `style` | `var(--header-bg)` |  |
| Slide in direction | `props.mobile.slideInDirection` | `data-slide-in-direction` | `right` | `Right : right` / `Left : left` / `Top : top` / `Expand Down (from Header) : expand down` / `Bottom : bottom` / `Right Top : right top` / `Right Bottom : right bottom` |
| Submenu reveal | `props.mobile.submenuReveal` | `data-submenu-reveal` | `slide` | `Slide in : slide` / `Expand : expand` |
| Submenu Slideout Distance | `props.mobile.submenuSlideExtras.submenuSlideoutDistance` | `style` | `100%` | Controls how far the submenu slides out of view. Opacity must be set to 0 if this value is less than 100%.. Shown when `props.mobile.submenuReveal !== "expand"` |
| Submenu Slideout Opacity | `props.mobile.submenuSlideExtras.submenuSlideoutOpacity` | `style` | `1` | Set whether the submenu fades out while sliding away.. Shown when `props.mobile.submenuReveal !== "expand"` |
| Fade Items on Slide | `props.mobile.submenuSlideExtras.fadeItemsOnSlide` | `data-fade-items-on-slide` | `false` | `true` / `false`. Shown when `props.mobile.submenuReveal !== "expand"` |
| Mobile/Offcanvas Menu Speed | `props.mobile.mobileOffcanvasMenuSpeed` | `style` | `1.2` |  |
| Fullscreen Mobile Menu | `props.mobile.fullscreenMobileMenu` | `data-fullscreen-mobile-menu` | `false` | `true` / `false` |
| Mobile Top background | `props.mobile.mobileTopBackground` | `style` | `var(--header-bg)` | Topbar Background only applied when Fullscreen Mobile Menu is enabled or Transparent Mobile Top is disabled.. Shown when `props.mobile.fullscreenMobileMenu \|\| !props.mobile.transparentMobileTop` |
| Transparent Mobile Top | `props.mobile.transparentMobileTop` | `data-mobile-top-transparent` | `true` | `true` / `false`. Shown when `!props.mobile.fullscreenMobileMenu` |
| Hide Back Text | `props.mobile.hideBackText` | `data-hide-back-text` | `false` | `true` / `false` |
| Back Text Mode | `props.mobile.backTextMode` | `data-back-text-mode` | `back-to` | `Back to : back-to` / `Title : title`. Shown when `!props.mobile.hideBackText` |
| Back to Home Menu Text | `props.mobile.backToHomeMenuText` | `data-back-text` | `Main Menu` | When Back Text Mode is 'Back to', this controls the last panel back text that points to the home panel. Shown when `props.mobile.backTextMode === "back-to"` |
| Remove Menu Item Borders | `props.mobile.removeMenuItemBorders` | `data-remove-borders` | `false` | `true` / `false` |
| Dropdown Content Shadow | `props.dropdown.dropdownContentShadow` | `style` | `0px 5px 50px -10px rgb(0 0 0 / 20%)` |  |
| Dropdown Content Radius | `props.dropdown.dropdownContentRadius` | `style` | `0rem` |  |
| Blend Open dropdowns | `props.dropdown.blendOpenDropdowns` | `blend-dropdowns` | `true` | `true` / `false`. Shown when `props.dropdown.dropdownContentRadius !== "0rem"` |
| Dropdown Content Border Size | `props.dropdown.dropdownContentBorderSize` | `style` | `1px` |  |
| Dropdown Content Border Color | `props.dropdown.dropdownContentBorderColor` | `style` | `transparent` |  |
| Global Nested Dropdown Width | `props.dropdown.globalNestedDropdownWidth` | `style` | `200px` | Overridden by individual Nested Dropdown width |
| Global Mega Menu Width | `props.dropdown.globalMegaMenuWidth` | `data-global-content-width` |  | E.g. 1200px, 100vw, var(--content-width), .class, #ID. Overridden by individual Mega Menu Dropdown width |
| Global Inner Width | `props.dropdown.globalInnerWidth` | `style` | `100%` |  |
| Dropdown Vertical Alignment | `props.dropdown.dropdownVerticalAlignment` | `data-global-content-vertical` | `.dwc-nest-header` | Aligns dropdown top to the bottom of any selector |
| Dropdown Offset Gap | `props.dropdown.dropdownOffsetGap` | `style` | `0px` | Gap between dropdown and navigation |
| Nested Dropdown Offset Gap | `props.dropdown.nestedDropdownOffsetGap` | `style` | `0px` | Gap between nestable parent dropdown item and flyout content |
| Caret | `props.dropdown.caret` | `data-caret` | `false` | `true` / `false` |
| Arrow  Visibilty | `props.dropdown.arrowVisibilty` | `arrow-visibility` | `Default` | `Default` / `Hide` / `Hide on Mobile` / `Hide on Desktop` |
| DROPDOWN Trigger Mode | `props.interactionUx.dropdownTriggerMode` | `data-toggle` | `both` | `Hover or Click : both` / `Hover only : hover` / `Click only : click` |
| Nested Dropdown Active Overlay | `props.interactionUx.nestedDropdownActiveOverlay` | `nested-dropdown-active-overlay` | `true` | `true` / `false` |
| - Nested Dropdown Active Overlay Color | `props.interactionUx.nestedDropdownActiveOverlayColor` | `style` | `rgb(30 50 100 / 10%)` | Shown when `props.interactionUx.nestedDropdownActiveOverlay` |
| - Nested Dropdown Inactive Blur | `props.interactionUx.nestedDropdownInactiveBlur` | `style` | `0px` | Shown when `props.interactionUx.nestedDropdownActiveOverlay` |
| Parent-Relative Nested Dropdown | `props.interactionUx.parentRelativeNestedDropdown` | `data-parent-relative-dropdown` | `false` | `true` / `false` |
| Menu Item Hover Effect | `props.interactionUx.menuItemHoverEffect` | `data-hover-effect` | `Default` | `Default` / `Text Roll : roll` |
| Hide Nav Backdrop | `props.backdrop.hideNavBackdrop` | `data-hide-overlay` | `false` | `true` / `false` |
| Nav Backdrop Blur | `props.backdrop.navBackdropBlur` | `style` | `0px` | Shown when `!props.backdrop.hideNavBackdrop` |
| Nav Backdrop Background Color | `props.backdrop.navBackdropBackgroundColor` | `style` | `rgba(0 0 0 /  30%)` | Shown when `!props.backdrop.hideNavBackdrop` |
| Mobile Logo Size | `props.logo.mobileLogoSize` | `style` | `60px` |  |
| Hide Mobile Logo (in fullscreen mode) | `props.logo.hideMobileLogoInFullscreenMode` | `data-hide-mobile-logo` | `false` | `true` / `false` |
| Centered Logo | `props.logo.centeredLogo` | `data-centered-logo` | `false` | `true` / `false` |
| Center Guide | `props.logo.centerGuide` | `data-center-guide` | `true` | `true` / `false`. Shown when `props.logo.centeredLogo` |
| Dropdown Buffer Height | `props.buffer.dropdownBufferHeight` | `style` | `inherit` |  |
| Nested Dropdown Buffer Width | `props.buffer.nestedDropdownBufferWidth` | `style` | `50px` |  |
| Preview Buffer Zone | `props.buffer.previewBufferZone` | `preview-buffer` | `false` | `true` / `false` |
| Styling Classes | `props.classes.stylingClasses` | `class` | *(install-local style ids)* | Shown when `!props.classes` |

### DWC Mobile Toggle

| Prop | Path | Attribute | Default | Values / notes |
| --- | --- | --- | --- | --- |
| Pill Toggle Size | `props.appearance.pillToggleSize` | `style` | `16px` | Shown when `props.appearance.pillShape && props.appearance.hamburgerIcon === "Default"` |
| Size | `props.appearance.size` | `style` | `2.1875rem` | When Toggle Style is set to 'Pill', toggle size will be controlled by 'Pill Toggle Size' . Property: --toggle-size. Shown when `props.appearance.pillShape && props.appearance.hamburgerIcon !== "Default" \|\| (!props.appearance.pillShape)` |
| Color | `props.appearance.color` | `style` | `var(--black, #000)` | --toggle-color |
| Hover Color | `props.appearance.hoverColor` | `style` | `var(--primary, crimson)` | --toggle-hover-color |
| Flip  | `props.appearance.flip` | `data-flip-toggle` | `false` | `true` / `false` |
| Hamburger Icon | `props.appearance.hamburgerIcon` | `data-icon` | `Default` | `Default` / `two-line-squeeze` / `two-line-spin` / `two-line-collapse` / `three-line-spin` / `three-line-collapse` / `three-line-arrow` |
| Toggle Style | `props.appearance.toggleStyle` | `data-toggle-style` | `Default` | `Default` / `Techno : techno`. Shown when `props.appearance.hamburgerIcon === "Default"` |
| Pill Shape | `props.appearance.pillShape` | `data-pill` | `false` | `true` / `false` |
| Pill Border | `props.appearance.pillBorder` | `style` | `solid rgb(0 0 0 / 21%) 1px` | Shown when `props.appearance.pillShape` |
| Pill Background Color | `props.appearance.pillBackgroundColor` | `style` | `rgb(236 236 236)` | Shown when `props.appearance.pillShape` |
| Pill Padding | `props.appearance.pillPadding` | `style` | `0.6rem 0.75rem` | Shown when `props.appearance.pillShape` |
| Pill Radius | `props.appearance.pillRadius` | `style` | `50vw` | Shown when `props.appearance.pillShape` |
| Pill Aspect Ratio | `props.appearance.pillAspectRatio` | `style` | `initial` | Shown when `props.appearance.pillShape` |
| Equalize | `props.appearance.equalize` | `data-equalize` | `false` | `true` / `false`. Shown when `props.appearance.toggleStyle !== "techno"` |
| Always Visible | `props.appearance.alwaysVisible` | `data-always-visible` | `false` | `true` / `false` |
| Enable | `props.label.enable` | style only | `false` | `true` / `false` |
| Text | `props.label.text` | `data-label` | `Open/Close` | `Open/Close` / `Menu`. Shown when `props.label.enable` |
| Open Text | `props.label.openText` | style only | `Menu` | Shown when `props.label.enable` |
| Close Text | `props.label.closeText` | `data-close-text` | `Close` | Shown when `props.label.text !== "Menu"` |
| Font Size | `props.label.fontSize` | `style` | `1rem` | Shown when `props.label.enable` |
| Color | `props.label.color` | `style` | `#000` | Shown when `props.label.enable` |
| Gap | `props.label.gap` | `style` | `0.5rem` | Shown when `props.label.enable` |
| Target Selector | `props.targetSelector` | `data-target-selector` |  | Adds the class .dwc-open to the specified selector. Useful for triggering custom elements. |
| Aria Label | `props.ariaLabel` | `aria-label` | `Open Menu` |  |
| Class | `props.class` | `class` | `dwce-toggle` |  |
| Styling Class | `props.stylingClass` | `class` | *(install-local style ids)* | Shown when `!props.stylingClass` |

### DWC Header

| Prop | Path | Attribute | Default | Values / notes |
| --- | --- | --- | --- | --- |
| Dark Background Preview | `props.darkBackgroundPreview` | `dark-body-bg` | `false` | `true` / `false` |
| Header Background Color | `props.headerBackgroundColor` | `style` | `var(--white, #fff)` | Property: --header-bg |
| Header Blur | `props.headerBlur` | `style` | `10px` |  |
| Sticky Header | `props.sticky.stickyHeader` | `data-sticky-header` | `false` | `true` / `false` |
| Scroll Down Visibility | `props.sticky.scrollDownVisibility` | `data-sticky-visibility` | `Default` | `Default` / `Hide Row 1 : hide-row-1` / `Hide Row 2 : hide-row-2` / `Hide Row 3 : hide-row-3` / `Show only Row 1 : show-row-1` / `Show only Row 2 : show-row-2` / `Show only Row 3 : show-row-3` / `Hide All Rows : hide-all-rows`. Shown when `props.sticky.stickyHeader` |
| Scroll Up Visibility | `props.sticky.scrollUpVisibility` | `data-headroom-visibility` | `Default` | `Default` / `Reverse : reverse` / `Show Row 1 : show-row-1` / `Show Row 2 : show-row-2` / `Show Row 3 : show-row-3`. Shown when `props.sticky.stickyHeader` |
| Scroll Visibility Distance | `props.sticky.scrollVisibilityDistance` | `data-scroll-visibility-distance` | `200px` | Shown when `props.sticky.stickyHeader` |
| Special Sticky/Overlay Styles | `props.sticky.specialStickyOverlayStyles` | `data-sticky-overlay-special-style` | `false` | `true` / `false`. Shown when `props.sticky.stickyHeader` |
| Sticky Header Background | `props.sticky.stickyHeaderBackground` | `style` | `var(--header-bg)` | Background color after scrolling. Property: --header-bg-sticky. Shown when `props.sticky.stickyHeader` |
| Scroll Margin | `props.sticky.scrollMargin` | `style` | `var(--dwc-header-div-height)` | Shown when `props.sticky.stickyHeader` |
| Overlay Header | `props.overlay.overlayHeader` | `data-overlay-header` | `false` | `true` / `false` |
| Overlay Header Mobile | `props.overlay.overlayHeaderMobile` | `data-overlay-header-mobile` | `false` | `true` / `false` |
| Overlay Header Width | `props.overlay.overlayHeaderWidth` | `style` | `100%` | Shown when `props.overlay.overlayHeader` |
| Overlay Header Background | `props.overlay.overlayHeaderBackground` | `style` | `var(--header-bg)` | For transparent overlay header, set background to transparent value. Property: --overlay-header-bg. Shown when `props.overlay.overlayHeader \|\| props.overlay.overlayHeaderMobile` |
| Overlay Header Active Background | `props.overlay.overlayHeaderActiveBackground` | `style` | `var(--header-bg)` | Overlay header background when hovering on menu item. Property: --overlay-header-bg-active. Shown when `props.overlay.overlayHeader \|\| props.overlay.overlayHeaderMobile` |
| Overlay Header Radius | `props.overlay.overlayHeaderRadius` | `style` | `0px` | Shown when `props.overlay.overlayHeader \|\| props.overlay.overlayHeaderMobile` |
| Overlay Header Inset Inline | `props.overlay.overlayHeaderInsetInline` | `style` | `0px` | Use `var(--gutter)` unless you're using a full width header. Non ACSS users should use their section's inline padding value instead.. Shown when `props.overlay.overlayHeader \|\| props.overlay.overlayHeaderMobile` |
| Overlay Header Inset Block | `props.overlay.overlayHeaderInsetBlock` | `style` | `0px` | Shown when `props.overlay.overlayHeader \|\| props.overlay.overlayHeaderMobile` |
| Remove Top Radius | `props.overlay.removeTopRadius` | `data-overlay-header-no-top-radius` | `false` | `true` / `false`. Shown when `props.overlay.overlayHeader \|\| props.overlay.overlayHeaderMobile` |
| Overlay Header Shadow | `props.overlay.overlayHeaderShadow` | `style` | `0px 2px 20px rgb(0 0 0 / 20%)` | Shown when `props.overlay.overlayHeader \|\| props.overlay.overlayHeaderMobile` |
| Offset Section Padding | `props.overlay.offsetSectionPadding` | `data-offset-section-padding` | `false` | `true` / `false`. Shown when `props.overlay.overlayHeader \|\| props.overlay.overlayHeaderMobile` |
| Section Offset Padding Value | `props.overlay.sectionOffsetPaddingValue` | `style` | `clamp(10.3125rem, 11.1277rem + -2.7174vw, 8.75rem)` | Shown when `props.overlay.offsetSectionPadding` |
| Styling Classes | `props.classes.stylingClasses` | `class` | *(install-local style ids)* | Shown when `!props.classes` |
| Skip Link | `props.accessibilty.skipLink` | style only | `true` | `Enable : true` / `Disable : false` |
| Custom Skip Link Parameter | `props.accessibilty.customSkipLinkParameter` | `data-skip-link` | `main | Skip to Content` | You can type in a custom parameter to generate skip links. Multiple parameter separate by commas. Formats: #main \| Skip to content, #footer \| Skip to footer. If the target does not have an ID, use selector format: main \| Skip to content. Shown when `props.accessibilty.skipLink === "true"` |
| MMPro AI Assistant | `props.mmProAiAssistant` | `data-mmpro-assist` | `true` | `true` / `false` |
| Enable | `props.liquidGlass.enable` | `data-liquid-glass` | `false` | `true` / `false` |
| Distortion | `props.liquidGlass.distortion` | style only | `50` | Default: 50 \| Range: 20–80 \| Controls warp strength. Higher = more distortion like thick glass, lower = subtle.. Shown when `props.liquidGlass.enable` |
| Surface Depth | `props.liquidGlass.surfaceDepth` | `scale` | `5` | Default: 5 \| Range: 1–10 \| Creates color fringing (chromatic aberration). Higher = more rainbow separation at edges.. Shown when `props.liquidGlass.enable` |
| Shininess | `props.liquidGlass.shininess` | `stdDeviation` | `7` | Default: 7 \| Range: 0–7 \| Controls reflection sharpness. Lower = crisper reflections, higher = softer, frosted glass, blurry.. Shown when `props.liquidGlass.enable` |
| Saturate | `props.liquidGlass.saturate` | `style` | `1.4` | Default: 1.4. 0: Completely desaturates the background (grayscale). 1: Leaves the background unchanged with its original saturation. Above 1: Super-saturates the background, making colors much more vibrant. Shown when `props.liquidGlass.enable` |
| Border | `props.liquidGlass.border` | `style` | `1px solid rgba(255, 255, 255, 0.3)` | Shown when `props.liquidGlass.enable` |
| Box Shadow | `props.liquidGlass.boxShadow` | `style` | `var(--liquid-glass-shadow)` | Shadow is set in the .dwc-header-vars variables on DWC Header Component. Overrides overlay header shadow.. Shown when `props.liquidGlass.enable` |

<!-- GENERATED:PROPS end -->

> **Prose and examples:** for exhaustive descriptions, slot documentation and per-component examples,
> read this repo's `components/` folder (`../../components/dwc-header.md`, `dwc-nav.md`,
> `dwc-dropdown.md`, `dwc-menu-item.md`, `dwc-mobile-toggle.md`, relative to this file), or the
> online docs at <https://design-with-cracka.gitbook.io/megamenupro>. Those pages document the
> **settings panel**, so use them for what a setting means and this table for what to set.

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
