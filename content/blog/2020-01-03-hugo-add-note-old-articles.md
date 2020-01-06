---
title: "Hugo: compare dates to flag old content"
intro_text: "How I use Math and Date functions to flag old posts in Hugo"
type: blog
categories:
    - coding
    - frontend
    - tutorial
tags:
    - hugo
    - cms
    - static_website
date: "2020-01-02"
lastmod: "2020-01-02"
---

With the recent redesign of my website I also wanted to add a note to old articles. The IT world is changing fast and information can quickly be outdated, so I decided to add an automatically generated note to every post that is older than 4 years. Using the Hugo [Math](https://gohugo.io/functions/math/) function and [Date](https://gohugo.io/variables/page/#page-variables) values it can be accomplished in automated-enough fashion.

### Partial

First I created a new partial named `single-header.html` and added it to all my `single.html` templates. The file contains the following code which I will explain step by step.

```html
{{ $now := int (now.Format "2006") }}
{{ $article_age := sub $now (int (.Date.Format "2006")) }}

{{ if gt $article_age 4 }}
<section class="age-note">
    <h2>ATTENTION!</h2>
    <p>This article is over 4 years old, it may be outdated!</p>
</section>
{{ end }}
```

The magic all happens in the first 2 lines. First the "now" time is retrieved, this is the build time - not the current time when the page is loaded in the browser. Then we calculate the different using the Hugo built-in  `sub` function, giving the two dates in year format (`2020`, `2015`, ...) as arguments.

```bash
$article_age := sub $now (int (.Date.Format "2006"))
# For an aricle written in 2013 the code looks like
# $article_age = sub 2020 2013
```

After filling in all variables and doing the subtraction, the `$article_age` variable contains an integer, like `7` or `3`. The next line of code checks if the number `$article_age` is greater than 4, which means the article is older than 4 years. If this is true, the note is displayed.

```html 
{{ if gt $article_age 4 }}
    $article_age is greater than 4
{{ end }}
```

Because we are doing a `gt` (greater than) comparison only articles that are older than 4 years (5 and more) will be flagged.

## See it in action

A live example can be seen on my page, for example in the [oldest post "Hello world"](/blog/2013-08-12-hello-world/) or in any post from [2015 and before](http://localhost:1313/blog/#2015).