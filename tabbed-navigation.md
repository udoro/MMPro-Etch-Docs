---
icon: folder-tree
---

# Tabbed Navigation

Tabbed Navigation is a mega menu with tabs down the side. Hover or click a tab and its content shows next to it. It fits a lot of links into a small space.

Good for:

* Shop categories, for example your WooCommerce product categories
* Services, solutions or use cases
* Any menu with several levels

It's made of two components: **DWC Tabbed Nav** (the whole panel) and **DWC Tab** (one tab). See [DWC Tabbed Nav](components/dwc-tabbed-nav.md) and [DWC Tab](components/dwc-tab.md) for every prop.

***

## Add it to your header

Do these steps in order.

1. Select the **DWC Dropdown** that should open the tabs. In its MEGA MENU group, turn on the **Enable** prop.
2. In its IN BUILDER group, turn on the **Keep open** prop, so you can see the mega menu while you work. Turn it off when you're done.
3. Add a **DWC Tabbed Nav** to the dropdown's `Mega_Menu_Content` slot.
4. Add a **DWC Tab** to the tabbed nav's `Tabs` slot for each tab, and set its **Text** prop.
5. Build each tab's content in its `Tab_Content` slot.

The first tab opens on its own, so you'll see its content straight away. Click another tab in the canvas to work on it.

### Add something under the tabs

You can add more blocks after the DWC Tabbed Nav in the same `Mega_Menu_Content` slot, for example a promo bar with a button. They span the full width of the mega menu, under the tabs.

### Set the width and position

The mega menu's size and position come from the DWC Dropdown, the same as for any mega menu:

* Set its width with the **Width** prop (MEGA MENU group), for example `1140px`.
* With the **Content Alignment** prop on **Default**, the mega menu is centred on the header. **Left**, **Center** and **Right** line it up with its own menu item instead.

***

## Work in the builder

* Click a tab to see its content.
* Select a block inside a tab, in the canvas or the structure panel, and that tab stays open while you edit.
* To keep one tab open while you work on something else, turn on that DWC Tab's **Show Content** prop.

***

## On mobile

Tabbed Navigation switches to its mobile layout at the same point as the rest of your menu: below the **Mobile Breakpoint** prop on DWC Nav, and whenever **Offcanvas Mode** is on.

* With the **Slide In** prop on (the default), a tab's content slides in over the menu, with a back button. Set the button's text with the **Back Text** prop.
* With **Slide In** off, tabs open in place, like an accordion.

***

## Tabbed Hero

Tabbed Hero puts your own hero content next to the tabs. No tab is open at first, so the hero shows. Hover a tab and its content covers most of the hero. Move the mouse away and the hero comes back.

Turn it on with the **Enable** prop (TABBED HERO group) on DWC Tabbed Nav. A `Hero` slot appears next to the tabs.

Use it in one of two ways.

### As a hero section on a page

1. Add a **DWC Tabbed Nav** to a section on your page. It fills the width of the block it sits in.
2. Turn on its **Enable** prop (TABBED HERO group).
3. Add a **DWC Tab** to the `Tabs` slot for each tab, and build each tab's content.
4. Put your hero content in the `Hero` slot: a heading, text, an image, a button.

