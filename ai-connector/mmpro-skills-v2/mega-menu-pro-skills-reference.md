---
icon: books
---

# AI Skills Reference — Lookup Companion (v2 candidate)

Lookup-only companion to `mega-menu-pro-skills.md` in this folder. **Never read in full.** Grep
into the one section a task needs, using the Method Index or the Task Index in the core file.

This file holds **procedures and recipes**: how to carry out a specific operation, and reference
tables you consult for one value. It deliberately holds no *maps* — nothing that tells you which
prop controls which behaviour, or how two features interact. That knowledge lives in the core file,
because not having it does not make an agent do the wrong thing, it makes an agent go hunting, and
hunting through product CSS costs more than reading the core ever did.

## 4. Prop reference

Every settable prop on all five components. Generated from the Etch component export, so it matches
the components the plugin ships. Do not hand-edit the generated block.

**Reading the tables**

* **Path** is what you set, always fully flattened, e.g. `props.general.appearance`.
* **Panel section headings are not path segments.** Etch's settings panel groups fields visually and
  that grouping is not the API shape. Inside DWC Dropdown's single "General" panel section, **Text**
  is `props.text` while **Appearance** is `props.general.appearance`. Nothing on screen
  distinguishes them. Take the path from this table, never from a heading in `components/`.
* **Paths are unique within a component, not across them.** Resolve a path against the component you
  are setting it on. `dropdownTriggerMode` is top-level on DWC Dropdown and
  `interactionUx.dropdownTriggerMode` on DWC Nav.
* **Attribute** is the `data-*` the prop writes onto the element. That attribute is what the engine
  actually reads, so it is ground truth when a prop and the rendered DOM disagree. `style only`
  means the prop drives CSS or markup and writes no attribute.
* **Default** is the component's own default. **Never set a prop to its default value.**
* **Values** shows select options as `Label : stored-value` where the two differ. **Store the
  right-hand side.** `Expand Down (from Header) : expand down` stores `expand down`. Where there
  is no ` : `, the stored value equals the label.
* **Shown when** records the panel condition. It affects only whether Etch displays the field; the
  value path is unaffected.
* **No component IDs appear here, deliberately.** They are install-local. Always resolve by name.

<!-- GENERATED:PROPS start -->

*Generated from Mega Menu Pro **1.2.1**. Paths, defaults and select values are properties of
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
| DWC Mobile Toggle | `26:1gjl9z9` |
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
| Hamburger Icon | `props.appearance.hamburgerIcon` | `data-icon` | `Default` | `Default` / ` two-line-squeeze` / `two-line-spin` / `two-line-collapse` / `three-line-spin` / `three-line-collapse` / `three-line-arrow` |
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

***

## 2a. Renaming, theming and cloning existing panels

Task-specific procedures. The build-from-scratch workflow is in Section 2 of the core file; these are the rarer operations.

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

The `removeClass`/`addClass` + custom-stylesheet workaround in the section below is only needed **after `duplicate()`**, where blocks share style entry IDs with the source and renaming those entries would affect both.

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

**Step 3 — Work around the styles\[] gap using a custom stylesheet:** Because `addClass` does not update `styles[]`, the new style entries' CSS will not be output by PHP on the frontend. The workaround: put ALL the new template's CSS in that custom stylesheet instead of relying on per-block style entries. A custom stylesheet is always output and applies by CSS selector regardless of `styles[]`.

```js
// No custom stylesheet exists by default — create it once, then reuse (Section 1).
const NAME = 'MMPro Custom';
const sheetId = etch.stylesheets.list().find(s => s.name === NAME)?.id
  ?? await etch.stylesheets.createAsync({ name: NAME, css: '/* MMPro custom CSS */' });
await etch.stylesheets.appendAsync(sheetId, '.mega-menu-revo__nav-group { ... }');
```

**Step 4 — Walk the tree by structural position, not by cached block IDs.** Block IDs change on every page reload. Always rediscover by walking `etch.blocks.getTree()` and matching by position or text attribute within the same script execution.

***

***

## 3b. Script recipes

Reached from the Method Index. Each assumes the core helpers from the core file are already pasted in.

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

### Append to a custom stylesheet

```js
const css = `
/* My rule */
#dwc-header {
  border-bottom: var(--header-bottom-border);
}
`;
// No custom stylesheet exists by default — create it once, then reuse (Section 1).
const NAME = 'MMPro Custom';
const sheetId = etch.stylesheets.list().find(s => s.name === NAME)?.id
  ?? await etch.stylesheets.createAsync({ name: NAME, css: '/* MMPro custom CSS */' });
// Stylesheets persist immediately — no saveAsync needed
await etch.stylesheets.appendAsync(sheetId, css);
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

***

## 9. Appendix A — authoring payloads and verification patterns

Node shapes, the minimal-test and build-one-verify-scale patterns, and connector error parsing.

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
   matches. Then check it on the published page too — see "Visual verification".
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
