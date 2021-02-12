---
title: "No Tracking"

type: blog
categories:
    - coding
tags:
    - security
    - surveillance
    - capitalism
    - code

date: "2020-01-29"
lastmod: "2020-01-29"
---

**I don't track you.** That's a promise and a statement, this website works without Tracking.

Inspired by [Laura Kalbag](https://laurakalbag.com/i-dont-track-you/), who was inspired by [the footer text on Karolina Szczur’s website](https://thefox.is/).

## Why

The reason I do not use tracking is an idealistic one. I no longer want to collect data for Google, and I do not want to support trackable users across websites.

Data sharing on the web is absolutely crazy, as this example of USAToday shows - {% abbr "GDPR", "General Data Protection Law" %} is saving us Europeans again tho.

{% mastodon "https://mastodon.sdf.org/@tomasino/103536972269541464" %}

I do not wish to be part of this, so this website uses no tracking codes. No ads, no {% abbr "CDN", "Content Delivery Network, a central storage for assets such as JavaScript libraries" %}. For Embeds I have copied the JavaScript and inlined it so that it does not do any requests to third-party websites when possible.

## What can YOU do?

### Firefox + Addons

I recommend [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/) as a more privacy-focused browser, with the following extensions:

- [Privacy Badger](https://addons.mozilla.org/en-US/firefox/addon/privacy-badger17/) by EFF
- [uBlock Origin](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin)

Privacy Badger blocks tracking tools and uBlock Origin blocks a whole lot of stuff, including ads (see [github.com/gorhill/uBlock](https://github.com/gorhill/uBlock) for more information). I'm no longer using the web without these two. Both addons are also available for Firefox on Android.

### Remove Analytics from your website

If you do not need it, remove Analytics from your website. If you need it, use a privacy-focused alternative to Google Analytics such as [Matomo](https://matomo.org/) (previously known as Piwik).

By not using tracking software - and not relying on hundreds (or tens) of external libraries and tools you can make the web better for everyone.
