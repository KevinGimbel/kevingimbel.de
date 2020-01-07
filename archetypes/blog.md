---
title: "{{ replace (replace .Name "-" " ") (now.Format "2006 01 02 ") "" | title }}"
intro_text: ""
type: blog
categories:
    - coding
tags:
    - 
date: "{{ now.Format "2006-01-02" }}"
lastmod: "{{ now.Format "2006-01-02" }}"
---