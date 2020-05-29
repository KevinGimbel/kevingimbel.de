---
title: "Parsing TCP with Rust"
intro_text: ""
type: blog
categories:
    - coding
    - open-source
tags:
    - rust
    - tcp
    - crate
date: "2020-03-26"
lastmod: "2020-03-26"
draft: true
---

Hello and welcome to my TED Talk. Today we'll look at a open source project of mine, [`mip`](https://github.com/kevingimbel/mip), a zero-dependency Rust crate that allows the user to retrieve their current public IP address. It's very basic and "simple" on purpose and since it has no dependencies there's no library that abstracts the HTTP stack so in order to get the current IP I do a plain TCP request to a website like [https://httpbin.org/ip](https://httpbin.org/ip) (which is also the default). 

Who would've thought that blindly parsing TCP responses is hard?

### What I try to archive

Before we go into any detail, let's look at what `mip` tries to archive. It should: 

- Return the current, public IP address
- Have no dependencies (as in Rust dependencies / crates)
- Work by requesting a remote API like https://httpbin.org/ip

Why no library dependencies? I want to push myself to not just reuse existing, bloated, libraries. Instead I wanted to only support the minimal functionality I need. The minimal functionality is:

- make a HTTP request
- parse the response for an IPv4 address

### Understanding TCP

`TCP` ([_Transmission Control Protocol_](https://en.wikipedia.org/wiki/Transmission_Control_Protocol)) is a standard for communication between servers and the underlying protocol of the web. There's some rules to it like:

- HTTP running on port 80
- HTTPS running on port 443
- SSH running on port 22
- DNS servers running on port 53
- ...

So a bunch of ports (that is, entry points into a server or network) are reserved for special use cases. When we type a URL into a browser we don't need to specify the port because the rules are defined as above and the Browser / Server knows what we want if we request `http://kevingimbel.de` we get the content served on port `80`, with `https://kevingimbel.de` we get the content served on port `443` - this may be the same content, it may be no content at all or it may be a apache server sending a redirect response, which the browser can than handle. This is nice because otherwise we'd need to know the ports of each website and I'm sure as heck would use `kevingimbel.de:1337`. Anyway 🤓

So TCP is a _big deal_. It's the standard protocol for lots of communication on the web and it is reliable-enough with a bit of a performance trade-off compared to other protocols such as [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol), which in turn have no guarantee that the traffic reached it's destination. I actually don't care too much about all the details and I'm not trying to build a perfect, robust TCP library. I'm trying to use the Rust `std::net` library, namely `TcpStream`, to make one request to a known address.

### Making HTTP requests

Before we can parse TCP, we first need to make a TCP request. With basic knowledge of what TCP is we can jump in and write Rust code that can make a HTTP Request to a remote server.

First we need to open a TCP socket using `TcpStream::connect`.

```rust 
use std::net::TcpStream;
use std::io::{Read, Write};
fn main() {
    // Open socket connection
    let mut socket = TcpStream::connect(host).unwrap();
}
```

We can write to the socket with `socket.write_fmt()` which is available from `std::io::Write`. This is needed to tell the remote side what we want to, and this is also what a browser will do when it makes a request to a server.

```rust
use std::net::TcpStream;
use std::io::{Read, Write};
fn main() {
    let host = "httpbin.org"
    let port = "80"
    let host_port = format!("{}:{}", host, port).as_str()
    // Open socket connection
    let mut socket = TcpStream::connect(host_port).unwrap();
    socket.write_fmt(format_args!("???"));
}
```

But what do we need to write to the socket if we want to make a GET request? HTTP is text-based so we'll need to write a block of text describing what we want to do.

```txt
GET /path/ HTTP/1.0
Host: somedomain.com


```

This tells the remote server that we want to make a `GET` request to the resource at `/path/` using `HTTP/1.0`. The next line is a header telling the remote side what Host we want (`Host: somedomain.com`). This is needed because the remote server knows nothing about Hosts (domains). The server software (Apache, Traefik, Nginx, ...) knows hosts and knows which service should respond to the request. You may wonder why there are two empty lines and this is something that caught me off guard: HTTP requires two empty lines (`\r\n\r\n`) after the headers even if there is no more content!

So with that out of the way we can format the request and write it to the socket.

```rust
// fn main
    let host = "httpbin.org"
    let port = "80"
    let host_port =format!("{}:{}", host, port).as_str()
    // Open socket connection
    let mut socket = TcpStream::connect(host_port).unwrap();
    socket.write_fmt(format_args!(
        "GET {} HTTP/1.0\r\nHost: {}\r\n\r\n", "/ip", host));
```

To read the response we can read it into a `String` with socket.read_to_string();

```rust
 // Build new empty string. HTTP Response is written into this string.
let mut res = String::from("");
// Write response into string
let _resp = socket.read_to_string(&mut res).unwrap();
```

And then we can `println!()` the response.

```rust
println!("{:#?}", res);
```

If we run the code we get a response like

```bash
"HTTP/1.1 200 OK\r\nDate: Fri, 27 Mar 2020 08:13:51 GMT\r\nContent-Type: application/json\r\nContent-Length: 32\r\nConnection: close\r\nServer: gunicorn/19.9.0\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Credentials: true\r\n\r\n{\n  \"origin\": \"89.247.109.66\"\n}\n"
```

The source code of this tiny example can be found on [github.com/kevingimbel/rust-tcp-example](https://github.com/kevingimbel/rust-tcp-example). If you clone the repo and execute `cargo run` you'll see similar output in the terminal.

So far this is exactly how [`mip`](https://github.com/kevingimbel/mip) works. It makes a plain TCP request to a service like httpbin.org and then parses the output, searching for an IP v4 address. With {{ abbr "RegEx" "Regular Expression" }} this would be simpler, we could just match the string against `"\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"` and would get a IP out. But I wanted to be dependency-free so I implemented a function to parse the response.

### Parsing TCP