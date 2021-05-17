---
title: "Gotcha: Dots in /etc/sudoers.d filenames"
subtitle: "A tale of facepalms"
type: blog
categories:
  - devops
tags:
  - TIL
  - devops
  - sudo
  - linux
  - configuration
  - ansible
date: "2021-05-17"
lastmod: "2021-05-17"

head: null
foot: null
svg_title: null
---

While reviewing some Ansible modules with a colleague we stumbled upon an issue with our user creation module, and for a briefe time couldn't understand what was going on.

The module in question creates multiple Linux users, adds them to groups, and enables some to use password less sudo via the `/etc/sudoers.d` config directory. For some reasons after we logged in with the newly created users, they were not able to use sudo without entering passwords.

We checked the directory and all files were there, just as expected. The content of the files was also OK for every user, yet none could use sudo without entering a password.

After some time I wondered if the dot in the filename may be the problem, since the files were named like `passwordless_sudo_kevin.gimbel` but this couldn't be it, right? Wrong. [That's the problem](https://www.sudo.ws/man/1.8.15/sudoers.man.html#Including_other_files_from_within_sudoers "Note about dots in the sudo documentation"), quote from the sudo man page:

> sudo will read each file in /etc/sudoers.d, skipping file names that end in ‘~’ or contain a ‘.’ character to avoid causing problems with package manager or editor temporary/backup files.

And that's why sudo config files cannot contain dots. Questionable, but that's how it is. 🤷

Our solution was to strip out any dots using regex, since the Ansible role can potentially support any amount of users and we cannot control what names will be used.
