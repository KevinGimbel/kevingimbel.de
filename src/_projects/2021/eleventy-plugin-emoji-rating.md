---
title: "eleventy-plugin-emoji-rating"
subtitle: "Add fun ratings with emojis to eleventy"
type: project
tags:
  - 11ty
  - 11ty-plugin
  - eleventy
  - eleventy-plugin
date: "2021-01-26"
lastmod: "2021-01-26"

repo_url: "https://github.com/KevinGimbel/eleventy-plugin-emoji-rating"
npm_url: "https://npmjs.com/@kevingimbel/eleventy-plugin-emoji-rating"
---

This plugin adds a `rating` shortcode that shows a accessible rating, see examples below.

See [GitHub Readme](https://github.com/KevinGimbel/eleventy-plugin-emoji-rating) for setup instructions.

## Examples

The following ratings are all rendered with the plugin, see [source code of this page on GitHub](https://github.com/KevinGimbel/kevingimbel.de/tree/main/src/_projects/2021/eleventy-plugin-emoji-rating.md).

**Default**

{% rating "3" %}

**Custom emoji**

{% rating "5" "🤦‍♀️" %}

**Custom emoji and custom length**

{% rating "5" "🎥" "" "7" %}

**Any symbol can be used!**

{% rating "3" "1" "0" "10" %}