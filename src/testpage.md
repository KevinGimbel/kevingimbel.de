---
layout: single
title: "Test page"
---

This page is used to test custom shortcodes and template features.

## Rating shortcode

{% rating "3" %}

{% rating "4" "🚀" %}

## caniuse shortcode

{% caniuse "css-grid" %}

## Break out

### break out left
{% breakout "left" %}
> to boldly go where no one has gone before

This quote from Star Trek breaks-out of the centered layout to the left.
{% endbreakout %}

### break out right
{% breakout "right" %}
!["By https://unsplash.com/@isaac_slo"](https://images.unsplash.com/photo-1611165243857-d8b0ff81ba63?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)

&mdash; via [https://unsplash.com/@isaac_slo](https://unsplash.com/@isaac_slo)
{% endbreakout %}

## Figure

{% figure "https://images.unsplash.com/photo-1611300494368-a84f7109804c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80" "Image from [unsplash.com/@hanzlog](https://unsplash.com/@hanzlog)" "Some alt text!" %}


{% figure "https://images.unsplash.com/photo-1611202335895-dbc066c3572a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80" "Image from [unsplash.com/@hanzlog](https://unsplash.com/@hanzlog)" "Some alt text!" %}

{% breakout "left" %}
{% figure "https://images.unsplash.com/photo-1611026915635-eb5951d0b69b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80" "Image from [unsplash.com/@hanzlog](https://unsplash.com/@hanzlog)" "Some alt text!" %}

{% endbreakout %}