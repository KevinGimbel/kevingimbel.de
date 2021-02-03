---
title: "::selection"
subtitle: null

# content type, can be: blog, link, photography, ...
type: blog

# Taxonomy
categories:
    - coding
tags:
    - link
    - tumblr-imported

# Exclude this article when rendered in certain sections, e.g. "home"
exclude_from: 
    - "home"

# Date fields
date: "2012-10-14"
lastmod: "2012-10-14"

# Art style fields
svg_title: null
head: |
  <style>
  .demo-1::selection { background:#279; color:#fff; }
  .demo-2::selection { background:hotpink; color:#000; }
  </style>

foot: null
---

Using `::selection` for fancy selection colors.

```css
::selection {background:#279; color:#fff;}
::-moz-selection {background:#279; color:#fff;}
::-webkit-selection {background:#279; color:#fff;}
```

<span class="demo-1">Try to select this text, the background will be #279 the color will be #fff.</span>

<span class="demo-2">Also try to select this text. The color will be pink, the background will be black.</span>

---

_This post was imported from my old Tumblr blog I used in 2012._