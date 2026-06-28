---
icon: diamonds-4
---

# DWC Dropdown

A top-level navigation item that contains a dropdown panel. The panel can be a standard dropdown (single column or multi-column), a nested flyout, or a full-width mega menu. Place this inside the **DWC Nav** component.

***

## Settings

### General

| Setting                   | Description                                                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Text**                  | The label shown on the toggle button in the nav.                                                                                                       |
| **Dropdown Trigger Mode** | Per-item override for how this dropdown opens: **Hover**, **Click**, or **Both**. Overrides the global setting on DWC Nav.                             |
| **Visibility**            | Show or hide this item at specific breakpoints (desktop only, mobile only, or always visible).                                                         |
| **Appearance**            | Visual style of the toggle button: **default** (link), **button**, or **icon**. This is how you turn a dropdown into a button or an icon (e.g. a search or cart icon) — set it here, **not** via DWC Nav's _Last Item is Button_ (that CTA styling applies to DWC Menu Items only, not dropdowns). Trailing icon/button-appearance dropdowns are **right-aligned in the nav by default**. |
| **No Arrow**              | Hides the chevron/arrow indicator on this item's toggle button.                                                                                        |
| **Use Custom SVG**        | Replaces the default chevron with a custom SVG icon. **Note:** requires the **Allow "unsafe" HTML** option to be enabled in the Etch builder settings. |
| **Custom SVG**            | Paste your SVG code directly into this field. Only active when **Use Custom SVG** is enabled.                                                          |

### Nested Dropdown

Settings that apply when this item contains a standard nested/flyout dropdown.

| Setting                       | Description                                                                             |
| ----------------------------- | --------------------------------------------------------------------------------------- |
| **Width**                     | Width of this dropdown's panel (overrides the global setting from DWC Nav).             |
| **Equal Heights**             | Forces all columns or nested panels inside this dropdown to the same height.            |
| **Exclude from Equal Height** | Marks specific content blocks to be excluded from the equal-height calculation.         |
| **Parent Relative**           | Positions this dropdown panel relative to the toggle item rather than the full nav bar. |

### Mega Menu

Settings that apply when this item is configured as a mega menu.

| Setting         | Description                                                                                                                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Enable**      | Switches this dropdown from a standard panel to a full-width mega menu layout.                                                                                                                                        |
| **Width**       | Width of the mega menu panel (overrides the global setting from DWC Nav).                                                                                                                                             |
| **Inner Width** | Maximum inner content width inside the mega menu panel. Defaults to `100%` of the panel width. Useful when the panel spans the full header width but you want the content to remain constrained to a narrower column. |
| **Breakout**    | Moves this mega menu panel into the header area on mobile (uses the global mobile breakpoint from DWC Nav). Useful for mega menus that should be accessible on mobile without opening the full mobile sidebar.        |

### Content

| Setting               | Description                                                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Content Alignment** | Horizontal alignment of the dropdown panel relative to its toggle button: **Left**, **Center**, or **Right**. Aligns the panel to the parent item's position.             |
| **Submenu Reveal**    | Per-dropdown override for how submenus open on mobile: **Default** (inherits from DWC Nav), **Expand** (push content down), or **Slide** (panel slides in from the side). |

### Builder

| Setting       | Description                                                                                                                               |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Keep Open** | Builder-only — keeps this dropdown panel open in the editor so you can style and add content more easily. Has no effect on the live site. |

### Styling

| Setting             | Description                                                        |
| ------------------- | ------------------------------------------------------------------ |
| **List Item Class** | CSS class added to the `<li>` wrapper of this dropdown item.       |
| **Styling Classes** | Additional CSS class on the dropdown element for custom targeting. |

***

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

### Icon / Button appearance

When a dropdown's **Appearance** is set to `icon` or `button`, its toggle is styled by these **nested** blocks inside `.dwc-dropdown-items-vars`. By default both render a **black pill background with a white glyph/label**. Override the variables inside the relevant block — for example set `--menu-item-bg` and `--menu-item-hover-bg` to `transparent` and `--icon-clr` to a dark colour for a plain, background-free icon.

```css
.dwc-dropdown-items-vars {
  /* DROPDOWN ITEM IS BUTTON */
  &[appearance='button'] > .dwc-submenu-toggle {
    --menu-item-bg: var(--black, #000);          /* button background */
    --menu-item-clr: var(--white, #fff);         /* label colour */
    --menu-item-hover-clr: var(--white, #fff);
    --menu-item-hover-bg: var(--black, #000);
    --menu-item-radius: 50vw;                     /* 50vw = pill */
    --icon-size: 0;                               /* 0 = show label text, not a glyph */
    --icon-clr: var(--white, #fff);
    --icon-hover-clr: var(--white, #fff);
    --menu-item-inline-padding: 1.5rem;
    --menu-item-block-padding: 1rem;
    --menu-item-width: 200px;                     /* max width on mobile */
    --menu-item-border: solid 1px transparent;
    --menu-item-hover-border: solid 1px transparent;
  }

  /* DROPDOWN ITEM IS ICON */
  &[appearance='icon'] > .dwc-submenu-toggle {
    --menu-item-bg: var(--black, #000);          /* the icon's pill/circle background */
    --menu-item-clr: var(--white, #fff);
    --menu-item-hover-clr: var(--white, #fff);
    --menu-item-hover-bg: var(--black, #000);
    --icon-clr: var(--white, #fff);              /* glyph colour (applied as the SVG stroke) */
    --icon-hover-clr: var(--white, #fff);
    --icon-size: to-rem(14px);                   /* glyph size */
    --button-max-diameter: to-rem(45px);         /* tap-target diameter */
    --menu-item-radius: 50vw;                     /* 50vw = circle */
    --menu-item-border: solid 1px transparent;
    --menu-item-hover-border: solid 1px transparent;
  }
}
```

***

## Slots

DWC Dropdown has two slots. Only one is active at a time depending on whether mega menu is enabled.

| Slot                      | Active when               | Rendered as | Description                                                                                                       |
| ------------------------- | ------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------- |
| `Mega_Menu_Content`       | `megaMenu.enable = true`  | `<div>`     | The full-width mega menu body. Any layout is valid here.                                                          |
| `Nested_Dropdown_Content` | `megaMenu.enable = false` | `<ul>`      | The standard flyout list. Direct children **must be `<li>` tags** — use DWC Dropdown or DWC Menu Item components. |

```js
const dd = findBlock(etch.blocks.getTree(), 1299);
const megaSlot   = dd.children.find(c => c.slotName === 'Mega_Menu_Content');
const flyoutSlot = dd.children.find(c => c.slotName === 'Nested_Dropdown_Content');
```
