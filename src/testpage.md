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

## QuoteFM style quote

{% quotefm "https://visuellegedanken.de/2013-04-16/danke-fur-die-tolle-zeit-mit-quote-fm/" %}
In den letzten Monaten war es schon relativ still um QUOTE.fm und das ist auch kein Zufall. Seit heute ist es nämlich offiziell: Marcel, Philipp, Flo und ich werden QUOTE.fm in Zukunft nicht weiter entwickeln und betreuen.
{% endquotefm %}

QUOTE.fm was a German start-up that build a sort-of social network around link sharing, with quotes of text being the center. It was quite interesting and I enjoyed using it, sadly there was no real business model in place and so the service had to shut down. There is still a screenshot on [visuellegedanken.de](https://visuellegedanken.de/2012-03-08/wir-haben-die-recommendations-optisch-verbessert/). The design you see above is directly taken from [Martin Wolf's CodePen here](https://codepen.io/martinwolf/pen/lkfGJ).