---
icon: folder-tree
---

# DWC Tabbed Nav

A mega menu panel with tabs down the side. Hover or click a tab and its content shows next to it. It's a good fit for shop categories, services, or any menu with a lot of links.

Put it in the `Mega_Menu_Content` slot of a **DWC Dropdown** that has the **Enable** prop (MEGA MENU group) turned on. Then add one **DWC Tab** to its `Tabs` slot for each tab. The [Tabbed Navigation](../tabbed-navigation.md) guide walks you through it.

With the **Enable** prop (TABBED HERO group) on, it can also be a hero section on a page, or a compact dropdown in your header. See [Tabbed Hero](../tabbed-navigation.md#tabbed-hero).

***

## Props

### Layout

These apply on desktop. The mobile menu has its own layout (see [Mobile](#mobile)).

| Prop | What it does |
| --- | --- |
| **Tab List Align** | Lines up the tabs at the top, middle or bottom of the tab list. |
| **Fit Content** | Makes the tab list only as tall as its tabs. **First level** applies to this tabbed nav. **All levels** also applies to tabbed navs inside its tabs. |
| **Divider** | Adds a line between the tab list and the content. |
| **Bleed** | The open tab's background runs into the content, so the two look joined. On by default. |
| **Content Reveal** | How a tab's content appears: **None**, **Fade in** or **Wipe**. |
| **Tab List Width** | Width of the tab list, for example `300px`. Leave it on `inherit` to use the `--tab-list-width` variable (250px by default). |

### Tabbed Hero

| Prop | What it does |
| --- | --- |
| **Enable** | Adds a `Hero` slot next to the tabs for your own hero content. No tab is open at first, so the hero shows. A tab closes when the mouse leaves. See [Tabbed Hero](../tabbed-navigation.md#tabbed-hero). |
| **Match Dropdown Width** | In your header, makes the menu item that opens this dropdown as wide as the tab list. Off: the item is as wide as its text, like your other items. Off by default. Only shows when **Enable** is on. |

### Behaviour

These apply on desktop.

| Prop | What it does |
| --- | --- |
| **Open Tabs On** | **Same as dropdown** follows the **Dropdown Trigger Mode** prop of the DWC Dropdown it sits in. Or pick **Hover** or **Click**. |
| **Open First Tab** | Shows the first tab when the mega menu opens, until a visitor picks another tab. **Default** means yes, or no when Tabbed Hero is on. |
| **Close On Mouse Out** | Closes the open tab when the mouse leaves the tabbed nav. **Default** means no, or yes when Tabbed Hero is on. |

### Mobile

Tabbed Nav switches to its mobile layout at the same point as the rest of your menu: below the **Mobile Breakpoint** prop on DWC Nav, and whenever **Offcanvas Mode** is on.

| Prop | What it does |
| --- | --- |
| **Slide In** | On: a tab's content slides in over the menu, with a back button. Off: tabs open in place, like an accordion. On by default. |
| **Back Text** | The text on the slide-in back button. **Same as DWC Nav** follows the **Back Text Mode** prop on DWC Nav: **Back to** shows "Back to" and the name of the item you came from, **Title** shows the tab's name. **Tab name** always shows the tab's name. **Custom** shows your own text. |
| **Custom Back Text** | Your text for the back button. Only shows when **Back Text** is **Custom**. |

### Classes

| Prop | What it does |
| --- | --- |
| **Container Class** | Adds your own classes to this tabbed nav, so you can style it on its own. You pick or create them like any Etch class. See [Style one tabbed nav](#style-one-tabbed-nav). |

***

## Slots

| Slot | What goes in it |
| --- | --- |
| `Tabs` | **DWC Tab** components only, or a Loop that repeats one DWC Tab. |
| `Hero` | Your hero content: heading, text, image, button. Only there when the **Enable** prop (TABBED HERO group) is on. |

***

## CSS variables

Every DWC Tabbed Nav has the `.dwc-tabbed-nav-vars` class. Change the variables in that class to restyle all your tabbed navs at once. You'll find it in Etch's Style Manager.

### Tab list

```css
.dwc-tabbed-nav-vars {
  --tab-list-width: 250px;                     /* width of the tab list */
  --tab-list-wrapper-bg: rgb(0 0 0 / 4%);       /* tab list background */
  --tab-list-inline-padding: 0px;              /* left and right padding of the tab list */
  --tab-list-block-padding: 28px;              /* top and bottom padding of the tab list */
}
```

### Tabs

```css
.dwc-tabbed-nav-vars {
  --tab-list-item-clr: #000;                   /* tab text colour */
  --tab-list-item-font-size: 14px;
  --tab-list-item-font-weight: 500;
  --tab-list-item-inline-padding: var(--menu-item-inline-padding, 12px); /* left and right padding of each tab */
  --tab-list-item-block-padding: 12px;         /* top and bottom padding of each tab */
  --tab-list-item-radius: 0px;                 /* tab corner radius */

  /* the open tab, and a tab you hover */
  --tab-list-item-active-clr: #000;
  --tab-list-item-active-bg: #fff;
}
```

### Arrow and label icon

```css
.dwc-tabbed-nav-vars {
  --tab-arrow-clr: gray;                       /* the arrow at the end of each tab */
  --tab-arrow-size: 16px;

  --tab-icon-size: 24px;                       /* the icon before a tab's name (DWC Tab › LABEL ICON) */
  --tab-icon-gap: 12px;                        /* space between the icon and the name */
  --tab-icon-clr: currentColor;                /* colour of an SVG icon that uses the text colour */
}
```

### Content

```css
.dwc-tabbed-nav-vars {
  --tab-content-bg: var(--tab-list-item-active-bg);  /* content background */
  --tab-content-padding: 28px;                       /* padding around each tab's content */
  --tab-content-height: 450px;                       /* height of the tab area until your tabs have loaded */
  --tab-content-width: 100%;                         /* width of a tab's content. A Tabbed Hero uses 70% */
}
```

The tab area resizes to fit the open tab, so you don't need to set a height. A Tabbed Hero works differently: see [Tabbed Hero](../tabbed-navigation.md#tabbed-hero).

To change the 70% of a Tabbed Hero, set `--tab-content-width` for that tabbed nav only. See [Style one tabbed nav](#style-one-tabbed-nav).

### Divider and bleed

```css
.dwc-tabbed-nav-vars {
  /* with the Divider prop on */
  --tab-divider-clr: rgb(0 0 0 / 20%);
  --tab-divider-width: 1px;
  --tab-divider-inset: 0px;                    /* space above and below the line */

  /* with the Bleed prop on */
  --bleed-bg: var(--tab-list-item-active-bg);  /* colour that joins the open tab to the content */
  --bleed-height: 44px;                        /* match it to your tab height */
}
```

### Mobile

In the mobile menu, tabs look like the menu's other items: they take their colours from the DWC Dropdown variables (`.dwc-dropdown-items-vars`). To change them for tabs only, edit the mobile block at the bottom of `.dwc-tabbed-nav-vars`.

### Style one tabbed nav

1. Add a class with the **Container Class** prop, for example `shop-tabs`. You pick or create it like any Etch class.
2. Open the `.shop-tabs` class in Etch's Style Manager.
3. Put your variables inside `&.dwc-tabbed-nav-vars { }`, so they win over the defaults:

```css
&.dwc-tabbed-nav-vars {
  --tab-list-item-active-bg: #ff7f32;
  --tab-list-item-active-clr: #0b2b2c;
}
```

To change desktop only, use `html:not(.dwc-mobile) &.dwc-tabbed-nav-vars { }` instead.
