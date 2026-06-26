---
icon: desktop-arrow-down
---

# Installation & Getting Started

## Installation

### JSON file

1. Download the JSON file.
2. Open it and copy the entire contents.
3. In Etch Builder, go to the **Index Template** and paste the content into the **Structure Panel**.

### CSS file

1. Download the CSS file.
2. Open it and copy the entire contents.
3. In Etch Builder, create a new **Stylesheet**.
4. **Important:** Name the stylesheet exactly `DWC Mega Menu`.
5. Paste the CSS into the stylesheet and save.

> **Do not edit this stylesheet.** It is not intended for customisation. All styling should be done through component settings or the CSS variable classes documented for each component.

***

## Starter templates

Starter templates give you a pre-built mega menu layout to drop into any dropdown.

1. From your **Gumroad dashboard**, go to the left panel and click **Starter Template**.
2. Copy the provided JSON.
3. In Etch Builder, paste it inside the **DWC Dropdown** component slot labelled `Mega_Menu_Content`.
4. In the **DWC Dropdown** settings, ensure **Mega Menu** is toggled on.

***

## Component hierarchy

A typical header setup uses all five components nested in this order:

```
DWC Header
└── DWC Nav
    ├── DWC Mobile Toggle      (hamburger button)
    ├── DWC Menu Item          (plain link, no dropdown)
    └── DWC Dropdown           (nav item with dropdown or mega menu panel)
```

The **DWC Header** wraps everything and handles sticky/overlay behaviour at the page level. The **DWC Nav** contains the menu logic and all mobile settings. Inside the nav you place any combination of **DWC Dropdown** items (for items with sub-panels) and **DWC Menu Item** items (for simple links). The **DWC Mobile Toggle** can be placed anywhere on the page — it does not need to live inside the nav.

***

## Customising with CSS variables

Every component ships with a styling class already applied. You do not need to add these classes yourself — they are there by default. To customise, override the variables in a **Custom CSS** block on the component, or in a separate custom stylesheet you create. Do not edit the built-in stylesheet — it is not intended for customisation and any changes made there will be lost on updates.

| Component                 | Styling class               |
| ------------------------- | --------------------------- |
| DWC Header                | `.dwc-header-vars`          |
| DWC Nav                   | `.dwc-nav-vars`             |
| DWC Dropdown              | `.dwc-dropdown-items-vars`  |
| DWC Menu Item (top-level) | `.dwc-top-level-items-vars` |
| DWC Mobile Toggle         | `.dwc-toggle-vars`          |

**Example** — change the top-level menu item colour and font size:

```css
.dwc-top-level-items-vars {
  --menu-item-clr: #1a1a2e;
  --menu-item-font-size: 0.875rem;
  --menu-item-hover-clr: #e94560;
}
```

See each component's documentation page for the full list of available variables.

***

## Mobile breakpoint

The mobile breakpoint defaults to `1201px` (desktop at ≥ 1201 px). To change it, set **Mobile Breakpoint** in the **DWC Nav → Mobile** settings. The value you enter is the last pixel width that is considered _mobile_ — e.g. entering `1024` means mobile at ≤ 1024 px and desktop at ≥ 1025 px.

***

## Offcanvas mode

Offcanvas mode makes the nav behave like a sidebar on desktop viewports. Enable it via **DWC Nav → Menu Mode → Offcanvas Mode**. When active, the mobile menu styles apply at all screen sizes — not just below the breakpoint — so the hamburger menu and mobile panel are shown regardless of viewport width. The class `.dwc-offcanvas-active` is also added to `<body>`, which you can use for custom CSS targeting.
