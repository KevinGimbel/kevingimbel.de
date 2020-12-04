---
title: "{{ replace (replace .Name "-" " ") (now.Format "2006 01 02 ") "" | title }}"
type: link
categories:
    - link-list
tags:
    - 
date: "{{ now.Format "2006-01-02" }}"
lastmod: "{{ now.Format "2006-01-02" }}"
language: "en"
source: ""
source_title: ""
---