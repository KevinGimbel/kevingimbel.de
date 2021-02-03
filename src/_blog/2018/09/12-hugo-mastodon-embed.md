---
title: "Mastodon Embed Shortcode for hugo"
date: 2018-09-12T00:00:00Z
categories: 
    - coding
    - frontend
tags:
    - shortcode
    - hugo
    - mastodon
aliases:
    - /mastodon-embed-shortcode-for-hugo/
---

{% note "warn" %}
This website **no longer uses Hugo**. The Mastodon embed doesn't work as of January 2021 and I'm not sure if I'll implement it again for 11ty, the new static site generator used for this website.

For this reason, the embed examples in this post do not work.
{% endnote %}

You may know that [I made some shortcodes for Hugo](https://github.com/kevingimbel/hugo-shortcodes), the static site generator I am using to create this website. So far I made a shortcode for [caniuse.com](https://caniuse.com) and [codepen.io](https://codepen.io) which allow to embed CodePen and "Can I Use" embeds easily with Hugos build-in Shortcode system.

Today I made another one which allows embeds from Mastodon, the decentralized Twitter-like social network. An example embed is shown below.

{% mastodon "https://mastodon.social/@kevingimbel/100700713283716694" "600" %}

The Source Code can be found [on GitHub.com](https://github.com/kevingimbel/hugo-shortcodes/tree/master/mastodon)
## Configuration

The shortcode is fairly simple and requires only one attribute: The link to a single toot, e.g. [https://mastodon.social/@kevingimbel/100700713283716694](https://mastodon.social/@kevingimbel/100700713283716694).

```
{% raw %}{{ mastodon "https://mastodon.social/@kevingimbel/100700713283716694" }}{% endraw %}
```

Additional parameters:

```
# All parameters
{% raw %}{{ mastodon "https://mastodon.social/@kevingimbel/100700713283716694" "1000" "500" }}{% endraw %}
```

Below is a short description for each parameter

| Parameter | Value |
|-----------|-------|
|`status`| The link to the status |
|`width`| The width of the iframe |
|`height`| The height of the iframe |

## Examples 

{% mastodon "https://mastodon.social/@rootsworks/100666238685414786" %}
{% mastodon "https://mastodon.social/@prashere/539624" "300" %}
{% mastodon "https://octodon.social/@spacekookie/100680807257148198" "800"%}