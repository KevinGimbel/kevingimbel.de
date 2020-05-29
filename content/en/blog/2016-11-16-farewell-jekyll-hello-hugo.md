---
date: 2016-11-16T19:04:42+01:00
tags:
- hugo
- go
- development
- personal
categories:
- coding
- tools
title: Farewell Jekyll, Hello Hugo
aliases:
  - /farewell-jekyll-hello-hugo/
---

If you have visited my website in the past few weeks you might have notices a few things. First of all it looks different. Second, it is now served over HTTPS which is possible because I moved away from GitHub Pages and back to self-hosting my website. Third, and possible most important, I also moved away from Jekyll after using it for three years.

This very site you read right now is build with [Hugo](http://gohugo.io), a static site generator build by [Steve Francia](http://spf13.com/), [Bjørn Erik Pedersen](https://github.com/bep) and a lot of [contributors](https://github.com/spf13/hugo/graphs/contributors). Hugo is written in [Go](https://golang.org/) a programming language created at Google I have [been interested in lately](https://github.com/kevingimbel?language=go&tab=repositories).
For me personally Go provides a lot of new challenges and things to learn. I worked with Front-End technologies like HTML and CSS as well as scripting languages like PHP and JavaScript for the better part of the past 6-7 years; "professionally" and officially since 2014. Go is entirely different to what I am used to and I like it. I enjoy playing around with it where in the past year or so I lost a big part of my passion for programming in the languages I already know. But why move away from Jekyll? And why choose Go?

### Ruby

Jekyll is written in Ruby. I have no intention of learning anything related to Ruby. It is not lazyness or fear of a challenge but instead the simple truth that Ruby does not provide me with any benefits at the moment or in my foreseeable future. I am sure it has its place - like any language has - but I don't have the time nor the interest to dive into Ruby. I tried to host Jekyll on my own and it was always a hassle to set up the environment.

### Go

Hugo on the other hand "just works". Hugo is one binary file with zero dependencies after building and can just be executed. On a server with Go installed it's as easy as running `go get -v github.com/spf13/hugo` or if Go is not available there are pre-built binaries.

```bash
$ wget https://github.com/spf13/hugo/releases/download/v0.17/hugo_0.17_Linux-64bit.tar.gz
$ tar -xzvf hugo_0.17_Linux-64bit.tar.gz
$ ln -s hugo_0.17_linux_amd64 hugo
$ chmod +x hugo
$ ln -s $(pwd)/hugo ~/bin
```

Another reason why I chose Hugo over [any other static site generators](https://www.staticgen.com/) is because it is under active development thanks to [Bjørn Erik Pedersen](https://github.com/bep), has [excellent docs](https://gohugo.io/overview/introduction/) and an active community.

The final reason why I decided to not just move away from GitHub Pages for my own SSL certificate but also away from Jekyll is: I want to learn Go. I can contribute to Hugo and poke around the source code if I need or want to, a thing I could not do with Ruby and Jekyll simply because I lack the skill. I'm not yet any good at Go but having the interest and base to hack away in your static site generator is a big benefit after all.

As of today it's not all good yet. The new design is as always a work in progress and more of an experiment. The content of my site has changed drastically because I decided to not move all pages or all content but instead only move my articles. The [Projects](/projects/) section is completley new and lists a selection of Projects I decided to showcase. As before, all source code of my website is [available on GitHub.com](https://github.com/kevingimbel/kevingimbel.com) so feel free to look around.

Some things are still not working as I would like but I'll eventually get to them. After all, a personal website is always a work in progress.

_Farewell Jekyll, it's been a pleasure for the past three years._
