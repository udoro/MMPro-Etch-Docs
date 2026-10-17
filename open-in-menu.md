---
icon: hand-pointer
---

# Open in Menu

A link or button anywhere on your site can open a menu in your header. For example, a "See all features" button that opens your Features mega menu, or a "Shop by category" link that opens your shop menu on the right tab.

* **On desktop**, the dropdown opens. If the header is scrolled out of view, the page scrolls up to it first.
* **On mobile and in offcanvas mode**, the mobile menu opens and the submenu slides in.

It works in Full and Lite, from version 1.3.1. There's nothing to turn on. Try it on the front end of your site: links don't open menus in the builder.

***

## Open a menu with a link

Set the link's `href` to `#menu=` and then the menu item's name.

| `href` | What it opens |
| --- | --- |
| `#menu=features` | The **Features** dropdown |
| `#menu=use-cases` | The **Use cases** dropdown |
| `#menu=features/mobile-menu` | The **Features** dropdown, on its **Mobile Menu** tab |
| `/pricing/#menu=docs` | The Pricing page. Once it loads, the **Docs** dropdown opens. |

This works on any link on your page, including a link inside another mega menu, such as a promo that opens Docs from inside Features.

### The menu item's name

The name is the **Text** prop of the DWC Dropdown, in lowercase, with a dash between words. To give it a name that doesn't change with the **Text**, see [below](#give-a-menu-item-a-fixed-name).

| Text | Name |
| --- | --- |
| Features | `features` |
| Use cases | `use-cases` |
| Shop & Gifts | `shop-gifts` |

Anything that isn't a letter or a number becomes one dash.

***

## Open a menu from any element

Add the `data-open-in-menu` attribute to the element. Set its value to the menu item's name, for example `features`.

Use a link when you can. Keyboard users can reach a link or a button, but not a plain div.

***

## Open a tab or a submenu

Add the next name after a slash. Each name is one level deeper.

| Name | What it opens |
| --- | --- |
| `features/mobile-menu` | The DWC Tab with the **Text** "Mobile Menu", inside the **Features** dropdown ([Tabbed Navigation](tabbed-navigation.md), Full only) |
| `resources/guides` | A DWC Dropdown with the **Text** "Guides", inside the **Resources** dropdown |

***

## Give a menu item a fixed name

The name comes from the **Text** prop, so a link stops working if you rename the item. To avoid that, give the item a fixed name: set the **Menu ID** prop of the DWC Dropdown or DWC Tab, for example `features`.

Links can then use that name, whatever the **Text** says. Use it too when two menu items have the same **Text**.

A Menu ID works on its own: you don't need the levels around it. If the **Mobile Menu** tab has the Menu ID `phones`, the link `#menu=phones` opens the **Features** dropdown on that tab. It keeps working when you rename the tab or the dropdown.

***

## Open a menu with JavaScript

```js
window.dwcMegaMenu.openInMenu('features/mobile-menu');
```

It returns a promise. The promise gives `true` when the menu opened, or `false` when no menu item has that name. See [JavaScript API](javascript-api.md).

***

## Troubleshooting

* **Nothing opens.** Open your browser's console. If it says `Open in Menu found nothing matching`, check the name: lowercase, a dash between words, and a slash between levels.
* **The address bar shows `#menu=` but nothing opens.** Your DWC Nav script is older than 1.3.1. See [Updating](updating.md).
