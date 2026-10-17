---
icon: pen-to-square
---

# Documentation

**Etch Mega Menu Pro + Header Builder** is a premium navigation system built for the Etch page builder for WordPress. It provides a fully-featured, accessible header and navigation solution — from a simple responsive menu to a complex mega menu with offcanvas, fullscreen mobile, stripe animation, and centered logo support.

***

## What's included

**Etch Mega Menu Pro + Header Builder** ships seven builder components. Each component handles a distinct part of the header and navigation system:

| Component                                            | Purpose                                                                                                                               |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [DWC Header](components/dwc-header.md)               | The outermost header wrapper — controls sticky, overlay, and accessibility settings                                                   |
| [DWC Nav](components/dwc-nav.md)                     | The navigation element — controls menu mode, animation, mobile behaviour, dropdowns, and logo                                         |
| [DWC Dropdown](components/dwc-dropdown.md)           | A single top-level nav item with a dropdown or mega menu panel                                                                        |
| [DWC Menu Item](components/dwc-menu-item.md)         | A plain nav link — supports badges, visibility rules, and responsive relocation                                                       |
| [DWC Mobile Toggle](components/dwc-mobile-toggle.md) | The hamburger button that opens and closes the mobile menu                                                                            |
| [DWC Tabbed Nav](components/dwc-tabbed-nav.md)       | A mega menu panel with tabs down the side. See [Tabbed Navigation](tabbed-navigation.md)                                              |
| [DWC Tab](components/dwc-tab.md)                     | One tab inside a DWC Tabbed Nav: its name and its content                                                                            |
| [AI Connector](https://design-with-cracka.gitbook.io/megamenupro/ai-connector) | Control MMPro through a conversational AI agent — setup guide, requirements, and the Skills File your agent needs to load |

Lite ships five of these. It doesn't have DWC Tabbed Nav or DWC Tab.

***

## Full or Lite

Both versions share the same components, menu, mega menus, mobile menu and styling. Lite leaves out some features to keep the code smaller. The components have the same names in both, so use one version per site.

| Feature | Full | Lite |
| --- | --- | --- |
| Mega menus, dropdowns, nested dropdowns, mobile menu | Yes | Yes |
| Sticky and overlay header, [Special Sticky / Overlay Styles](special-styles.md) | Yes | Yes |
| [Open in Menu](open-in-menu.md) | Yes | Yes |
| Offcanvas mode: the mobile menu on desktop ([DWC Nav](components/dwc-nav.md#menu-mode)) | Yes | No |
| Stripe Style and Adaptive Height (animated mega menu panel) | Yes | No |
| Swipe to close and its tooltip | Yes | No |
| Auto menu expansion (opens the current page's submenu on mobile) | Yes | No |
| [Tabbed Navigation](tabbed-navigation.md) | Yes | No |
| Liquid Glass header | Yes | No |
| Hiding or showing one header row on scroll (Lite keeps **Hide All Rows** and **Reverse**) | Yes | No |
| Text Roll hover effect | Yes | No |
| Centered logo | Yes | No |
| Moving items in and out of the mobile menu (Breakout, Breakin, Breakinto) | Yes | No |

In these docs, props, variables and options marked **Full only** aren't in Lite.

***

## How props and CSS variables work together

Each component has two layers of customisation:

1. **Component props** — Settings you configure directly in the Etch builder panel. These control behaviour (sticky, offcanvas, slide direction, etc.) and generate the correct HTML attributes and inline styles automatically.
2. **CSS variables** — Each component ships with a dedicated styling class already applied (e.g. `.dwc-nav-vars`, `.dwc-top-level-items-vars`). You do not need to add these classes yourself. Simply override the variables in a Custom CSS block on the component, or in a separate custom stylesheet you create, to control colours, spacing, typography, and more — without touching any component props. Do not edit the built-in stylesheet.

The component docs each include a full reference of available CSS variables and what they control.
