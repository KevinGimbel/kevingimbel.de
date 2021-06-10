---
title: "Darken and Lighten colors with CSS"
subtitle: "Recreating SASS darken() & lighten() function with CSS variables and calc"
type: blog
categories:
  - coding
tags:
  - frontend
  - css
date: "2021-06-08"
lastmod: "2021-06-08"

head: null
foot: null
svg_title: null

draft: true
---

The technique shown in this post uses the `hsl` color format in combination with the `calc` CSS function to calculate darker or lighter shades of a base color.

Before we get into the code I want to make sure **I did not come up with this**, I found the code on [StackOverflow](https://stackoverflow.com/a/55330103) and only want to write about it to keep it on my site for future reference! :)

## The code

```css
:root {
  --color: 0, 100%; 
  --l:50%;
    
  --color-primary: hsl(var(--color),var(--l));
  --color-primary-darker: hsl(var(--color),calc(var(--l) - 10%));
  --color-primary-darkest: hsl(var(--color),calc(var(--l) - 30%)); 
}
```

Here we define a color variable named `--color` that holds the first two values of a `hsl` color definition: The _hue_ and _saturation_ value. The third value, _lightness_ is calculated based on the default lightness value (`--l`).

The [HSL color function](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl()) takes three values:

- **H** is the `hue`, a number from 0 to 360
- **S** is the `saturation`, in percent 0 to 100
- **L** is the `lightness`, in percent from 0 to 100

The lightness can be increased to make the color lighter and decreased to make it darker.

## The result

{% codepen "jOBKjar" %}

We can also apply the variables on a class level instead of the `:root` element so they are calculated every time the class is used, which enables "theming", as the following CodePen shows. 

The `green` and `blue` class set different values for `--color`, therefore changing the values of `--color-primary`, `--color-primary-darker`, and `--color-primary-darkest`.

{% codepen "zYZaVPp" %}

Below is the new CSS code.

```css
:root {
  --color: 0, 100%;
  --l:50%; /*the initial lightness*/
}

.darken {
  --color-primary: hsl(var(--color),var(--l));
  --color-primary-darker: hsl(var(--color),calc(var(--l) - 10%));
  --color-primary-darkest: hsl(var(--color),calc(var(--l) - 30%)); 
  
  color: var(--color-primary-darkest);
  background: var(--color-primary);
}

.green {
  --color:120, 50%;
}

.blue {
  --color:245, 60%;
  --l: 80%;
}
```

## lighten

The `lighten` function works in the same way, just that it would increase the lightness instead of decreasing it.

```css
.lighten {
  --color: 0, 100%; 
  --l:50%;
    
  --color-primary: hsl(var(--color),var(--l));
  --color-primary-lighter: hsl(var(--color),calc(var(--l) + 10%));
  --color-primary-lightest: hsl(var(--color),calc(var(--l) + 30%)); 
}
```

## Browser Support

Just for completeness, here's the Browser support. It's looking _pretty good_ with over 90% for both features used (as of June 2021).

{% caniuse "calc" %}
{% caniuse "css-variables" %}

## Further reading

- [hsl on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl())
- Example Pen 1 [codepen.io/kevingimbel/pen/jOBKjar](https://codepen.io/kevingimbel/pen/jOBKjar)
- Example Pen 2 [codepen.io/kevingimbel/pen/zYZaVPp](https://codepen.io/kevingimbel/pen/zYZaVPp)