* **Height:** the hero and the tab list set the height. Make your hero at least as tall as your longest tab, or that tab scrolls inside it.
* **Width of an open tab:** 70% of the tabbed nav, so part of the hero stays in view. To change it, see [CSS variables](components/dwc-tabbed-nav.md#content).
* **On mobile:** the hero sits below the tabs. A tapped tab slides in over the tabs and the hero, with a back button. With the **Slide In** prop off, tabs open in place.
* The page needs your Mega Menu Pro header. It runs the tabs.

### As a compact dropdown in your header

Only the tab list drops down. Hover a tab and its content opens next to the list.

1. Add a **DWC Tabbed Nav** to a DWC Dropdown, as in [Add it to your header](#add-it-to-your-header).
2. Turn on its **Enable** prop (TABBED HERO group). Leave the `Hero` slot empty.
3. On the DWC Dropdown, set the **Content Alignment** prop (GENERAL group) to **Left**, so the list opens under its menu item.
4. Set the dropdown's **Width** prop (MEGA MENU group) to the room the list and an open tab need, for example `900px`.

To make the menu item as wide as the tab list, turn on the **Match Dropdown Width** prop (TABBED HERO group). It's off by default, so the item stays as wide as its text.

In the mobile menu it works like any other tabbed nav.

### Tabbed Hero in the builder

* No tab is open at first, so you can edit the hero.
* Click a tab to see its content. Click it again, or click the hero, to close it.
* Select a block in the hero, in the canvas or the structure panel, and the hero shows.

***

## Build tabs from your categories

You can make one tab per category with an Etch loop, so new categories show up on their own. The steps below use post categories. The WooCommerce version follows.

### First level: one tab per category

1. In Etch's Loop Manager, add a **WP Terms** loop with the key `categories`:

```php
$query_args = [
  'taxonomy'   => 'category',
  'hide_empty' => true,
  'orderby'    => 'name',
  'order'      => 'ASC',
];
```

2. In the tabbed nav's `Tabs` slot, add a **Loop** element that uses it: `{#loop categories as category}`.
3. Put one **DWC Tab** inside the loop, and set its **Text** prop to `{category.name}`.

### Second level: what each tab shows

Pass the category's ID into a second loop inside the DWC Tab's `Tab_Content` slot.

1. Add a **WP Query** loop with the key `categoryPosts`, and put `$cat` where the category ID goes:

```php
$query_args = [
  'post_type'      => 'post',
  'posts_per_page' => 5,
  'post_status'    => 'publish',
  'cat'            => $cat,
];
```

2. In `Tab_Content`, add a **Loop** element that passes the category's ID: `{#loop categoryPosts($cat: category.id) as post}`.
3. Inside it, add a link with the URL `{post.permalink.relative}` and the text `{post.title}`.

### WooCommerce product categories

Use the same steps with these loops.

* **Tabs (top-level categories):** a WP Terms loop with `'taxonomy' => 'product_cat'` and `'parent' => 0`. Uncategorized shows up if it has products. To leave it out, add `'exclude' => [15]`, where 15 is its ID. To find the ID, hover the category in **Products > Categories** and look for `tag_ID=` in the link.
* **Subcategories in each tab:** a WP Terms loop with the key `subcategories`, `'taxonomy' => 'product_cat'` and `'parent' => $parent`. Use it as `{#loop subcategories($parent: category.id) as sub}` and link each one with `{sub.permalink}` and `{sub.name}`.
* **Products in each tab:** a WP Query loop with the key `categoryProducts`, `'post_type' => 'product'` and:

```php
'tax_query' => [
  [
    'taxonomy' => 'product_cat',
    'field'    => 'term_id',
    'terms'    => $cat,
  ],
],
```

Then use it as `{#loop categoryProducts($cat: category.id) as product}`, and link each product with `{product.permalink.relative}` and `{product.title}`.

You can mix loops and fixed tabs: put a DWC Tab next to the loop in the `Tabs` slot and fill it by hand.

***

## Style it

* **All tabbed navs:** change the variables in the `.dwc-tabbed-nav-vars` class. See [CSS variables](components/dwc-tabbed-nav.md#css-variables).
* **One tabbed nav:** give it a class with the **Container Class** prop. See [Style one tabbed nav](components/dwc-tabbed-nav.md#style-one-tabbed-nav).
* **An icon before a tab's name:** use the LABEL ICON group on DWC Tab. See [Label icon](components/dwc-tab.md#label-icon).
* **Responsive content inside a tab:** use container queries. Inside a tab, `@container` measures that tab's content area, so a layout like `@container (width < 600px)` fits the space it really has.

***

## Keyboard and screen readers

Tabs work with the keyboard the same way your menu's dropdowns do.

* **On a tab:** the Up and Down arrows move between tabs, and Home and End jump to the first or last one. The Right arrow opens the tab and moves into its content. Enter and Space open it.
* **In a tab's content:** the Up and Down arrows move between its links, and Home and End jump to the first or last one. The Left arrow or Escape takes you back to the tab.
* **When a tab opens:** it opens as soon as it gets keyboard focus. In a compact dropdown it opens only when you press Enter or the Right arrow, and it closes again when you step back out or move on.
* **On mobile:** the Left arrow and Escape work like the back button.
* In right-to-left languages, the Left and Right arrows swap.
* Tabs and their content carry the right roles and states for screen readers.
* Animations respect the visitor's reduced-motion setting.

***

## Troubleshooting

**The tabs don't do anything on the live site**

* DWC Tabbed Nav works inside a mega menu: the `Mega_Menu_Content` slot of a DWC Dropdown with **Enable** (MEGA MENU group) on. On a page, use it as a [Tabbed Hero](#tabbed-hero).
* The page needs your Mega Menu Pro header.

**My Tabbed Hero is narrower than its section**

* Give the block it sits in a width of 100%.

**I can't see the mega menu or the tab I want in the builder**

* Turn on the DWC Dropdown's **Keep open** prop, then click the tab.

**A loop shows no tabs**

* Check the loop finds something: with `'hide_empty' => true`, categories without posts or products are left out.
* For WooCommerce top-level categories, `'parent'` must be `0`.

**My tab icon doesn't show**

* Set the DWC Tab's **Icon** prop to **SVG** or **Image**, and fill in the field that appears.
