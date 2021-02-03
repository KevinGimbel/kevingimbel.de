---

title: "This week on the internetz"
subtitle: "Not-so-weekly recap of articles from around the internet"

# content type, can be: blog, link, photography, ...
type: blog

# Taxonomy
categories:
    - links
tags:
    - "this-week-on-the-internetz"
    - link
series: "this-week-on-the-internetz"

# Exclude this article when rendered in certain sections, e.g. "home"
exclude_from: 
    - "home"

# Date fields
date: "2021-01-29"
lastmod: "2021-01-29"

# Art style fields
svg_title: null
head: null
foot: null
---

Hello and welcome to the first ever _"[This week on the internetz](/tags/this-week-on-the-internetz)"_, a place where I collect articles I've read and stuff I've found on the internet this past week.

## Web Dev

{% quotefm "https://daverupert.com/2021/01/art-direction-for-static-sites/" %}
Your personal site is your playground. Overhearing some recent chatter about putting the personality back in personal websites, I thought it might be helpful to share how I’ve been approaching art direction on my blog. I have a bit of experience here, in fact years ago during the heyday of “blogazines”, I forked and maintained an art direction plug-in for WordPress.
{% endquotefm %}

[Dave Rupert](https://daverupert.com/) shares his take on art direction for the web and how he build his blog/website to allow for per-page customization. This article was a eye-opener for me and I'm trying to adopt more art direction for my own blog going forward!

## InfoSec 


{% quotefm "https://www.bleepingcomputer.com/news/security/europol-emotet-malware-will-uninstall-itself-on-march-25th/" %}
According to milkream, Emotet is now using the following command and control server IP, all located in Germany. [...] In a phone call with Europol's press office, BleepingComputer was told that the German Bundeskriminalamt (BKA) federal police agency was responsible for this action. The press office, though, did not know the date that law enforcement would uninstall the malware.
{% endquotefm %}

An effort lead by Europol has taken over the [Emotet](https://en.wikipedia.org/wiki/Emotet "Emotet Wikipedia article") maleware command servers. The German Bundeskriminalamt is sending an uninstall command on March 25th, effectively automatically uninstalling Emotet from all affected systems.

--- 

{% quotefm "https://stackoverflow.blog/2021/01/25/a-deeper-dive-into-our-may-2019-security-incident/" %}
Using the account identifier that had been escalated, we were able to use the IP address and other identifying information to correlate traffic to a candidate set of rows. This amounted to well over 75,000 rows of data that we then set out to categorise. Based upon that categorisation, we were able to further filter out rows to those that were deemed “interesting.” Coupled with other information from our customer support team and various other sources of log data, we came up with a timeline of events. 
{% endquotefm %}


StackOverflow has released a detailed report of a 2019 security incident. They were able to trace the activity of the hacker and could see they were actively search Stack Exchange websites for information as they found out more about the StackOverflow infrastructure. 

---

{% quotefm "https://blog.google/threat-analysis-group/new-campaign-targeting-security-researchers/" %}
In addition to targeting users via social engineering, we have also observed several cases where researchers have been compromised after visiting the actors’ blog. In each of these cases, the researchers have followed a link on Twitter to a write-up hosted on [redacted], and shortly thereafter, a malicious service was installed on the researcher’s system and an in-memory backdoor would begin beaconing to an actor-owned command and control server.
{% endquotefm %}


Google's Threat Analysis Group claims to have identified a North Korean government backed hacking campaign targeting security researchers. What stands out for me personally is that it seems the compromise happened while visiting the hackers blog. A reminder that **no browser is 100% secure and we should all be careful**!

---

## Anything else

### Dogecoin ($DOGE)

After Reddit users [sky-rocketed the GameStop Stock](https://www.theguardian.com/business/2021/jan/27/gamestop-stocks-us-hedge-fund-pulls-out-after-heavy-losses?CMP=Share_iOSApp_Other) the next big thing is investing in Dogecoin, a sort of meme cryptocurrency. It looks promising and is super cheap right now, so I invested a bit as well. Let's see where this is going! For historical purpose, here's a screenshot of the Dogecoin price, taken from [bitpanda.com](https://www.bitpanda.com/en/prices/dogecoin).

{% figure "dogecoin-stonks.png" "Price for 1 Dogecoin ($DOGE) as of 29. January 2021, 13:37" %}