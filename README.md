---
icon: pen-to-square
---

# Documentation

**Etch Mega Menu Pro + Header Builder** is a premium navigation system built for the Etch page builder for WordPress. It provides a fully-featured, accessible header and navigation solution — from a simple responsive menu to a complex mega menu with offcanvas, fullscreen mobile, stripe animation, and centered logo support.

***

## What's included

**Etch Mega Menu Pro + Header Builder** ships five builder components. Each component handles a distinct part of the header and navigation system:

| Component                                            | Purpose                                                                                                                               |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [DWC Header](components/dwc-header.md)               | The outermost header wrapper — controls sticky, overlay, and accessibility settings                                                   |
| [DWC Nav](components/dwc-nav.md)                     | The navigation element — controls menu mode, animation, mobile behaviour, dropdowns, and logo                                         |
| [DWC Dropdown](components/dwc-dropdown.md)           | A single top-level nav item with a dropdown or mega menu panel                                                                        |
| [DWC Menu Item](components/dwc-menu-item.md)         | A plain nav link — supports badges, visibility rules, and responsive relocation                                                       |
| [DWC Mobile Toggle](components/dwc-mobile-toggle.md) | The hamburger button that opens and closes the mobile menu                                                                            |
| [AI Connector](https://design-with-cracka.gitbook.io/megamenupro/ai-connector) | Control MMPro through a conversational AI agent — setup guide, requirements, and the Skills File your agent needs to load |

***

## How props and CSS variables work together

Each component has two layers of customisation:

1. **Component props** — Settings you configure directly in the Etch builder panel. These control behaviour (sticky, offcanvas, slide direction, etc.) and generate the correct HTML attributes and inline styles automatically.
2. **CSS variables** — Each component ships with a dedicated styling class already applied (e.g. `.dwc-nav-vars`, `.dwc-top-level-items-vars`). You do not need to add these classes yourself. Simply override the variables in a Custom CSS block on the component, or in a separate custom stylesheet you create, to control colours, spacing, typography, and more — without touching any component props. Do not edit the built-in stylesheet.

The component docs each include a full reference of available CSS variables and what they control.
