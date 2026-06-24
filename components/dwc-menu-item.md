# DWC Menu Item

A top-level navigation link with no dropdown panel. Use this for simple links in the nav. It supports badges, visibility control, and responsive relocation (moving the item in or out of the nav at different breakpoints).

---

## Custom link slot

DWC Menu Item has a content slot for building a fully custom link. When content is added to the slot, the **Text** and **Link To** settings become unavailable — the slot content takes over completely. This lets you build any link structure you want, including icons, custom text layouts, or combined icon and label designs.

---

## Settings

### General

| Setting | Description |
|---|---|
| **Text** | The link label. Not available when the custom link slot is in use. |
| **Link To** | The URL this item links to. Supports internal pages and external URLs. Not available when the custom link slot is in use. |
| **Open in New Tab** | Opens the link in a new browser tab (`target="_blank"`). Automatically adds `rel="noopener noreferrer"` for security. |
| **Visibility** | Show or hide this item at specific breakpoints (desktop only, mobile only, or always visible). |

### Badge

A small label overlaid on or beside the menu item — useful for "New", "Sale", or notification counts.

| Setting | Description |
|---|---|
| **Text** | The badge label. |
| **Font Size** | Text size inside the badge. |
| **Color** | Badge text colour. |
| **Background Color** | Badge background colour. |
| **Border Radius** | How rounded the badge corners are. |
| **Padding** | Internal spacing inside the badge. |
| **Gap** | Space between the menu item text and the badge. |

### Relocation

Relocation moves a nav item to a different location in the DOM when the viewport crosses a breakpoint. This is useful for CTA buttons or other elements that should appear in the page header on desktop but move inside the mobile menu on smaller screens.

> **Note:** Relocation moves items *out of* the nav. To move an element from elsewhere in the page *into* the mobile menu, use the `data-breakin` attribute directly on that element instead (e.g. `data-breakin="480"`). Items moved this way are placed inside the `.breakin-container` in the mobile menu.

| Setting | Description |
|---|---|
| **Mode** | Choose how this item relocates: **Breakout** moves it out of the nav list into the outer header area; **Breakinto** moves it into any CSS selector you specify anywhere on the page. |

**Breakout** — moves the item out of the nav list into the outer header area at the mobile breakpoint:

| Setting | Description |
|---|---|
| **Return Breakpoint** | By default the item moves to the header at the mobile breakpoint and stays there for all smaller viewports. Set a lower breakpoint here (e.g. `480`) to define the minimum width at which the item remains in the header — below that value it returns to the mobile menu. Leave empty to keep it in the header across the full mobile range. |

**Breakinto** — moves the item into any container element anywhere on the page:

| Setting | Description |
|---|---|
| **Container Selector \| Breakpoint** | The CSS selector of the target container, optionally followed by a pipe and a breakpoint value. Example: `#my-div \| 767` moves the item into `#my-div` at viewports ≤ 767 px. Omit the breakpoint to use the global mobile breakpoint. You can also apply this behaviour to *any* element on the page (not just menu items) by adding the attribute `data-breakinto=".container-selector \| breakpoint"` directly to that element. |

### Styling

| Setting | Description |
|---|---|
| **Link Class** | CSS class added to the `<a>` tag of this item. |
| **Styling Classes** | Additional CSS class on the `<li>` wrapper for custom targeting. |

---

## CSS variables — `.dwc-top-level-items-vars`

The `.dwc-top-level-items-vars` class is already applied to the **DWC Nav** component by default — it controls the appearance of all top-level items. To customise, override any of the variables below in a Custom CSS block on the DWC Nav component, or in a separate custom stylesheet you create.

### Item states

```css
.dwc-top-level-items-vars {
  /* Default */
  --menu-item-clr: #000;
  --menu-item-font-size: 0.75rem;
  --menu-item-font-weight: 500;
  --menu-item-bg: initial;

  /* Hover */
  --menu-item-hover-clr: var(--primary-clr);
  --menu-item-hover-bg: hsl(from var(--primary-clr) h s l / 0.05);
  --menu-item-hover-border-bg: var(--menu-item-active-border-bg);
  --menu-item-hover-border-height: var(--menu-item-active-border-height);

  /* Active (current page link) */
  --menu-item-active-clr: var(--menu-item-hover-clr);
  --menu-item-active-bg: initial;
  --menu-item-active-border-bg: var(--primary-clr); /* colour of the active underline indicator */
  --menu-item-active-border-height: 0px;            /* set > 0 to show an underline on the active item */
}
```

### Spacing and shape

```css
.dwc-top-level-items-vars {
  --menu-item-inline-padding: clamp(0.75rem, 0.61rem + 0.56vw, 1.1rem); /* left/right padding */
  --menu-item-block-padding: 1rem;   /* top/bottom padding */
  --roll-padding: 1rem;              /* padding when Text Roll hover effect is active */
  --menu-item-border: initial;       /* border on each item */
  --menu-item-radius: 50vw;          /* border radius on items */
}
```

### Chevron (dropdown arrow)

```css
.dwc-top-level-items-vars {
  --chevron-size: 1.2em;
  --chevron-clr: var(--menu-item-clr);
  --chevron-hover-clr: var(--menu-item-hover-clr);
}
```

### CTA buttons — Last Item is Button

When **Last Item is Button** is enabled in DWC Nav, the last one, two, or three nav items become CTA buttons styled by these variables.

```css
.dwc-top-level-items-vars {
  /* CTA 1 (last item) */
  --menu-cta-clr: #fff;
  --menu-cta-bg: #000;
  --menu-cta-inline-padding: calc(var(--menu-item-inline-padding) * 1.3);
  --menu-cta-block-padding: var(--menu-item-block-padding);
  --menu-cta-border: none;
  --menu-cta-radius: 50vw;
  --menu-cta-hover-clr: #fff;
  --menu-cta-hover-bg: var(--primary-clr);

  /* CTA 2 (second from last) */
  --menu-cta-2-clr: #fff;
  --menu-cta-2-bg: #000;
  --menu-cta-2-inline-padding: var(--menu-cta-inline-padding);
  --menu-cta-2-block-padding: var(--menu-cta-block-padding);
  --menu-cta-2-border: var(--menu-cta-border);
  --menu-cta-2-radius: var(--menu-cta-radius);
  --menu-cta-2-hover-clr: #fff;
  --menu-cta-2-hover-bg: var(--primary-clr);

  /* CTA 3 (third from last) */
  --menu-cta-3-clr: #fff;
  --menu-cta-3-bg: #000;
  --menu-cta-3-inline-padding: var(--menu-cta-inline-padding);
  --menu-cta-3-block-padding: var(--menu-cta-block-padding);
  --menu-cta-3-border: var(--menu-cta-border);
  --menu-cta-3-radius: var(--menu-cta-radius);
  --menu-cta-3-hover-clr: #fff;
  --menu-cta-3-hover-bg: var(--primary-clr);
}
```

### Breakout CTA spacing (mobile)

```css
.dwc-top-level-items-vars {
  --cta-width: 100%;           /* max width of CTA buttons on mobile */
  --cta-gap-offset: 0;         /* gap offset between 2–3 CTA buttons on mobile */
  --cta-breakout-gap: 1.25rem; /* gap between a breakout CTA and the mobile toggle */
}
```
