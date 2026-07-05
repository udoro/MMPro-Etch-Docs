---
icon: diamonds-4
---

# DWC Nav

The core navigation component. It controls everything about the menu — how it animates, how it behaves on mobile, how dropdowns are styled, and where the logo sits. Place this inside a **DWC Header**.

***

## Settings

### Animation

| Setting                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Stripe Style**             | As the user moves between mega menu items, the dropdown panel smoothly morphs — sliding to the new item's position and transitioning its width and height to match the new dropdown's content. Instead of one dropdown closing and another opening, the panel flows seamlessly from one to the next. Only visible on the live site — there is no builder preview for this feature. **Cannot be used together with Adaptive Height.** |
| **Adaptive Height**          | As the user moves between mega menu items of different heights, the dropdown's background area smoothly expands or contracts vertically to match the height of the active dropdown. Only visible on the live site — there is no builder preview for this feature. **Cannot be used together with Stripe Style.**                                                                                                                     |
| **Animate Adaptive Content** | Fades the dropdown content in and out as part of the adaptive height transition. Only available when Adaptive Height is enabled.                                                                                                                                                                                                                                                                                                     |

### Menu Mode

| Setting                        | Description                                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **Offcanvas Mode**             | The nav behaves as a sidebar even on desktop viewports. All mobile menu styles apply regardless of screen width.         |
| **Flyout Offcanvas**           | In offcanvas mode, submenus fly out as overlapping panels (desktop-like behaviour) instead of expanding inline.          |
| **Flyout on Hover**            | In offcanvas mode on a desktop-sized screen, dropdowns open on hover rather than requiring a click.                      |
| **Last Item is Button**        | Styles the last one, two, or three nav items as CTA buttons. Options: None, Last Button, Last 2 Buttons, Last 3 Buttons. **CTA-button styling (the `--menu-cta-*` variables) applies only to DWC _Menu Item_ last items — DWC _Dropdown_ items are not turned into CTA buttons, even when their Appearance is set to `button` or `icon`.** To make a dropdown look like a button/icon, use the dropdown's own **Appearance** setting instead. For trailing dropdowns, this setting only serves to enable **Non-Button Items Alignment**. |
| **Non-Button Items Alignment** | Controls how the remaining items align (Left or Center) when Last Item is Button is active. **Note:** trailing icon/button-appearance DWC Dropdowns (e.g. a search or cart icon) are **right-aligned by default** — you do not need Last Item is Button to right-align them.                                                                                                                                                                                                                                |

### Mobile

| Setting                           | Description                                                                                                                                                                               |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Preview Mobile Menu**           | Opens the mobile menu in the builder canvas for previewing. Has no effect on the live site — the mobile menu is always available to users on mobile viewports.                            |
| **Mobile Breakpoint**             | The viewport width (in px) at which mobile mode activates. Below this value the hamburger is shown and the desktop nav is hidden.                                                         |
| **Mobile Menu Width**             | Width of the mobile sidebar/drawer panel.                                                                                                                                                 |
| **Mobile Menu Background**        | Background colour of the mobile panel.                                                                                                                                                    |
| **Slide In Direction**            | The edge (or effect) the mobile menu slides in from: **Right** (default), **Left**, **Top**, **Bottom**, **Right Top**, **Right Bottom**, or **Expand Down (from Header)**.               |
| **Submenu Reveal**                | How submenus open on mobile: **Expand** (push content down) or **Slide** (panel slides in from the side).                                                                                 |
| **Submenu Slideout Distance**     | Controls how far the parent level slides out of view when a submenu opens. If this value is less than 100%, the opacity must also be set to `0` to fully hide the parent.                 |
| **Submenu Slideout Opacity**      | Sets whether the parent level fades out as it slides away when a submenu opens.                                                                                                           |
| **Fade Items on Slide**           | Fades the menu items in or out as the submenu slides into or out of view.                                                                                                                 |
| **Mobile / Offcanvas Menu Speed** | Controls the animation speed of the menu opening and closing.                                                                                                                             |
| **Fullscreen Mobile Menu**        | The mobile menu opens above the header, covering the entire screen.                                                                                                                       |
| **Mobile Top Background**         | Background colour of the top bar area inside the mobile menu. Only applied when **Fullscreen Mobile Menu** is enabled, or when **Transparent Mobile Top** is disabled.                    |
| **Transparent Mobile Top**        | Makes the mobile top bar area transparent.                                                                                                                                                |
| **Hide Back Text**                | Shows only the back icon with no text label on the back button.                                                                                                                           |
| **Back Text Mode**                | Controls what the back button label shows: **Back to** displays "Back to \[Parent Name]" (e.g. "Back to Products"); **Title** displays the current dropdown's own name (e.g. "Products"). |
| **Back to Home Menu Text**        | The label shown on the back button at the root level of the drill-down menu when **Back Text Mode** is set to **Back to**. Defaults to "Main Menu".                                       |
| **Remove Menu Item Borders**      | Strips the divider lines between items in the mobile menu.                                                                                                                                |

