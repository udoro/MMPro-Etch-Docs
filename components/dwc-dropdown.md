# DWC Dropdown

A top-level navigation item that contains a dropdown panel. The panel can be a standard dropdown (single column or multi-column), a nested flyout, or a full-width mega menu. Place this inside the **DWC Nav** component.

---

## Settings

### General

| Setting | Description |
|---|---|
| **Text** | The label shown on the toggle button in the nav. |
| **Dropdown Trigger Mode** | Per-item override for how this dropdown opens: **Hover**, **Click**, or **Both**. Overrides the global setting on DWC Nav. |
| **Visibility** | Show or hide this item at specific breakpoints (desktop only, mobile only, or always visible). |
| **Appearance** | Visual style of the toggle button: default link, button, or icon. |
| **No Arrow** | Hides the chevron/arrow indicator on this item's toggle button. |
| **Use Custom SVG** | Replaces the default chevron with a custom SVG icon. **Note:** requires the **Allow "unsafe" HTML** option to be enabled in the Etch builder settings. |
| **Custom SVG** | Paste your SVG code directly into this field. Only active when **Use Custom SVG** is enabled. |

### Nested Dropdown

Settings that apply when this item contains a standard nested/flyout dropdown.

| Setting | Description |
|---|---|
| **Width** | Width of this dropdown's panel (overrides the global setting from DWC Nav). |
| **Equal Heights** | Forces all columns or nested panels inside this dropdown to the same height. |
| **Exclude from Equal Height** | Marks specific content blocks to be excluded from the equal-height calculation. |
| **Parent Relative** | Positions this dropdown panel relative to the toggle item rather than the full nav bar. |

### Mega Menu

Settings that apply when this item is configured as a mega menu.

| Setting | Description |
|---|---|
| **Enable** | Switches this dropdown from a standard panel to a full-width mega menu layout. |
| **Width** | Width of the mega menu panel (overrides the global setting from DWC Nav). |
| **Inner Width** | Maximum inner content width inside the mega menu panel. Defaults to `100%` of the panel width. Useful when the panel spans the full header width but you want the content to remain constrained to a narrower column. |

### Content

| Setting | Description |
|---|---|
| **Content Alignment** | Horizontal alignment of the dropdown panel relative to its toggle button: **Left**, **Center**, or **Right**. Aligns the panel to the parent item's position. |

### Builder

| Setting | Description |
|---|---|
| **Keep Open** | Builder-only — keeps this dropdown panel open in the editor so you can style and add content more easily. Has no effect on the live site. |

### Styling

| Setting | Description |
|---|---|
| **List Item Class** | CSS class added to the `<li>` wrapper of this dropdown item. |
| **Styling Classes** | Additional CSS class on the dropdown element for custom targeting. |

---

## CSS variables — `.dwc-dropdown-items-vars`

The `.dwc-dropdown-items-vars` class is already applied to the **DWC Dropdown** component by default. To customise, override any of the variables below in a separate custom stylesheet you create, to control how items inside the dropdown panel look.

### Panel background and padding

```css
.dwc-dropdown-items-vars {
  --dropdown-content-bg: #fff;                 /* panel background colour */
  --dropdown-content-inline-padding: 0.5em;    /* left/right padding inside the panel */
  --dropdown-content-block-padding: 0.5em;     /* top/bottom padding inside the panel */
}
```

### Item states

```css
.dwc-dropdown-items-vars {
  /* Default */
  --dropdown-item-clr: #000;               /* text colour */
  --dropdown-item-font-size: 1rem;         /* font size */
  --dropdown-item-bg: initial;             /* item background */

  /* Hover */
  --dropdown-item-hover-clr: var(--menu-item-hover-clr);
  --dropdown-item-hover-bg: hsl(from var(--primary-clr) h s l / 5%);

  /* Expanded parent (mobile — when submenu-reveal is "expand") */
  --dropdown-expanded-clr: #fff;
  --dropdown-expanded-bg: #000;
}
```

### Spacing and indentation

```css
.dwc-dropdown-items-vars {
  --dropdown-item-inline-padding: var(--menu-item-inline-padding);
  --dropdown-item-block-padding: var(--menu-item-block-padding);
  --dropdown-indent: 0.6rem;              /* indentation depth for nested items */
  --dropdown-indent-item-pad-offset: 0.5; /* padding compensation for indented items */
  --dropdown-indent-line: solid 1px rgb(40 60 150 / 20%); /* indent guide line */
}
```

### Shape

```css
.dwc-dropdown-items-vars {
  --dropdown-item-radius: var(--dropdown-content-border-radius); /* item border radius */
}
```

### Headings inside the dropdown

```css
.dwc-dropdown-items-vars {
  --dropdown-heading-clr: var(--primary-clr); /* colour of heading elements inside the panel */
}
```

### Indented background

```css
.dwc-dropdown-items-vars {
  --dropdown-indent-bg: rgb(40 60 150 / 5%); /* background of the indent zone */
}
```
