---
title: "Mip"
type: project
layout: single
date: "2020-06-04"

categories: 
  - rust
tags:
    - lib
    - crate
    - network

featured: true
short_description: "Get IPv4 address in rust - with 0 dependencies!"

code_source: https://github.com/kevingimbel/mip
code_host: GitHub.com

# Screenshots etc
resources:
    - src: 
      name: ""
---

`mip` gets the local IP address by requesting http://httpbin.org/ip (or a custom endpoint) and parsing the returned output.

It has 0 dependencies and only relies on the Rust std lib.

## Usage
Add the following to Cargo.toml.

```toml
[dependencies]
mip = "0.4.0
```

Then use it like

```rust
use mip::IP;

fn main() {
    println!("My IP is {}", IP::is());
}
Or without use

fn main() {
    println!("My IP is {}", mip::IP::is());
}
```

## Custom Endpoint

Instead of using httpbin.org a custom endpoint can be used. Custom endpoints may not parse properly so test before using in production!

```rust
use mip::{IP, Endpoint};

fn main() {
    let ip = IP::with_endpoint(Endpoint {
        path: Some("/"),
        host: "checkip.dyndns.com",
        port: 80,
    });
    println!("{}", ip)
}
```