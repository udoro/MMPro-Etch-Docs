# JavaScript API

The script exposes two globals: `window.dwcMegaMenu` (the live instance) and `window.DwcConfig` (configuration). Advanced users can call instance methods to control the menu programmatically, watch CSS class changes to react to menu state, and listen to the custom events the script dispatches.

> **Important:** `window.DwcConfig` must be defined *before* the mega menu script loads. Methods on `window.dwcMegaMenu` are available after `DOMContentLoaded`.

---

## Global Configuration

### `window.DwcConfig.MegaMenu`

Define this object before the script loads to override any default:

```js
window.DwcConfig = window.DwcConfig || {};
window.DwcConfig.MegaMenu = {
  minWidth: 1025,
  closeNavOnClick: 1,
  // ... other overrides
};
```

| Key | Type | Default | Description |
|---|---|---|---|
| `minWidth` | `number` | `1201` | Viewport width (px) at which desktop mode begins. Below this value is mobile. |
| `headerSelector` | `string` | `'#dwc-header'` | CSS selector for the header element. |
| `nestMenuSelector` | `string` | `'.dwc-nest-menu'` | CSS selector for the nav wrapper. |
| `menuAutoExpansion` | `boolean` | `true` | Auto-expand the first level on mobile open. |
| `swipeToClose` | `boolean` | `true` | Enable swipe-left gesture to close mobile menu. |
| `toolTip` | `boolean` | `true` | Show drill-down tooltips on mobile. |
| `adaptiveHeight` | `0\|1` | `0` | Animate dropdown height when content changes. |
| `stripeStyle` | `0\|1` | `0` | Apply stripe styling across header rows. |
| `toggleLabelWidth` | `0\|1` | `1` | Equalise open/close toggle label widths to prevent layout shift. |
| `closeNavOnClick` | `0\|1` | `1` | Close the menu when a nav link is clicked. |
| `closeOnHashClickOnly` | `0\|1` | `0` | Only close the menu when a hash (`#`) link is clicked. |
| `closeOnMobileOnly` | `0\|1` | `0` | Restrict click-to-close behaviour to mobile viewports. |
| `closeNavOnClickExclude` | `string` | `'.js-wpml-ls-item-toggle'` | Selector for links that should not trigger close-on-click. |
| `breakinToNavList` | `0\|1` | `0` | Place `data-breakin` items inside the nav `<ul>` instead of the nav wrapper. |
| `shiftFactor` | `number` | `1.05` | Multiplier used when shifting dropdowns to avoid viewport overflow. |
| `minOverflow` | `number` | `20` | Minimum pixel overflow before a dropdown is repositioned. |
| `viewportGutter` | `number` | `25` | Minimum gap (px) between a dropdown edge and the viewport edge. |
| `reinitializeOnURLchange` | `boolean` | `false` | Re-initialise automatically on SPA URL changes via the History API. |
| `overlayInsideHeader` | `0\|1` | `0` | Render the dropdown overlay inside the header element instead of `<body>`. |
| `resetNavOnBreakpoint` | `boolean` | `true` | Reset open/active states when crossing the desktop/mobile breakpoint. |
| `backButtonStyle` | `'title'\|'back-to'` | `'back-to'` | Mobile drill-down back button label. `'title'` shows the parent name; `'back-to'` shows "Back to [Parent]". |
| `propagateVariables` | `array` | *(see source)* | CSS variables to copy from scoped elements to `:root`. Useful for elements outside the nav that need nav-scoped variables. |

### `window.DwcConfig.CenteredLogo`

| Key | Type | Default | Description |
|---|---|---|---|
| `enable` | `0\|1` | `0` | Enable the centered logo feature. |
| `centerGuide` | `0\|1` | `1` | Show a visual center guide line (visible to logged-in admins only). |
| `forceCenteredLogo` | `0\|1` | `1` | Compensate margins to achieve pixel-perfect centering. |
| `centerNudge` | `number` | `0` | Nudge the logo left (negative) or right (positive) by this many pixels. |
| `allowOddItems` | `0\|1` | `1` | Allow centering when the menu has an odd number of items. |
| `roundOffFactor` | `'before'\|'after'` | `'after'` | For odd item counts, place the extra item before or after the logo. |

---

## Public Instance Methods

All methods are on the `window.dwcMegaMenu` singleton.

### Lifecycle

#### `reinitialize()`
Tears down event listeners and re-runs setup without a page reload. Use this after dynamically injecting or removing nav elements.

