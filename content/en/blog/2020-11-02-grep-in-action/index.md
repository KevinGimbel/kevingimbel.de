---
title: "Grep in Action"
intro_text: ""
type: blog
categories:
    - coding
tags:
    - tool
    - unix
    - cli
    - automation
    - scripting
date: "2020-11-02"
lastmod: "2020-11-02"
---

`grep` is a CLI tool created in 1974 that is pre-installed on any Linux/Unix-like/BSD* system. `grep` is an acronym and stands for _"globally search for a regular expression and print matching lines"_ - quite a mouth full but a good description of what `grep` does. The more I worked in the Sys-/DevOps domain, the more I found myself using `grep` and `awk` to select parts of files for further processing. In this article I want to highlight some things `grep` can do that _I didn't know about but wish I did_ when I started using it.

### 1. Grep can open files

Contrary to popular believe, you do not need `cat file.txt | grep pattern` - `grep` can open files just fine! 

A lot of tutorials show `grep` reading files opened by `cat`. Often times you'll find code like the following:

```bash
$ cat app.log | grep "connection refused"
```

The `cat` command is unnecessary here and can be omitted.

```bash
# grep pattern file
$ grep "connection refused" app.log
```

### 2. The different grep "variants"

There isn't just grep but variants of it with different purposes. The man page says the following:

> **grep** is used for simple patterns and basic regular expressions (BREs); **egrep** can handle extended regular expressions (EREs) **fgrep** is quicker than both grep and egrep, but can only handle fixed patterns (i.e. it does not interpret regular expressions). 

So there is actually `grep`, `egrep` and `fgrep`! grep is the "should-work" version that can probably handle most cases, like getting all lines containing the word `ERROR` (`grep "ERROR" app.log`) or finding lines that start with a specific word (`grep "^FATAL" app.log`). `egrep` is used for more advanced regular expressions, like finding all lines that contain one or more keywords `egrep "(ERROR|WARN|INFO)" app.log` - `grep` would only find the literal string "ERROR|WARN|INFO", egrep will find either `ERROR`, `WARN`, or `INFO`.

`fgrep` will find things fast, but doesn't use any regular expression. It's best when dealing with large files and no regex is needed, but I've never actually used it.

### 3. Only print non-matching lines

`grep` can show all lines _except those matching_ the search pattern - so basically the opposite of what it usually does. This mode is enabled with `-v`.

The following example 
```bash
$ egrep -v "(INFO|WARN)" app.log
DEBUG: my_var = 12
ERROR: Oh no, my_var != 42
```

### 4. Follow and filter output of a file with `tail` and `grep`

`tail` is another CLI program that can be used to show lines of a file starting from the end (the opposite of the `head` command). For example, `head -n 20` shows the last 20 lines of a file. `tail` is incredibly useful in debugging running applications because it has an option to follow (`-f`) which means it will print out the log file as it is being written.

What I did not know is that **`tail -f` can be combined with `grep` to filter the log file the moment it is being written**!

```bash
# follow the log output and filter for lines containing `Connection refused`
$ tail -f app.log | grep "Connection refused"
```

### 5. Show surrounding lines

`grep` has two parameters to show surrounding lines: `-B` shows lines **B**efore, `-A` shows lines **A**fter the match.

To illustrate this, assume we have a file with the following content:

```txt
Hello world, this is
some text to be used
with the grep surrounding
example so we need to fill
a few lines.
```

Now we do a grep searching for `example` and the two lines above the match, which gives us the following

```bash
$ grep -B 2 "example" example.txt
some text to be used
with the grep surrounding
example so we need to fill
```

`-B` and `-A` are incredibly useful when we care for the surroundings of a match.