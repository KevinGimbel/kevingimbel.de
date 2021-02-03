---
title: "Random Theme"

type: blog
categories:
    - coding
    - frontend
    - tutorial
tags:
    - web
    - css
    - javascript
date: "2020-03-24"
lastmod: "2020-03-24"
---

I've decided to add some randomness to this website! You may noticed that the two main colors change on every page reload - there's a fixed number of "themes" available and they change at random.

To accomplish this I used the following JavaScript.

```js
(function(window, document, undefined) {
let theme = window.localStorage.getItem("kgde_theme");
console.log(theme);
if (theme) {
    var [colorMain, colorSecondary] = JSON.parse(theme).colors;
    document.body.style = `--color-main:${colorMain};--color-secondary:${colorSecondary}`;
} else {
    // [dark-color, light-color]
    // Color combinations taken from https://botsin.space/@accessibleColors
    let themes = [
        ["#123D3C", "#90F072"],
        ["#403D58", "#dea584"],
        ["#400E3B", "#DCC78A"],
        ["#17098D", "#EADD1C"],
        ["#233B07", "#FFDD6D"]
    ]
    var [colorMain, colorSecondary] = themes[Math.floor(Math.random() * themes.length)];
    document.body.style = `--color-main:${colorMain};--color-secondary:${colorSecondary}`;
}
document.addEventListener('DOMContentLoaded', function() {
    let schema_btn = document.querySelector("#btn_schema");
    let theme = window.localStorage.getItem("kgde_theme");
    if (theme) {
        schema_btn.textContent = "Use random color theme";
    } else {
        schema_btn.textContent = "Keep current color theme";
    }
    schema_btn.style.display = "block";
    schema_btn.addEventListener('click', function(e) {
        if (theme) {
            window.localStorage.removeItem("kgde_theme");
            window.reload();
        } else {
            window.localStorage.setItem("kgde_theme", JSON.stringify({colors: [colorMain, colorSecondary]}));
        }
    });
});
}(window, document));
```

Quite a lot isn't it? Let's break that down. 

### Random array elements

The theme logic is all in this JavaScript snippet. By using nested array and [destructing assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) we can get a theme consisting of a primary and secondary color. These color combinations are hand-picked from the [@accessibleColors](https://botsin.space/@accessibleColors) bot.

```js
let themes = [
    ["#123D3C", "#90F072"],
    ["#403D58", "#dea584"],
    ["#400E3B", "#DCC78A"],
    ["#17098D", "#EADD1C"],
    ["#233B07", "#FFDD6D"]
]
var [colorMain, colorSecondary] = themes[Math.floor(Math.random() * themes.length)];
```

Having the values I then store them in a `localStorage` entry if the user clicks on "Keep this color theme". To do this, we first need to get the button element and the local storage item like so: 

```js
let schema_btn = document.querySelector("#btn_schema");
let theme = window.localStorage.getItem("kgde_theme");
```
Then we can decide what text should be inside the button...

```js
if (theme) {
    schema_btn.textContent = "Use random color theme";
} else {
    schema_btn.textContent = "Keep current color theme";
}
```
... and set the button to `display: block` - by default it is hidden with `display: none` so that people without JavaScript enabled don't see a useless button (they also don't see random themes!).

```js
schema_btn.style.display = "block";
```

And finally, we assign a `click` event listener and check if the `theme` is set, which means the button click resets the current theme and reloads the site, or if the theme is not set and the current schema should be safed.

```js 
schema_btn.addEventListener('click', function(e) {
    if (theme) {
        window.localStorage.removeItem("kgde_theme");
        window.reload();
    } else {
        window.localStorage.setItem("kgde_theme", JSON.stringify({colors: [colorMain, colorSecondary]}));
    }
});
```

If you don't like the current colors just refresh until you find the one you like. 😁

If this is a horrible addition to my website and you want a permanent off button - please [let me know](https://bullgit.party/@kevin "Contact me on Mastodon")!
