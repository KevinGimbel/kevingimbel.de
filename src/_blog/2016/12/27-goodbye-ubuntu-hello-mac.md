---
date: 2016-12-27T15:05:59+01:00
title: "Goodbye Ubuntu, Hello Mac"
categories:
  - personal
  - thoughts
tags:
  - hardware
  - development
aliases:
  - /goodbye-ubuntu-hello-mac/
---

Christmas came earlier this year! Since my co-workers switched to MacBooks over the year I got a MacBook, too. I got my new PC last year so I was not due to a hardware change for at least another year but - to my luck - I also got a new PC so we all have the same hardware. After three years of Ubuntu and Linux/GNU it's odd to switch to MacOS. While MacOS is closer to Unix-like systems it's still closed and not as open as Ubuntu or other Linux/GNU distributions. Changing Laptops is hard enough but changing operating systems - and changing to a system one has never worked with is a different thing. For documentation and to help others, I would like to document what I noticed when switching and how I got up and running in a week.

### ~/dotfiles

I have a [GitHub repository](https://github.com/kevingimbel/dotfiles) with dotfiles. By checking out the repository and linking the files I was able to setup my terminal in a few minutes. The repository is not perfect yet and there are unused files which I should - and will - clean-up. Nevertheless without the configs I would have needed to copy the files or re-configure everything by hand.

### Docker

Currently we at [Synoa](https://synoa.de) move projects to [Docker](https://docker.com) for local development and - in a selected way - for production, too. The basic benefits of Docker for Development show right when creating the first containers - one can replicate the production servers without a lot of hassle: operating systems and software versions can be defined on a per-project basis. One project is build on PHP 5.6, the other on 7.0 - with Docker we don't need to maintain different PHP versions on computers. It's just a small benefit but it's also a "easy" way to share projects. I am still learning Docker and Docker best practice - as I learn more I will cover it in articles.

### Operating System

MacOS is really beautiful. The user interface is a joy to work with and the gestures used to switch between tabs and workspaces is astonishing - it feels productive and it's fun to use. I really enjoy just working with it simply because of the Design. The Linux base of MacOS is visible when navigation with the Terminal - it does not feel odd and most of the software I used on Ubuntu when interacting with the file system is "the same". `grep`, `ls`, `head`, `tail`, `cat` - all these utilities work as expected. The only noticeable difference is `sed`. On Ubuntu I used `sed` a lot to clean SQL dumps, for example `sed -i 's/domain\.tld/domain\.local/g' mydump.sql` - this replaces `domain.tld` with `domain.local` inside the SQL dump. On MacOS one must add a post-fix for a backup file when using `sed`. The sed command becomes `sed -i '.bak' 's/domain\.tld/domain\.local/g' mydump.sql` and a backup file `mydump.sql.bak` is created. It's just a small difference but it caught me off-guard when I noticed bash scripts failing.

### Hardware

**A-ma-zing**! I expected a lot from a MacBook and I was blown away. The MacBook Pro feels good to the touch, it's well made and the Design aspect is visible in the choices of material and colors. While mine is not too high-end it still runs smootly and the battery life is unbelievable. Without a second display connected I get around 7-9 hours of battery life when writing or programming (no IDE used, just [Atom](https://atom.io)) - when I have 30% battery left I can still work without running to plug it in. Even at 5%, when the Mac tells me to plug the cable in, I still have time left and can get the cable.

### Software

I am currently figuring out which software I need and which software I want. I installed [Docker for Mac](https://docs.docker.com/engine/installation/mac/), [Atom](https://atom.io), [Chrome](https://www.google.com/chrome/) and the usual things like Google Drive and [KeyPassX](https://www.keepassx.org/). I switched away from the default Terminal to [iTerm 2](https://www.iterm2.com/), but besides I kept it vanilla and did not install unnecessary software.

Did I miss a thing? [Tweet me @kevingimbel](https://twitter.com/kevingimbel) and tell me what I absolutely need!