### Dropdown

| Setting                           | Description                                                                                                                                                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Dropdown Content Shadow**       | Box shadow applied to all dropdown panels.                                                                                                                                                                               |
| **Dropdown Content Radius**       | Border radius of all dropdown panels.                                                                                                                                                                                    |
| **Blend Open Dropdowns**          | Removes the border radius between adjacent open dropdowns for a seamless, merged appearance.                                                                                                                             |
| **Dropdown Content Border Size**  | Thickness of the border around dropdown panels.                                                                                                                                                                          |
| **Dropdown Content Border Color** | Colour of the dropdown panel border.                                                                                                                                                                                     |
| **Global Nested Dropdown Width**  | Default width for all nested / flyout dropdown panels. Can be overridden per dropdown in the DWC Dropdown settings.                                                                                                      |
| **Global Mega Menu Width**        | Default width for all mega menu panels. Accepts any valid CSS width value — e.g. `1200px`, `100vw`, `var(--content-width)`, a class name, or an element ID. Can be overridden per dropdown in the DWC Dropdown settings. |
| **Global Inner Width**            | Maximum inner content width inside mega menu panels.                                                                                                                                                                     |
| **Dropdown Vertical Alignment**   | Aligns the top of dropdowns to the bottom of any specified CSS selector — useful for positioning dropdowns relative to a specific header row rather than the nav itself.                                                 |
| **Dropdown Offset Gap**           | Gap between the navigation bar and the top edge of top-level dropdown panels.                                                                                                                                            |
| **Nested Dropdown Offset Gap**    | Gap between a nestable parent dropdown item and its flyout panel.                                                                                                                                                        |
| **Caret**                         | Shows a small caret/pointer beneath the active nav item pointing toward the open dropdown.                                                                                                                               |
| **Arrow Visibility**              | Controls whether the chevron arrow on dropdown toggle buttons is visible.                                                                                                                                                |

### Interaction / UX

| Setting                                  | Description                                                                                                                                                                        |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dropdown Trigger Mode**                | Global default for how dropdowns open: **Hover or Click**, **Hover only**, or **Click only**. Individual dropdowns can override this with their own Dropdown Trigger Mode setting. |
| **Nested Dropdown Active Overlay**       | When a nested dropdown opens, a semi-transparent overlay dims the rest of the parent dropdown content.                                                                             |
| **Nested Dropdown Active Overlay Color** | The colour and opacity of that overlay.                                                                                                                                            |
| **Nested Dropdown Inactive Blur**        | Blurs the inactive content in the parent dropdown while a nested one is open.                                                                                                      |
| **Parent-Relative Nested Dropdown**      | Positions nested dropdown panels relative to their parent item instead of the full nav bar width.                                                                                  |
| **Menu Item Hover Effect**               | Animation on top-level nav items when hovered. **Text Roll** makes the text roll up on hover (desktop only).                                                                       |

