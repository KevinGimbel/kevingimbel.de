---
title: "Learning Rust: Traits"

type: blog
categories:
    - coding
tags:
    - rust
    - tutorial
    - trait
    - pattern
    - code
    - learning-by-doing
date: "2021-02-03"
lastmod: "2021-02-03"
language: "en"
draft: true

head: null
foot: null
svg_title: null
---

Traits can be confusing. In essence, Traits are similar to interfaces in other programming languages, but a lot more flexible. A Trait defines one or more functions that can be implemented for custom structs. The Rust core language provides a lot of traits and some of them can even be automatically implemented using the `#[derive]` feature. You probably have written `#[derive(Debug)]` in the past when creating structs - **this** is a Trait which was automatically implemented. In this article we look deeper into the `From` trait to understand how Traits are implemented.

To get started, let's  define a struct named `Paragraph` which will represent a paragraph of text. 

```rust
#[derive(Debug)]
struct Paragraph {
    content: String,
    content_length: i64,
    explicit: bool
}
```

To construct a paragraph we write the following

```rust
fn main() {
    let p: Paragraph = Paragraph{
        content: "You may have seen that we need to specify the length and the explicit value. This can be a bit awkward when constructing new paragraphs!".to_string(),
        content_length: 136,
        explicit: false,
    };

    dbg!(p);
}
```

You may have seen that we need to specify the length and the explicit value. This can be a bit awkward when constructing new paragraphs! What if we could just use a function to do all that, like `Paragraph::from("")`? That's the `From` trait! We'll first implement it for `&str`.

```rust
impl From<&str> for Paragraph {
    fn from(s: &str) -> Self {
        return Paragraph{
            content: s.to_string(),
            content_length: s.len() as i64,
            explicit: false
        }
    }
}
```

That's it! Now we can construct a `Paragraph` from a `&str`.

```rust
fn main() {
    let p: Paragraph = Paragraph{
        content: "You may have seen that we need to specify the length and the explicit value. This can be a bit awkward when constructing new paragraphs!".to_string(),
        content_length: 136,
        explicit: false,
    };

    dbg!(p);
    let d: Paragraph = Paragraph::from("You may have seen that we need to specify the length and the explicit value. This can be a bit awkward when constructing new paragraphs!");
    dbg!(d);
}
```
```bash
$ cargo run
[src/main.rs:25] p = Paragraph {
    content: "You may have seen that we need to specify the length and the explicit value. This can be a bit awkward when constructing new paragraphs!",
    content_length: 135,
    explicit: false,
}
[src/main.rs:28] d = Paragraph {
    content: "You may have seen that we need to specify the length and the explicit value. This can be a bit awkward when constructing new paragraphs!",
    content_length: 136,
    explicit: false,
}
```