```js
// After injecting new nav items via JS
document.querySelector('.dwc-nest-menu ul').appendChild(newItem);
window.dwcMegaMenu.reinitialize();
```

#### `destroy()`
Removes all event listeners and observers. Use this before replacing the instance with a new configuration.

```js
window.dwcMegaMenu.destroy();

window.DwcConfig.MegaMenu.minWidth = 1025;

window.dwcMegaMenu = new window.DWCMegaMenuPro().initialize();
```

---

### Viewport Detection

These return `boolean` and can be called at any time.

| Method | Returns `true` when… |
|---|---|
| `isDesktop()` | Viewport ≥ `minWidth` |
| `isMobile()` | Viewport < `minWidth` |
| `isEffectiveDesktop()` | Desktop viewport AND offcanvas mode is not active |
| `isEffectiveMobile()` | Mobile viewport OR offcanvas mode is active |
| `isRTL()` | `<html dir="rtl">` is set |

```js
if (window.dwcMegaMenu.isEffectiveMobile()) {
  // Runs on mobile AND when offcanvas mode forces mobile behaviour on desktop
}

if (window.dwcMegaMenu.isRTL()) {
  // Flip custom icons, adjust third-party tooltips, etc.
}
```

---

### Dropdown Control

The `dropdown` argument is the nav `<li>` element that wraps both the toggle and its dropdown panel (i.e. a `<li>` inside `.dwc-nest-menu`).

#### `openDropdown(dropdown, manual?)`

```js
const item = document.querySelector('.dwc-nest-menu > ul > li:first-child');
window.dwcMegaMenu.openDropdown(item);
```

Pass `true` as the second argument to flag the open as a manual/programmatic trigger (bypasses hover-intent logic).

#### `closeDropdown(dropdown)`

```js
window.dwcMegaMenu.closeDropdown(item);
```

#### `toggleDropdown(dropdown, manual?)`

```js
// Wire a custom button to toggle a specific nav item
document.querySelector('#my-trigger').addEventListener('click', () => {
  const item = document.querySelector('[data-menu-id="products"]');
  window.dwcMegaMenu.toggleDropdown(item);
});
```

#### `closeAllDropdowns()`

```js
// Close everything — useful when opening a custom overlay or modal
document.querySelector('#open-modal-btn').addEventListener('click', () => {
  window.dwcMegaMenu.closeAllDropdowns();
  openMyModal();
});
```

---

### Mobile Menu Control

#### `openMobileMenu()` / `closeMobileMenu()` / `toggleMobileMenu()`

```js
// Custom hamburger button outside the nav
document.querySelector('#custom-hamburger').addEventListener('click', () => {
  window.dwcMegaMenu.toggleMobileMenu();
});
```

#### `isMobileMenuOpen()`

```js
if (window.dwcMegaMenu.isMobileMenuOpen()) {
  console.log('Mobile menu is currently open');
}
```

---

### Layout

#### `recalculatePositions()`
Forces all open dropdowns to recalculate their position. Useful after layout shifts caused by banners, cookie bars, or dynamic content.

```js
// After a cookie banner dismissal changes the page layout
document.querySelector('#cookie-bar .accept').addEventListener('click', () => {
  cookieBar.remove();
  window.dwcMegaMenu.recalculatePositions();
});
```

#### `updateDropdownPosition(contentEl)`
Recalculates position for a single dropdown panel. `contentEl` is the dropdown content container (`.dwce-dropdown__content` or similar), not the `<li>`.

```js
const panel = document.querySelector('.dwce-dropdown__content');
window.dwcMegaMenu.updateDropdownPosition(panel);
```

---

## Custom Events

These events are dispatched on `document` by the script itself. Listen to them to react to menu-level changes.