### Backdrop

| Setting                           | Description                                                                |
| --------------------------------- | -------------------------------------------------------------------------- |
| **Hide Nav Backdrop**             | Removes the overlay that appears when the dropdown content opens.          |
| **Nav Backdrop Blur**             | Blur intensity of the nav backdrop.                                        |
| **Nav Backdrop Background Color** | Colour and opacity of the nav backdrop.                                    |

### Logo

| Setting                                 | Description                                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Centered Logo**                       | Moves the site logo into the centre of the nav list on desktop, with menu items on both sides.   |
| **Center Guide**                        | Shows a visual debug overlay to help align the centered logo (only visible to logged-in admins). |
| **Mobile Logo Size**                    | Controls the size of the logo displayed inside the mobile menu.                                  |
| **Hide Mobile Logo in Fullscreen Mode** | Hides the logo when the fullscreen mobile menu is active.                                        |

### Buffer

| Setting                          | Description                                                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Dropdown Buffer Height**       | An invisible hover bridge below the nav bar that prevents dropdowns from closing when the mouse moves from the nav item to the panel. |
| **Nested Dropdown Buffer Width** | An invisible hover bridge beside nested dropdown panels for the same purpose.                                                         |
| **Preview Buffer Zone**          | Builder-only: adds padding so dropdowns are fully visible in the editor canvas.                                                       |

### Other

| Setting             | Description                                                                    |
| ------------------- | ------------------------------------------------------------------------------ |
| **Primary Color**   | The primary theme colour for the menu, propagated as `--primary-clr` globally. |
| **Styling Classes** | Additional CSS class on the nav element for custom targeting.                  |

***

## CSS variables — `.dwc-nav-vars`

The `.dwc-nav-vars` class is already applied to the **DWC Nav** component by default. To customise, override any of the variables below in a Custom CSS block on the component, or in a separate custom stylesheet you create.

### Back button (mobile drill-down)

```css
.dwc-nav-vars {
  --back-text-clr: #000;          /* back button text colour */
  --back-text-font-size: 1rem;    /* back button font size */
  --back-text-font-weight: 600;
  --back-text-transform: uppercase;
  --back-text-bg: var(--mobile-menu-bg); /* background behind the back button row */
  --back-text-icon-size: 20px;    /* size of the back chevron icon */
}
```

### Menu item gap

```css
.dwc-nav-vars {
  --menu-items-gap: 0px; /* gap between top-level nav items */
}
```

### Mobile menu shape

```css
.dwc-nav-vars {
  --mobile-menu-radius: 0px;  /* border radius of the mobile panel */
}
```

### Mobile menu animation timing

```css
.dwc-nav-vars {
  --mobile-menu-ttf: cubic-bezier(0.3, 0.68, 0.1, 1); /* easing function for mobile menu transitions */
}
```

### Breakin container

When items are moved into the nav using the **Breakin** relocation mode, they land inside a `.breakin-container`. You can style it here:

```css
.dwc-nav-vars .breakin-container {
  padding-inline: var(--menu-item-inline-padding);
  padding-block: var(--menu-item-block-padding);
  background: #fff;
}
```

***

## Slots

| Slot                | Description                                                                                                                            |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `Nav_items`         | Top-level navigation items. Place DWC Dropdown and DWC Menu Item components here. Rendered inside `<ul class="dwc-nav-nested-items">`. |
| `Mobile_Logo`       | Logo shown inside the mobile panel. If left empty the desktop logo is automatically cloned into this slot.                             |
| `MobileTop_Content` | Extra content placed in the mobile top bar alongside the close button.                                                                 |

```js
const nav = findBlock(etch.blocks.getTree(), 1300);
const navItems   = nav.children.find(c => c.slotName === 'Nav_items');
const mobileLogo = nav.children.find(c => c.slotName === 'Mobile_Logo');
const mobileTop  = nav.children.find(c => c.slotName === 'MobileTop_Content');
```
