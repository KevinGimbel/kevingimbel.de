---
title: "Safe calc usage in CSS"
subtitle: "Using CSS `calc` function reasonable and with fallbacks"
type: blog
categories:
    - coding
    - frontend
    - tutorial
tags:
    - css
    - calc
    - fallback
date: "2020-01-01"
lastmod: "2020-01-02"
aliases:
    - 
---

`calc` is a great CSS function to calculate values, e.g. margins or widths. What makes it especially great is that it can combine different values, for example `calc(100% - 4rem - 1px)` is valid and works in modern browsers - in simpler words: Calc works with different units like `em`, `%`, `px`, etc.

The problem with calc is that if it doesn't work you may get a unexpected result. Take the following code for example:

```css
.author {
    padding: 4rem 2rem;
    width: calc(100% + 4rem + 2px);
    margin-left: -2rem;
    margin-top: 2rem;
}
```

This code calculates the width of the element by taking into account the paddings and borders, then offsets the element to the left (`margin-left: -2rem`) so it appears to be full-width. If calc does not work, the element will just be moved to the left and appears off-center - it looks wrong and unexpected.
 
A more robust version is to also calculate the offset. This version is shown below:

```css
.author {
    padding: 4rem 2rem;
    width: calc(100% + 4rem + 2px);
    margin-left: calc(0rem - 2rem - 1px);
    margin-top: 2rem;
}
```

If calc does not work, both the `width` and `margin-left` are ignored and the box appears just as any other content would, without any offset to the left. The interesting part is the second `calc`: 

```css
.offset-example  {
    margin-left: calc(0rem - 2rem - 1px);
}
```

By using `0rem - 2rem` we can create a `-2rem` offset to the left. The `1px` is the border around the parent element which appears on both sides, so we add that to our calculation to stay within the border - otherwise it would look wrong again.

## Update

Due to changes during development, the changes described here are not available on my website.
