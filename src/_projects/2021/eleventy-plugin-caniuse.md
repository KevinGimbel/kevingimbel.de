---
title: "eleventy-plugin-caniuse"
subtitle: "Integrate caniuse with eleventy"
type: project
tags:
  - 11ty
  - 11ty-plugin
  - eleventy
  - eleventy-plugin
date: "2021-01-23"
lastmod: "2021-01-23"

repo_url: "https://github.com/KevinGimbel/eleventy-plugin-caniuse"
npm_url: "https://npmjs.com/@kevingimbel/eleventy-plugin-caniuse"
---

This plugin integrate [caniuse](https://caniuse.com/) with [Eleventy](https://11ty.dev/) and provides a shortcode to integrate any feature table. This plugin uses the excellent [caniuse-embed](https://github.com/ireade/caniuse-embed) by [Ire Aderinokun](https://ireaderinokun.com/)

See [GitHub Readme](https://github.com/KevinGimbel/eleventy-plugin-caniuse) for setup instructions.

## Examples

The following tables are all rendered with the plugin, see [source code of this page on GitHub](https://github.com/KevinGimbel/kevingimbel.de/tree/main/src/_projects/2021/eleventy-plugin-caniuse.md).

{% caniuse "css-overflow-overlay" %}

{% caniuse "flexbox" %}

{% caniuse "background-clip-text" %}

{% caniuse "es6" %}