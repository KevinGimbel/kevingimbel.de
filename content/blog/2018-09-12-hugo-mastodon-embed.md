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

You may know that [I made some shortcodes for Hugo](https://github.com/kevingimbel/hugo-shortcodes), the static site generator I am using to create this website. So far I made a shortcode for [caniuse.com](https://caniuse.com) and [codepen.io](https://codepen.io) which allow to embed CodePen and "Can I Use" embeds easily with Hugos build-in Shortcode system.

Today I made another one which allows embeds from Mastodon, the decentralized Twitter-like social network. An example embed is shown below.

{{< mastodon status="https://mastodon.social/@kevingimbel/100700713283716694" width="600" >}}

The Source Code can be found [on GitHub.com](https://github.com/kevingimbel/hugo-shortcodes/tree/master/mastodon)
## Configuration

The shortcode is fairly simple and requires only one attribute: The link to a single toot, e.g. [https://mastodon.social/@kevingimbel/100700713283716694](https://mastodon.social/@kevingimbel/100700713283716694).

```
{{</* mastodon status="https://mastodon.social/@kevingimbel/100700713283716694" */>}}
```

Additional parameters:

```
# All parameters
{{</* mastodon status="https://mastodon.social/@kevingimbel/100700713283716694" width="1000" height="500" */>}}
```

Below is a short description for each parameter

| Parameter | Value |
|-----------|-------|
|`status`| The link to the status |
|`width`| The width of the iframe |
|`height`| The height of the iframe |

## Examples 

{{< mastodon status="https://mastodon.social/@rootsworks/100666238685414786" >}}
{{< mastodon status="https://mastodon.social/@prashere/539624" width="300" >}}
{{< mastodon status="https://octodon.social/@spacekookie/100680807257148198" width="800">}}