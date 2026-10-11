---
icon: square-list
---

# DWC Tab

One tab inside a **DWC Tabbed Nav**. It holds the tab's name and the content that shows when the tab is open. Put it in the tabbed nav's `Tabs` slot.

***

## Props

### General

| Prop | What it does |
| --- | --- |
| **Text** | The tab's name. |
| **Link Tab** | Turns the tab's name into a link to the **URL** prop. The arrow next to it still opens the tab. |
| **URL** | Where the name links to. Only shows when **Link Tab** is on. |
| **Use Custom Arrow SVG** | Replaces the arrow at the end of the tab with your own SVG. For an icon before the tab's name, use the LABEL ICON group instead. This one needs **Allow "unsafe" HTML** turned on in Etch's settings. |
| **Custom Arrow SVG** | Paste the arrow's SVG code here. Only shows when **Use Custom Arrow SVG** is on. |

### Label icon

An icon before the tab's name.

| Prop | What it does |
| --- | --- |
| **Icon** | **None**, **SVG** or **Image**. None by default. |
| **SVG** | An SVG from your Media Library, the URL of an SVG, or a `data:image/svg+xml` URI. You don't need **Allow "unsafe" HTML** for this one. Only shows when **Icon** is **SVG**. |
| **Use Text Colour** | On: the SVG takes the tab's text colour, including on hover and when the tab is open. Off: it keeps its own colours. On by default. |
| **Image** | Any image. It keeps its own colours. Only shows when **Icon** is **Image**. |

Change the icon's size and spacing with `--tab-icon-size` and `--tab-icon-gap` in [`.dwc-tabbed-nav-vars`](dwc-tabbed-nav.md#arrow-and-label-icon).

### In builder

| Prop | What it does |
| --- | --- |
| **Show Content** | Keeps this tab open in the builder when you select something outside it. Only affects the builder. |

### Classes

| Prop | What it does |
| --- | --- |
| **List Item Class** | Adds your own classes to this tab's `<li>`. You pick or create them like any Etch class. |

***

## Slots

| Slot | What goes in it |
| --- | --- |
| `Tab_Content` | The tab's content. Any layout works. |

***

## In the builder

* Click a tab to see its content.
* Select a block inside a tab, in the canvas or the structure panel, and that tab stays open while you edit.
* To keep one tab open while you work on something else, turn on its **Show Content** prop.
* The mega menu itself only stays visible while its DWC Dropdown has the **Keep open** prop on (IN BUILDER group), or while a block inside it is selected.
