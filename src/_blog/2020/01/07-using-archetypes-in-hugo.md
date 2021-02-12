---
title: "Using Archetypes in Hugo"
# 
type: blog
categories:
    - coding
tags:
    - hugo
    - ssg
    - automation
    - code
date: "2020-01-07"
lastmod: "2020-01-07"
---

For the longest time I completely ignored [archetypes in hugo](https://gohugo.io/content-management/archetypes/ "Read hugo archetype documentation"). I'd always copy over the front-matter from the last blog post I wrote and then fill in the things I needed - leading to some mistakes (e.g. using `category` instead of `categories`) over time. 

Archetypes are easy to use, for example to create this post I ran the following command

```bash
$ hugo new blog/2020-01-07-using-archetypes-in-hugo.md
```

This copied over the archetype file from `archetypes/blog.md` and automatically filled in the post tile, date, last modified date, and the defaults for categories, tags, type, and whatever else I have in the template file. Since Hugo 0.49 archetypes can consist of an entire directory structure that will be created. This is helpful for my [photography](/photography/) section where a post consists of an `index.md` file and some images that are automatically loaded. The structure looks like this.

```bash
archetypes
├── blog.md
└── photography
    └── index.md
```

For this type of post the `--kind` flag must be added to the command as shown below.

```bash
$ hugo new photography/my-photo-post
```

This command will create a directory named `my-photo-post` in `content/photography/my-photo-post`. Neat!

## Hugo template magic

As if this wasn't good enough, we can use the full set of Hugo template functions and script even more!

The archetype for new blog posts I use looks like this.

```yaml
---
title: "{{ replace (replace .Name "-", " ") (now.Format "2006 01 02 ") "" | title }}"

type: blog
categories:
    - coding
tags:
    - 
date: "{{ now.Format "2006-01-02" }}"
lastmod: "{{ now.Format "2006-01-02" }}"
---
```

In the first line the post `title` is set which is taken from the file name. I use filenames like `2020-01-02-a-post.md` on my blog which include the full date and then the post tile and the `.md` file extension for markdown. The `.md` is automatically stripped away which leaves a string like `2020-01-02-a-post`. The first replace (`replace .Name "-", " "`) turns this into `2020 01 02 a post`, the next replace (`replace (replace .Name "-", " ") (now.Format "2006 01 02 ") ""`) takes this string and strips the date, see the detailed steps below.

We assume that `.Name` equals "2020-01-02-a-post":
1. `replace (replace .Name "-", " ") (now.Format "2006 01 02 ") ""`
2. `replace "2020 01 02 a post" (now.Format "2006 01 02 ") ""`
3. `replace "2020 01 02 a post", "2020 01 02", ""`
4. `"a post"`

So after the whole code is executed, we have the plain title. This title is then passed to the function named `title` which is doing capitalization, leaving us with a nicely formatted title.

As shown above, I also set the `date` and `lastmod` times using Hugo template functions.

```yaml
date: "{{ now.Format "2006-01-02" }}"
lastmod: "{{ now.Format "2006-01-02" }}"
```

Both dates will be set to the same as this (new) article hasn't been modified yet. `lastmod` does only change when I update an article later on.