| Event | `detail` payload | When fired |
|---|---|---|
| `dwc:rtlchange` | `{ isRTL: boolean }` | `<html dir>` attribute changes |
| `dwc:resize` | *(none)* | Window resize fires |
| `dwc:navigate` | *(none)* | SPA URL change detected (also *listened* for — see [SPA Integration](#spa--third-party-integrations)) |

### Listening examples

```js
// React to RTL direction toggle (e.g. language switcher changes dir)
document.addEventListener('dwc:rtlchange', (e) => {
  document.querySelector('#my-icon').style.transform = e.detail.isRTL
    ? 'scaleX(-1)'
    : 'scaleX(1)';
});

// Debounce your own logic on resize
document.addEventListener('dwc:resize', () => {
  clearTimeout(myResizeTimer);
  myResizeTimer = setTimeout(() => {
    console.log('Menu resize fired — recalculate my layout');
  }, 150);
});
```

---

## CSS State Classes

No custom events are dispatched for dropdown open/close. The menu communicates state exclusively through CSS classes. Use a `MutationObserver` or CSS to react to these.

### Body classes

| Class | Present when… |
|---|---|
| `dwc-mobile` | Viewport is in mobile range |
| `dwc-offcanvas-active` | Offcanvas sidebar mode is active |
| `show-nav` | Mobile/offcanvas menu panel is open |
| `no-scroll` | Body scroll is locked (mobile menu open) |
| `desktop-centered` | Centered logo desktop layout is active |

### Element classes

| Class | Element | Present when… |
|---|---|---|
| `dwc-open` | `.dwc-nest-menu` | Mobile menu is open |
| `open` | Nav `<li>` | Dropdown is currently open/visible |
| `active` | Nav `<li>` | Dropdown is active/expanded |
| `dwc-closing` | Nav `<li>` or menu | Closing animation is in progress |
| `is-active` | Toggle `<button>` | Toggle button is in active state |
| `is-breakout` | `<li>` | Item has been relocated via `data-breakout` |

---

### Reacting to dropdown open/close

Watch for the `open` class on `<li>` elements inside the nav:

```js
const nav = document.querySelector('.dwc-nest-menu');

const observer = new MutationObserver(() => {
  const openItems = nav.querySelectorAll('li.open');

  if (openItems.length > 0) {
    console.log('Dropdown opened:', openItems[0]);
    // e.g. fire analytics, lazy-load panel content, pause a video
  } else {
    console.log('All dropdowns closed');
  }
});

observer.observe(nav, {
  subtree: true,
  attributes: true,
  attributeFilter: ['class']
});
```

React to a specific dropdown only:

```js
const productsItem = document.querySelector('#menu-item-products');

new MutationObserver(() => {
  if (productsItem.classList.contains('open')) {
    console.log('Products dropdown opened — load product thumbnails');
    lazyLoadProductImages();
  }
}).observe(productsItem, { attributes: true, attributeFilter: ['class'] });
```

---

### Reacting to mobile menu open/close

```js
new MutationObserver(() => {
  const isOpen = document.body.classList.contains('show-nav');
  document.querySelector('#my-overlay').hidden = !isOpen;
}).observe(document.body, {
  attributes: true,
  attributeFilter: ['class']
});
```

Watch for the closing animation to fully complete before acting:

```js
const nestMenu = document.querySelector('.dwc-nest-menu');

new MutationObserver(() => {
  const isOpen  = nestMenu.classList.contains('dwc-open');
  const closing = nestMenu.classList.contains('dwc-closing');

  if (!isOpen && !closing) {
    console.log('Menu fully closed (animation done)');
  }
}).observe(nestMenu, { attributes: true, attributeFilter: ['class'] });
```

---

### Reacting to viewport mode changes

```js
new MutationObserver(() => {
  if (document.body.classList.contains('dwc-mobile')) {
    console.log('Switched to mobile layout');
  } else {
    console.log('Switched to desktop layout');
  }
}).observe(document.body, {
  attributes: true,
  attributeFilter: ['class']
});
```

---

### Reacting to offcanvas mode activating

```js
new MutationObserver(() => {
  const active = document.body.classList.contains('dwc-offcanvas-active');
  console.log('Offcanvas mode:', active ? 'ON' : 'OFF');
}).observe(document.body, {
  attributes: true,
  attributeFilter: ['class']
});
```

---

### Close all dropdowns when a modal or overlay opens

```js
document.querySelector('#open-modal').addEventListener('click', () => {
  window.dwcMegaMenu.closeAllDropdowns();
  window.dwcMegaMenu.closeMobileMenu();
  openMyModal();
});
```

---

### Pause / resume a video when a mega menu panel opens

```js
const nav = document.querySelector('.dwc-nest-menu');

new MutationObserver(() => {
  const anyOpen = !!nav.querySelector('li.open');
  const video = document.querySelector('#hero-video');

  if (anyOpen) {
    video.pause();
  } else {
    video.play();
  }
}).observe(nav, { subtree: true, attributes: true, attributeFilter: ['class'] });
```

---

### Run code once a specific dropdown finishes closing

```js
const item = document.querySelector('#menu-item-services');

new MutationObserver(() => {
  // dwc-closing is added during exit animation, removed when done
  if (!item.classList.contains('open') && !item.classList.contains('dwc-closing')) {
    console.log('Services dropdown fully closed');
  }
}).observe(item, { attributes: true, attributeFilter: ['class'] });
```

---

### Track which dropdown is open for analytics

```js
const nav = document.querySelector('.dwc-nest-menu');
let lastOpenLabel = null;

new MutationObserver(() => {
  const openItem = nav.querySelector('li.open');
  const label = openItem?.querySelector('a, button')?.textContent?.trim() ?? null;

  if (label && label !== lastOpenLabel) {
    lastOpenLabel = label;
    console.log('Analytics: dropdown opened —', label);
    // myAnalytics.track('mega_menu_open', { label });
  }

  if (!openItem) lastOpenLabel = null;
}).observe(nav, { subtree: true, attributes: true, attributeFilter: ['class'] });
```

---

## Data Attributes

These attributes are read from HTML elements at runtime. Place them directly on the relevant component in Etch Builder via the **Custom Attributes** field, or in raw HTML.

### Breakpoint & Mode

| Attribute | Element | Value | Description |
|---|---|---|---|
| `data-mobile-breakpoint` | DWC Nav | `number` e.g. `1024` | Override the global `minWidth` for this nav. Desktop starts at value + 1. |
| `data-offcanvas` | DWC Nav | `"true"` | Enable offcanvas/sidebar mode. |
| `data-offcanvas-hover` | DWC Nav | `"true"` | Enable hover interaction in offcanvas mode (desktop only). |

### Dropdown Behaviour

| Attribute | Element | Value | Description |
|---|---|---|---|
| `data-megamenu` | DWC Dropdown | `"true"` | Mark this dropdown as a mega menu panel (instead of a standard dropdown). |
| `data-content-width` | DWC Dropdown | `"500px"` | Override the width of this dropdown's content panel. |
| `data-dropdown-width` | DWC Dropdown | `"300px"` | Override the width of a standard dropdown. |
| `data-content-align` | DWC Dropdown | `"left"` \| `"right"` \| `"center"` | Horizontal alignment of the dropdown panel. |
| `data-content-reference` | DWC Dropdown | CSS selector | Element to use as the positioning reference instead of the nav item. |
| `data-global-content-width` | DWC Nav | CSS selector | Constraining element for all dropdown widths in this nav. |
| `data-global-content-vertical` | DWC Nav | `"top"` \| `"bottom"` | Vertical positioning reference for all dropdowns. |
| `data-equal-dropdown-height` | DWC Nav | `"true"` | Equalise the heights of all sibling dropdowns. |
| `data-toggle` | DWC Dropdown | `"click"` \| `"hover"` \| `"both"` | Override the interaction mode for this specific dropdown. |

### Mobile Drill-Down

| Attribute | Element | Value | Description |
|---|---|---|---|
| `data-back-text` | DWC Dropdown | `"Go back"` | Custom label for the back button in this drill-down level. |
| `data-target-selector` | DWC Dropdown | CSS selector | Custom target element for drill-down toggle (advanced layout overrides). |
| `data-open-new-tab` | DWC Nav or `<a>` | `"true"` \| `"false"` | Force all nav links to open in a new tab. Set `"false"` to reverse. |

### Responsive Relocation

These move elements between DOM positions at specific breakpoints.

| Attribute | Element | Value | Description |
|---|---|---|---|
| `data-breakout` | `<li>` or element | *(present)* or `"1024"` | Remove from nav and place it outside at mobile. Optionally scope to a max breakpoint. |
| `data-breakin` | `<li>` or element | *(present)* or `"768"` | Move a mobile-only element into the nav header at desktop. Optionally scope to a min breakpoint. |
| `data-breakinto` | `<li>` or element | `"selector"` or `"selector\|768"` | Move element into a target container, optionally at a breakpoint. |

### Logo & Header Rows

| Attribute | Element | Value | Description |
|---|---|---|---|
| `data-centered-logo` | DWC Nav | `"true"` | Enable centered logo layout for this nav. |
| `data-center-guide` | DWC Nav | `"true"` | Show the visual center guide line (admin only). |
| `data-header-row` | Nav `<li>` | `"1"` \| `"2"` \| `"3"` | Assign this item to a specific header row (used with stripe style and centered logo). |

### Accessibility & Skip Links

| Attribute | Element | Value | Description |
|---|---|---|---|
| `data-skip-link` | DWC Nav or wrapper | `"#content"` | Add a skip link to the given target. |
| `data-skip-link` | DWC Nav or wrapper | `"#content \| Skip to main content"` | Skip link with custom label. |
| `data-skip-link` | DWC Nav or wrapper | `"#content \| Label, #footer \| Footer"` | Multiple skip links, comma-separated. |
| `data-no-overlay` | Page wrapper | *(present)* | Exclude this page from the overlay header feature. |
| `data-no-sticky` | Page wrapper | *(present)* | Exclude this page from the sticky header feature. |

### Effects & Toggle Labels

| Attribute | Element | Value | Description |
|---|---|---|---|
| `data-flyout-offcanvas` | DWC Nav | `"true"` | Use a flyout animation instead of slide-in for the offcanvas menu. |
| `data-adaptive-height` | DWC Nav | `"true"` | Animate dropdown height as content changes. |
| `data-stripe-style` | DWC Nav | `"true"` | Enable stripe styling across header rows. |
| `data-hover-effect` | DWC Menu Item | `"roll"` | Enable a text-roll hover effect on this item (desktop only). |
| `data-label` | Toggle button | `"Open/Close"` | Mark this toggle for label-width equalisation. The value is the open label text. |
| `data-close-text` | Toggle button | `"Close"` | Custom close label text (paired with `data-label`). |
| `data-roll-text` | Nav item | `"text"` | Text used for the roll/flip hover animation. |

---

## SPA & Third-Party Integrations

### Swup
If `window.swup` is detected, the menu hooks into `content:replace` and `page:view` automatically. No configuration needed.

### History API (manual SPA)
Set `reinitializeOnURLchange: true` in `window.DwcConfig.MegaMenu` to wrap `pushState` / `replaceState` and re-initialise on every URL change.

```js
window.DwcConfig = window.DwcConfig || {};
window.DwcConfig.MegaMenu = { reinitializeOnURLchange: true };
```

### Manual SPA trigger
If you control your own router, dispatch `dwc:navigate` on `document` after each page transition:

```js
// After your router swaps page content
router.on('after-navigate', () => {
  document.dispatchEvent(new CustomEvent('dwc:navigate'));
});
```

Or call `reinitialize()` directly:

```js
router.on('after-navigate', () => {
  window.dwcMegaMenu.reinitialize();
});
```

### DWCHeadroom
If `window.DWCHeadroom` is present, the menu automatically pauses it when the mobile menu opens and resumes it when the menu closes. No configuration needed.

---

## Exported Utilities (`window.DWCMegaMenuUtils`)

Internal classes exposed for advanced subclassing and extension. These are building blocks — no support is provided for direct usage.

| Export | Description |
|---|---|
| `RTLDetector` | Watches `<html dir>` via MutationObserver and dispatches `dwc:rtlchange`. |
| `DropdownDetector` | Determines whether a nav item is a mega menu or standard dropdown. |
| `ViewportDetector` | Reads and caches viewport width/height; provides breakpoint resolution. |
| `Utils` | General DOM utilities used internally. |
| `WidthSystem` | Calculates and applies dropdown panel widths. |
| `PositioningSystem` | Handles viewport-aware dropdown positioning and overflow correction. |
| `InteractionSystem` | Manages click/hover/keyboard interaction. Accepts `onDropdownOpen`, `onDropdownClose`, `onMobileMenuOpen`, `onMobileMenuClose` callbacks at construction time. |
| `AccessibilitySystem` | Keyboard navigation, ARIA state management, focus trapping. |
| `ResponsiveRelocationSystem` | Implements `data-breakout`, `data-breakin`, and `data-breakinto` DOM relocation. |
| `SwipeGestureHandler` | Touch `touchstart`/`touchend` swipe detection. |
| `MobileMenuScrollReset` | Resets the mobile panel scroll position on open/close. |
| `URLChangeDetector` | Wraps History API or hooks Swup to detect SPA navigation. |
| `TooltipManager` | Manages drill-down tooltips on mobile. |
| `MenuAnimationController` | Controls open/close animation classes and CSS variable injection for transitions. |
| `CenteredLogoController` | Implements the centered logo layout algorithm. |
| `OffcanvasMenuHandler` | Manages offcanvas sidebar mode activation. |
| `ToggleLabelController` | Equalises open/close toggle label widths via MutationObserver. |
| `PageExclusion` | Reads `data-no-sticky` / `data-no-overlay` and conditionally disables features per page. |
| `SkipLinkController` | Builds and injects skip link elements from `data-skip-link`. |
| `updateMobileClass` | Utility function — adds/removes `dwc-mobile` on `<body>`. |
| `getPositioningReferenceElement` | Utility function — resolves the positioning reference element for a dropdown. |
| `clearPositioningReferenceCache` | Utility function — clears the cached reference element (call after DOM changes). |
