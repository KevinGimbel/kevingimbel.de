---
title: "Hugo aliases and redirects"
subtitle: "Using aliases to prevent 404 when restructuring your Hugo site"
type: blog
categories:
    - coding
    - frontend
tags:
    - hugo
    - ssg
    - seo
date: "2020-01-06"
lastmod: "2020-01-06"
---

With the recent redesign and re-structuring of my website I decided to include year and month in URLs. I previously only used the post title as URL key, so a post with title `Hello world` would be available at `kevingimbel.de/hello-world`. With the new format this includes the section, year, and month, so for example `kevingimbel.de/blog/2020/01/hello-world`. 

To prevent all old URLs from failing with a 404 I added aliases to all old posts. [The documentation on aliases](https://gohugo.io/content-management/urls/#aliases) is pretty short and they're a straight-forward, powerful tool to make content available under multiple URL paths. Just add an alias list to the front-matter of the post.

```yaml
---
title: "My awesome post"
aliases:
  - /my-awesome-post/
  - /2020-1/
---
```

The above would make the post available at `kevingimbel.de/2020-1/`, `kevingimbel.de/my-awesome-post/`, and `kevingimbel.de/blog/2020/01/my-awesome-post`. 

Hugo creates a HTML page for each alias with the following content

```html
<!DOCTYPE html>
<html>
  <head>
    <title>https://example.com/posts/my-intended-url</title>
    <link rel="canonical" href="https://example.com/posts/my-intended-url"/>
    <meta name="robots" content="noindex">
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <meta http-equiv="refresh" content="0; url=https://example.com/posts/my-intended-url"/>
  </head>
</html>
```

The line `<meta http-equiv="refresh" content="0; url=https://example.com/posts/my-intended-url"/>` refreshes the page after 0 seconds (immediately) and redirects to the new page at `https://example.com/posts/my-intended-url`.

With this little bit of extra work all old URLs should work and just redirect to the new pages.
