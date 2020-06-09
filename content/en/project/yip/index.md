---
title: "Yip"
type: project
layout: single
date: "2020-06-04"

categories: 
  - rust
tags:
    - network
    - http
    - server
    - service
    - API

featured: false
short_description: "YIP - YourIP - is a HTTP server that returns the public IPv4 address of the caller "

code_source: https://github.com/kevingimbel/yip
code_host: GitHub.com
---

A Rust TCP server that responds with callers' IPv4 address

## About

This server is the counter part to [mip](https://github.com/kevingimbel/mip). It responds with the callers' IP address on request. That's it.


## Usage

### Cargo

Run the server with `cargo run`, then connect to it on port 8111.

### Binary

Build the binary for your system with `cargo`.

```sh
$ cargo build --release
``` 

Then copy the binary from `target/release/yip` to some place in your `$PATH`. Afterwards the server can be started by running `yip`.

```sh
$ yip
```

### Specify custom port

By default port `8111` is used. A different port can be set with the environment variable `PORT`.

```sh
$ PORT=8080 yip
```
