---
icon: diamonds-4
---

# DWC Header

The outermost wrapper of the entire header. It controls sticky behaviour, overlay positioning, skip-link accessibility, and section offset padding. All DWC components live inside this element.

***

## Settings

### Sticky

| Setting                           | Description                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sticky Header**                 | Makes the header stick to the top of the viewport as the user scrolls. To disable sticky on a specific page without removing the setting, add the attribute `data-no-sticky` to any section on that page.                                                                                                                                                        |
| **Scroll Down Visibility**        | Which row(s) to show or hide when the user scrolls down. Options: `Default` (all rows stay), `hide-row-1/2/3` (slide that row off-screen), `show-row-1/2/3` (keep only that row visible), `hide-all-rows` (collapse the entire header).                                                                                                                          |
| **Scroll Up Visibility**          | Which row(s) to restore when the user scrolls back up. Options: `Default`, `show-row-1/2/3`, `show-all-rows`, `reverse`.                                                                                                                                                                                                                                         |
| **Scroll Visibility Distance**    | How far the user must scroll before the hide/show triggers. Accepts `px` values (`200px`), `rem` values (`12rem`), or a plain number (`200`). Default: `200px`.                                                                                                                                                                                                  |
| **Sticky Header Background**      | Background colour applied to the header once the user has scrolled. Controls the CSS property `--header-bg-sticky`.                                                                                                                                                                                                                                              |
| **Scroll Margin**                 | Sets the `--dwc-scroll-margin` variable so in-page anchor links scroll to the correct position below the sticky header.                                                                                                                                                                                                                                          |
| **Special Sticky/Overlay Styles** | Unlocks a set of CSS hooks that let you style the header and menu items differently before and after the user scrolls (e.g. white icons on a transparent overlay, dark icons once the sticky background kicks in). Configure these styles via the **STICKY/OVERLAY HEADER SPECIAL STYLES** section in the `.dwc-toggle-vars` and `.dwc-header-vars` CSS classes. |

### Overlay

| Setting                              | Description                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Overlay Header**                   | The header floats over the page content below it (useful for hero sections with a transparent header). To disable overlay on a specific page, add `data-no-overlay` to any section on that page. To keep the overlay active but suppress the special overlay/sticky styles, add `data-no-overlay-style` to any section on that page. |
| **Overlay Header Mobile**            | Extends the overlay behaviour to mobile viewports.                                                                                                                                                                                                                                                                                   |
| **Overlay Header Width**             | Width of the overlay container.                                                                                                                                                                                                                                                                                                      |
| **Overlay Header Background**        | Background colour when the overlay is in its default (unscrolled) state. Set to a transparent value for a fully transparent header. Controls `--overlay-header-bg`.                                                                                                                                                                  |
| **Overlay Header Active Background** | Background colour applied when the user hovers a menu item or a dropdown is open. Controls `--overlay-header-bg-active`.                                                                                                                                                                                                             |
| **Overlay Header Blur**              | Applies a `backdrop-filter` blur to the header overlay container itself, creating a frosted glass effect on the header bar.                                                                                                                                                                                                          |
| **Overlay Header Radius**            | Border radius on the overlay container.                                                                                                                                                                                                                                                                                              |
| **Overlay Header Inset**             | Offset from the top and sides of the viewport.                                                                                                                                                                                                                                                                                       |
| **Remove Inset Top**                 | Removes the top gap, placing the overlay flush with the top of the viewport.                                                                                                                                                                                                                                                         |
| **Overlay Header Shadow**            | Box shadow on the overlay container.                                                                                                                                                                                                                                                                                                 |
| **Offset Section Padding**           | Automatically adds top padding to the first section on the page so its content is not hidden beneath the header. To opt a specific section out of this padding, add the attribute `data-no-padding` to that section.                                                                                                                 |

### Liquid Glass

Creates an immersive, glass-like digital backdrop where on-screen elements dynamically bend, refract, and morph in response to motion. Mutually exclusive with **Overlay Header Blur** — enabling Liquid Glass suppresses the overlay's `backdrop-filter` blur rule on both desktop and mobile.

| Setting            | Description                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Enable**          | Turns on the liquid-glass effect on the header. When active, this replaces the standard Overlay Header Blur backdrop-filter — the two are mutually exclusive.                            |
| **Distortion**      | Controls warp strength of the glass refraction. Range 20–80. Higher = more distortion (thick glass); lower = subtle. Default: `50`.                                                      |
| **Surface Depth**   | Creates color fringing (chromatic aberration). Higher = more rainbow separation at edges. Default: `5`.                                                                                   |
| **Shininess**       | Controls reflection sharpness. Lower = crisper reflections, higher = softer, frosted, blurry. Default: `7`.                                                                               |
| **Saturate**        | Adjusts color saturation of the glass background. `0` completely desaturates, `1` leaves colors unchanged, above `1` super-saturates for much more vibrant colors. Default: `1.4`.        |
| **Border**          | Border style applied to the liquid-glass surface. Default: `1px solid rgba(255, 255, 255, 0.3)`.                                                                                          |
| **Box Shadow**      | Shadow applied to the liquid-glass surface; overrides Overlay Header Shadow when active. Value is controlled by the `--liquid-glass-shadow` CSS variable in `.dwc-header-vars`.          |

### Accessibility

