# Changelog

> Update Mega Menu Pro + Header Builder using the [Updater](updating.md).

## Version 1.1.1 - June 23, 2026

- Improved reported issue with buffer zone.
- See Version 1.1 for the complete changelog.

---

## Version 1.1 - June 23, 2026

*Update path from v1.0.9: CSS & Component*

### New

- Added an option to set the scroll margin-top value when the sticky header is enabled (DWC Nav Props).
- Added an option to enable a dark body background in Builder Preview only, useful when menu items use light or white colors (DWC Header Props).
- Added an option to open menu links in a new tab (DWC Menu Item Props).
- Added an option to hide dropdown arrows.
- Added a new Hamburger Icon option, with an additional hamburger icon style to choose from.
- Added new mobile menu items fade-in style (DWC Nav > Mobile Menu props).

### Fixes

- Fixed an issue where enabling Adaptive Height could create unwanted whitespace above the header (regression introduced in the previous update).
- Fixed Google PageSpeed accessibility warnings caused by an incorrect ARIA role on menu links.
- Fixed an issue where stylesheet CSS wasn't applied to non-Etch themes.

### Improvements

- Stripe Style and Adaptive Height now support nested dropdowns.
- Stripe Style and Adaptive Height are now disabled inside the Builder to improve performance.
- Improved RTL compatibility.
- Fixed an issue where longer Mobile Toggle open/close labels could overflow their container.
- Improved focus styles for keyboard navigation.
- General refinements.
- Improved input field for skip link parameters.

---

## Version 1.0.9 - June 6, 2026

*Update path from v1.0.8: CSS & Component*

### New

- Added Skip Links with advanced parameters, including the ability to automatically generate multiple skip links from a single attribute value.

### Fixes

- Exclude Current Link styling now works as expected.
- Link Hover Effect: Roll no longer breaks menu item styling.
- Offcanvas and mobile menus now correctly receive focus when opened via keyboard navigation.

### Improvements

- Further improvements to Overlay and Sticky Special Styles.
- Improved page exclusion handling for Overlay and Sticky Headers.

---

## Version 1.0.8 - May 30, 2026

*Update path from v1.0.7: CSS & Component*

- Fixed dropdown overflow on smaller desktop screens.
- Refined options for Mobile Toggle.
- Improved dropdown positioning.

---

## Version 1.0.7 - May 29, 2026

*Update path from v1.0.6: CSS & Component*

- Added more options for Mobile Toggle.
- Added the ability to add custom SVGs to dropdown items.
- Fixed FOUC on the header when transitioning from the mobile breakpoint.
- Improved break-in container behavior (see docs).

---

## Version 1.0.6 - May 27, 2026

- Fixed a regression introduced in the previous update.

*Update path from v1.0.5: CSS only*

---

## Version 1.0.5 - May 27, 2026

- Fixed mobile header hidden when the mobile breakpoint is above 1200px.
- Fixed back text styles not applying.
- General refinements.

---

## Version 1.0.4 - May 25, 2026

- Fixed Mobile Trigger animation not working (regression from previous update).
- General refinements.

---

## Version 1.0.3 - May 21, 2026

### Improvements

- Improved section offset padding.
- Special Sticky/Overlay Styles are now active (no longer WIP).
- Added more options for the Toggle component.

### Fixes

- Nested Dropdown now opens when the sticky header is active and the page is scrolled down.
- Nav CTA buttons no longer have borders.
- Hover styles now override active styles.

---

## Version 1.0.2 - April 30, 2026

### Improvements

- Added more descriptions for component settings.
- Overlay Header is disabled by default.
- General refinement.

---

## Version 1.0.1 - April 30, 2026

- Minor bug fixes.

---

## Version 1.0 - April 29, 2026

- Initial release.
