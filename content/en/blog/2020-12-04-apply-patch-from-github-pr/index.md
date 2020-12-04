---
title: "Apply a patch from a Github PR"
intro_text: ""
type: blog
categories:
    - coding
    - tutorial
tags:
    - github
    - patch
    - git
    - release
date: "2020-12-04"
lastmod: "2020-12-04"
language: "en"
---

Ever found yourself needing that one fix from a PR on GitHub that hasn't been released yet? How can you get the code, for example a Magento fix, into your code base? Copy-paste it? That might work for small changes, but for large and complex changes copy-pasting is no solution. Luckily, we can use GitHub to generate a patch file, which can then be applied with either the `git` or `patch` command.

## patch-file what?

A patch file is a text file containing instructions on how to apply a change to files. If you run `git diff` and see the changed files with `+/-` in front of lines that were added (`+`) or removed (`-`) you are looking at a patch file.

## Example code

For illustration purpose I created a example repo: [https://github.com/KevinGimbel/blog-patch-example](https://github.com/KevinGimbel/blog-patch-example).

You can clone the main branch and then apply the patch from the [Pull Request](https://github.com/KevinGimbel/blog-patch-example/pull/1) to it, if you want to follow along.

## Getting the patch file

First we will need to get the patch file. GitHub makes this easy, but for some reason hides it from us. You can **append .patch to the URL of any pull request to get the patch file**. So for the example above, open the URL [https://github.com/KevinGimbel/blog-patch-example/pull/1.patch](https://github.com/KevinGimbel/blog-patch-example/pull/1.patch) to see the plain text patch file.

```diff
From 6da12536ff4da0efdabdf1a4dd55ded127fa247c Mon Sep 17 00:00:00 2001
From: Kevin Gimbel <hallo@kevingimbel.com>
Date: Fri, 4 Dec 2020 16:31:30 +0100
Subject: [PATCH] docs: add actual URL

---
 README.md | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

diff --git a/README.md b/README.md
index 0fe5e72..7f6398a 100644
--- a/README.md
+++ b/README.md
@@ -2,4 +2,4 @@
 
 This repo is part of a Blog Post on how to get and apply patch files from GitHub.com
 
-You can read the full post here: ENTER_URL_HERE
\ No newline at end of file
+You can read the full post here: [https://kevingimbel.de/blog/2020/12/apply-patch-from-github-pr/](https://kevingimbel.de/blog/2020/12/apply-patch-from-github-pr/)
\ No newline at end of file
```

The patch file is both human and machine readable. Now to continue, get the patchfile!

1. Open a terminal and navigate to the repo you cloned earlier (`github.com/KevinGimbel/blog-patch-example`)
2. Download the patch file with `wget`:

```bash
$ wget "https://github.com/KevinGimbel/blog-patch-example/pull/1.patch"
```

This downloads a file named `1.patch` into the current directory, which we can verify by running `ls -l`

```bash
ls -l
total 16
-rw-r--r--@ 1 kevingimbel  staff  733 Dec  4 16:33 1.patch  # 👈 there it is
-rw-r--r--  1 kevingimbel  staff  155 Dec  4 16:33 README.md
```

You can look at the file if you want to, it contains the same text as the example in this article.

## Applying a patch with `git`

We can use `git` to apply the patch. For manual patching git has the `apply` command:
If we want to test the changes to see if they can be applied but don't want to change any files yet, we can use the `--check` and `-v` (verbose) flag:

```
$ git apply -v --check 1.patch
Checking patch README.md...
```

To really apply the patch, we remove the `--check` flag:

```bash
$ git apply -v 1.patch
Checking patch README.md...
Applied patch README.md cleanly.
```

Now check the `README.md` file and you'll see the new content!

```bash
$ cat README.md 
# blog-patch-example

This repo is part of a Blog Post on how to get and apply patch files from GitHub.com

You can read the full post here: [https://kevingimbel.de/blog/2020/12/apply-patch-from-github-pr/](https://kevingimbel.de/blog/2020/12/apply-patch-from-github-pr/)
```

## Patching without git

Sometimes you may not have git available, especially when patching software running on some server that - for whatever reasons - has no deployment process (no judging here!) or version control. 

Even without the `git` command the patch can still be applied by using the `patch` tool installed on most (all?) Linux systems.
To do this, follow these steps:

1. Get the patch from the {{< abbr "PR" "Pull Request" >}} by appending `.patch` to the URL
2. Apply the patch with the `patch` command

```bash
$ patch -p 1 < filename.patch
# To try out changes first, use `--dry-run`
$ patch -p 1 --dry-run < filename.patch
```

And that's it for today! Feel free to create PRs in the repo [https://github.com/KevinGimbel/blog-patch-example/](https://github.com/KevinGimbel/blog-patch-example/) if you want to play around with patching.

## Additional resources

- [patch man page](https://linux.die.net/man/1/patch)
- [git apply documentation](https://git-scm.com/docs/git-apply)