| Setting                        | Description                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Skip Link**                  | Injects a visually hidden "Skip to content" link as the first focusable element on the page. Keyboard and screen-reader users can press Tab immediately after the page loads to jump past the navigation to the main content.                                                                                                                                                                |
| **Custom Skip Link Parameter** | Defines the target(s) for the skip link. Supports multiple links separated by commas. Use the format `#selector \| Link label` — for example: `#main \| Skip to content, #footer \| Skip to footer`. If the target element does not have an ID, use its tag or class name directly without the `#`: e.g. `main \| Skip to content`. Leave empty for auto-detection of the main content area. |

### Other

| Setting                     | Description                                                                                                                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Header Background Color** | Base background colour for the header element. Controls the CSS property `--header-bg`.                                                                                                              |
| **Dark Background Preview** | Builder-only — darkens the canvas background in the editor. Useful when your menu items or logo are white and would otherwise be invisible against the white canvas. Has no effect on the live site. |
| **Styling Classes**         | Additional CSS class applied to the header element for custom targeting.                                                                                                                             |

***

## Multi-row headers

The DWC Header supports multiple rows — for example a top utility bar sitting above the main nav row. Each header row receives a numbered CSS class and a corresponding height variable, giving you precise CSS targets for every row at every scroll state.

### Row classes

Each header row gets a class automatically:

| Class               | Row                 |
| ------------------- | ------------------- |
| `.dwc-header-row-1` | First row (topmost) |
| `.dwc-header-row-2` | Second row          |
| `.dwc-header-row-3` | Third row           |

### Scroll state classes

As the user scrolls, these classes are added and removed automatically:

| Class           | Element  | When active                                                                                        |
| --------------- | -------- | -------------------------------------------------------------------------------------------------- |
| `.dwc-headroom` | `<body>` | Added when sticky header activates. Required for the Special Sticky/Overlay CSS selectors to fire. |
| `.scroll-down`  | `<body>` | User is scrolling down past the scroll visibility distance threshold                               |
| `.scroll-up`    | `<body>` | User has scrolled back up                                                                          |

### CSS targeting

Combine row classes and scroll state classes to style any row at any scroll position:

```css
/* Target a specific row */
.dwc-header-row-1 { /* first row — e.g. utility bar */ }
.dwc-header-row-2 { /* second row — e.g. main nav */ }

/* Target a row only when scrolling down */
.scroll-down .dwc-header-row-1 { /* ... */ }

/* Target the header when scrolling up */
.scroll-up #dwc-header { /* ... */ }
```

### Row height variables

Each row's height is available as a CSS variable on `<body>`:

```css
--h-row-1   /* height of row 1 */
--h-row-2   /* height of row 2 */
--h-row-3   /* height of row 3 */
```

Use these when you need to offset or position something relative to the visible header height — for example, setting the top position of a sticky element that sits just below the visible rows.

***

## Per-page feature exclusions

Add these attributes to any `<section>` element on a page to suppress specific header features on that page only, without changing the global settings.

| Attribute               | Effect                                                                   |
| ----------------------- | ------------------------------------------------------------------------ |
| `data-no-sticky`        | Disables sticky header on this page                                      |
| `data-no-overlay`       | Disables overlay header on this page                                     |
| `data-no-overlay-style` | Keeps overlay active but suppresses the Special Sticky/Overlay CSS hooks |
| `data-no-padding`       | Opts this section out of the Offset Section Padding                      |

***

## CSS variables — `.dwc-header-vars`

The `.dwc-header-vars` class is already applied to the **DWC Header** component by default. To customise, override any of the variables below in a Custom CSS block on the component, or in a separate custom stylesheet you create.

### Layout

```css
.dwc-header-vars {
  --header-inline-padding: 1rem;       /* left/right padding inside the header */
  --header-block-padding: 0.5rem;      /* top/bottom padding inside the header */
  --header-min-height: 0px;            /* minimum height of the header */
  --fallback-section-padding: 83px;    /* fallback offset for the first section when overlay is active */
}
```

### Dropdown / Mega Menu width (global fallback)

```css
.dwc-header-vars {
  --dropdown-content-width: 1200px;         /* default width for mega menu panels */
  --dropdown-content-default-width: 1200px; /* fallback used in calculations */
}
```

### Skip Link

```css
.dwc-header-vars {
  --skip-link-bg: #111;
  --skip-link-color: #fff;
  --skip-link-font-size: 1rem;
  --skip-link-weight: 600;
  --skip-link-padding: 0.75rem 1.25rem;
  --skip-link-radius: 0 0 0.5rem 0.5rem;
  --skip-link-outline: 3px solid #4da3ff;
  --skip-link-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}
```

### Adaptive Height / Stripe animation

```css
.dwc-header-vars {
  --adaptive-height-bg: var(--dropdown-content-bg); /* background of the animated stripe or adaptive zone */
  --adaptive-height-border: 1px solid var(--dropdown-content-border-color);
  --adaptive-height-shadow: 0 0 30px rgb(39 50 59 / 10%);
  --stripe-border-radius: 1rem;  /* border radius of the stripe element */
}
```

### Liquid Glass

```css
.dwc-header-vars {
  --liquid-glass-shadow: 0 4px 24px rgba(0, 0, 0, 0.15); /* box shadow applied when Liquid Glass is enabled; overrides Overlay Header Shadow */
}
```

***

## Slots

| Slot      | Description                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------ |
| `default` | Everything visible in the header bar — the DWC Nav wrapper, logo, and any other header elements. |

```js
const header = findBlock(etch.blocks.getTree(), 1302);
const body = header.children.find(c => c.slotName === 'default');
```
