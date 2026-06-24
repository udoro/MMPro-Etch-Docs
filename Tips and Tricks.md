# Etch Mega Menu Pro + Header Builder Tips and Tricks

## How to change logo element on hover when using special sticky/overlay styles

To change the logo on hover when using the special sticky/overlay styles, you'll need to use the logo as a background image and swap the background URL when the menu is hovered or opened. You can add the following CSS to your Custom CSS section:

```css
.dwc-nest-menu__logo {
  & > * {
    display: none;
  }
  background-image: url(https://etch.designwithcracka.com/wp-content/uploads/2026/01/dwc-logo-gradient-bold-update.svg);
  width: 156px;
  height: 60px;
  background-repeat: no-repeat;
  object-fit: contain;
  transition: 0.4s;
  background-position: center center;
}
html:not(.dwc-mobile):has([data-sticky-overlay-special-style='true'][data-sticky-header='true']):not(:has([data-no-sticky], [data-no-overlay-style])) body:has(.dwce-dropdown.open, .dwc-nav-nested-items > li:hover) .dwc-nest-menu__logo {
  background-image: url(https://cdn.prod.website-files.com/6756af8bdb09e2801688ef7d/67586ecbf957bd6537a6ad14_logo.svg);
}
```

Replace the urls with your logo urls. You may need to adjust the width and height values to match the dimensions of your logo for the best result.

## How to change the logo size on scroll

The sticky header visibility functionality adds two classes to the <body> element, one when scrolling up and another when scrolling down.
We can use these classes to target the logo and hide it while scrolling.

```css
@media (width > 1330px) {

.dwc-nest-menu__logo{
    transition: 0.4s ease-in !important;
}

:where(.scroll-up, .scroll-down) .dwc-nest-menu__logo{
    opacity: 0;
    inline-size: 0 !important;
    padding-inline: 0 !important;
}

}
```