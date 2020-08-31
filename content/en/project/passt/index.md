---
title: "Passt"
type: project
layout: single
date: "2020-08-31"

categories:
  - rust
tags:
    - cli
    - tool
    - generator
    - data_generator
    - testing

featured: false
short_description: "Rust CLI and library to generate good-enough random strings and passwords"

code_source: https://github.com/kevingimbel/passt
code_host: GitHub.com

# Screenshots etc
# resources:
#     - src: 
#       name: ""
---

`passt` is a CLI tool and library that can be used to generate random strings, e.g. for use as passwords. It is very "weak" in that it doesn't use any "real" cryptography and should therefor not be used as an actual password generator.

You can use `passt` to generate random test input when testing software tho.

Up to date information can be found on GitHub [https://github.com/kevingimbel/passt](https://github.com/kevingimbel/passt#passt).

## Usage: CLI

**Install**

```bash
$ cargo install passt
```

**Arguments**
```bash
USAGE: passt -l <int> [-s] [-chars "<str>"] [-n <int>]

-l      length of the generated password
-n      number of passwords to create (default: 1)
-s      use special characters
-chars  possible characters as a string, e.g. "abc012"
```

## Usage: Library

Generate random string with default character sets:

**function signature**
```rust
Passt::random_password(length: i32, with_special_chars: Option<bool>) -> String
```

**code example**
```rust
use passt::Passt;

fn my_random_password() -> String {
    Passt::random_password(16, Some(false));
}

fn my_random_password_with_none() -> String {
    Passt::random_password(16, None);
}

fn my_random_password_with_special_chars() -> String {
    Passt::random_password(16, Some(true));
}
```

**Use custom character set**

```rust
fn my_custom_set() {
    Pass::random_password_with_custom_set(16, "acefhjlnprtvxz13579")
}
```