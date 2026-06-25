# DWC Mobile Toggle

The hamburger button that opens and closes the mobile menu. It can be placed anywhere on the page — it does not need to live inside the DWC Nav. Multiple toggles pointing to different nav elements are supported via the **Target Selector** setting.

---

## Settings

### Appearance

| Setting | Description |
|---|---|
| **Size** | The overall size of the toggle button. Controls `--toggle-size`. Note: when **Pill Shape** is enabled, the icon size inside the pill is controlled by **Pill Toggle Size** instead. |
| **Color** | Colour of the hamburger bars or icon. Controls `--toggle-color`. |
| **Hover Color** | Colour of the hamburger bars or icon on hover. Controls `--toggle-hover-color`. |
| **Flip** | Mirrors the hamburger icon horizontally. |
| **Hamburger Icon** | The animation style of the hamburger. Options: **Default**, two-line-squeeze, two-line-spin, two-line-collapse, three-line-spin, three-line-collapse, three-line-arrow. |
| **Toggle Style** | Visual preset for the toggle button. The **Techno** style adjusts the closed-state line proportions. |
| **Equalize** | When **Open/Close** label mode is active, this equalises the label width so the layout does not shift when the text changes between open and closed states. |
| **Always Visible** | Keeps the toggle button visible even when the mobile menu is open, and on desktop viewports. Particularly useful when **Fullscreen Mobile Menu** is enabled — without this, the toggle would be hidden behind the fullscreen overlay. |

### Pill

Wraps the toggle in a pill or square background shape.

| Setting | Description |
|---|---|
| **Pill Shape** | Enables the pill/button background around the hamburger icon. |
| **Pill Border** | Border on the pill shape. |
| **Pill Background Color** | Background colour of the pill. |
| **Pill Padding** | Internal padding inside the pill. |
| **Pill Radius** | Border radius of the pill shape. |
| **Pill Aspect Ratio** | Aspect ratio of the pill container (e.g. `1` for a square, `2` for a wide rectangle). |
| **Pill Toggle Size** | Size of the hamburger icon within the pill (independent of the outer pill size). |

### Label

An optional text label shown alongside the hamburger icon.

| Setting | Description |
|---|---|
| **Enable** | Shows the label. |
| **Text** | Label mode. **Open/Close** — uses separate text for the open and closed states (see Open Text and Close Text below). **Menu** — shows a single static label in both states. |
| **Open Text** | The label shown when the menu is **closed** (the button will open the menu). Only used in **Open/Close** mode. |
| **Close Text** | The label shown when the menu is **open** (the button will close the menu). Only used in **Open/Close** mode. |
| **Font Size** | Font size of the label. |
| **Color** | Text colour of the label. |
| **Gap** | Space between the hamburger icon and the label. |

> **Tip:** When using **Open/Close** mode, enable **Equalize** in the Appearance section to prevent layout shift when the label text changes between states.

### Behaviour

| Setting | Description |
|---|---|
| **Target Selector** | CSS selector of the element this toggle controls. When clicked, it adds the class `.dwc-open` to the specified element. Use this when you have more than one nav on the page and need separate toggles for each, or to trigger any other custom element. Defaults to the nearest DWC Nav. |
| **Aria Label** | Accessible label for screen readers (e.g. "Open navigation menu"). |

### Styling

| Setting | Description |
|---|---|
| **Styling Class** | Additional CSS class on the toggle wrapper for custom targeting. |

---

## CSS variables — `.dwc-toggle-vars`

The `.dwc-toggle-vars` class is already applied to the **DWC Mobile Toggle** component by default. The primary use case for overriding its variables is when the **Special Sticky/Overlay Styles** option is enabled on the DWC Header — allowing different icon colours before and after the user scrolls. To customise, override any of the variables below in a Custom CSS block on the component, or in a separate custom stylesheet you create.

The commented-out examples below show the pattern. Uncomment and set the values you need.

### Before scrolling (overlay state)

```css
.dwc-toggle-vars {
  /* Styles applied when the page hasn't scrolled yet (overlay header is showing) */

  /* --toggle-color: white;
  --toggle-bg: color-mix(in oklch, white 10%, transparent);
  --label-color: white; */
}
```

### Before scrolling — menu open

```css
.dwc-toggle-vars {
  /* Styles when the menu is open but the page hasn't scrolled */

  /* --toggle-color: black; */
}
```

### After scrolling (sticky state)

```css
.dwc-toggle-vars {
  /* Styles applied after the user scrolls (sticky header is showing) */

  /* add any toggle variables here */
}
```

### After scrolling — menu open

```css
.dwc-toggle-vars {
  /* Styles when the menu is open and the page has scrolled */

  /* --toggle-color: red; */
}
```

> **Note:** These overrides only apply when **Special Sticky/Overlay Styles** is enabled in the DWC Header settings and **Sticky Header** is active. Use `!important` on the values since they override component-level inline styles.

### Core toggle variables (all states)

These variables control the toggle's base appearance and are set via the component props. You can override them in `.dwc-toggle-vars` using `!important`:

```css
.dwc-toggle-vars {
  --toggle-color: #000;        /* hamburger bar / icon colour */
  --toggle-hover-color: #000;  /* colour on hover */
  --toggle-bg: transparent;    /* pill background colour */
  --toggle-border: none;       /* pill border */
  --toggle-radius: 0px;        /* pill border radius */
  --toggle-padding: 0px;       /* pill padding */
  --toggle-size: 24px;         /* overall icon size */
  --pill-toggle-size: 24px;    /* icon size inside a pill */
  --pill-aspect-ratio: 1;      /* pill aspect ratio */
}
```
