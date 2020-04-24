---
title: "Terrasave"
intro_text: ""
type: blog
categories:
    - coding
    - tools
tags:
    - devops
    - terraform
    - cli
    - bash
    - fish
date: "2020-04-24"
lastmod: "2020-04-24"
---

I just released a tiny tool function I've been using for some time called [terrasave](https://github.com/kevingimbel/terrasave "View terrasave source code on GitHub"). It's a Bash / Fish function that prevents you from running `terraform` without the `-target` option.

## Why does this exist? 

In terraform it is incredibly easy to destroy things with `terraform apply`. If you run apply terraform shows a huge output and sometimes you may overlook a thing being "replaced" instead of updated. Once upon a time I destroyed a MongoDB Atlas Cluster this way and lost all its data, because the "must be replaced" was hidden in a lot of terraform output and I simply didn't see it. I only realized when terraform logged "Still destroying cluster..." to the console.

Some terraform resources, like Amazon ECS Services, are not idempotent, so they change on every apply. This cluttered my terminal with stuff I could ignore on every change as well as unnecessary updates to the infra (ECS Services being replaced despite no changes were made).

To prevent this, I forced myself to only use terraform with the -target switch, and this tiny script helps me accomplish that.

## Usage

After [installing the tool](https://github.com/kevingimbel/terrasave#installation "View installation instructions on GitHub.com") you can just work as you'd normally do: `terrasave` acts as a shell alias for `terraform` so whenever you run `terraform` in a terminal, the call goes "through" the `terrasave` function. If the function detects `apply` but not `-target` it outputs an error and exits.

```bash 
$ terraform apply
Please run "terraform apply" with -target option
```

If you **must** run terraform without a target you can do so by specifying an environment variable:

```bash
$ TERRAFORM_SAVE_DISABLE_I_KNOW_WHAT_I_DO=1 terraform apply
```

You can get the source code and installation instructions on [github.com/kevingimbel/terrasave](https://github.com/kevingimbel/terrasave). Hopefully this little tool will save your infra. :) 