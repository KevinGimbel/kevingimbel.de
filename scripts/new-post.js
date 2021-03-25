const d = new Date();
const slugify = require("@sindresorhus/slugify");
const fs = require('fs');
const title = process.argv[2];

if (title == undefined || process.argv.length != 3) {
  console.error("Error: missing title");
  console.error(`Usage: ${process.argv[1]} "some title"`);
  process.exit(1);
}
// date shizzle
let year = d.getFullYear();
let month = parseInt(d.getMonth() + 1) < 10 ? 0 + `${d.getMonth() + 1}` : d.getMonth();
let day = parseInt(d.getDate()) < 10 ? 0 + `${d.getDate()}` : d.getDate();
let post_default_template = "";

// default front matter for posts
post_default_template = `---
title: "${title}"
subtitle: ""
type: blog
categories:
  -
tags:
  -
date: "${year}-${month}-${day}"
lastmod: "${year}-${month}-${day}"

head: null
foot: null
svg_title: null

draft: true
---`;
// construct the path with date and slugified title
let out_path = `./src/_blog/${year}/${month}/${day}-${slugify(title)}`;

// create out directory if it doesn't exists
if (!fs.existsSync(out_path)) {
  // create if doesn't exists
  fs.mkdirSync(out_path, { recursive: true });
}

// create index.md file in out directory
if (!fs.existsSync(`${out_path}/index.md`)) {
  fs.writeFileSync(`${out_path}/index.md`, post_default_template);
}