---
title: "Hugo: ignore _index.md in list templates"
intro_text: "How I ignore _index.md files in my list templates"
type: blog
categories:
    - coding
    - frontend
    - tutorial
tags:
    - hugo
    - cms
    - static_website
date: "2020-01-03"
lastmod: "2020-01-03"
---

While creating my new website I also added more sections, namely a [blog](/blog/), [photography](/photography/), and [art](/art/) section. All of these use list templates and render "article"-like content previews. I wanted to add some content to these lists and Hugo has a special file named `_index.md` for that. This file can be used to create index pages for lists.

When I did that I somehow also included the index files in the post listings which was not what I wanted, so I added a if statement to my `article-preview.html` template that is used to render article previews.

```html
{{ if ne .File.LogicalName "_index.md" }}
<article class="article article--in-list" aria-labelledby="article-heading-{{ .File.UniqueID }}">
    [...]
</article>
{{ end }}
```

`{{ if ne .File.LogicalName "_index.md" }}` checks if the file name is not `_index.md` - this will ignore all `_index.md` files from being rendered with the `article-preview.html` template.

It does the job but feels wrong and hacky, so if you know a better solution, please let me know on [GitHub](https://github.com/kevingimbel/kevingimbel.de "Report issue on GitHub") or [Mastodon](https://bullgit.party/@kevin "Contact me on Mastodon").