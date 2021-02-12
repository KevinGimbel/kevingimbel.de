---
title: "Shipping Rust CLIs with Docker"

type: blog
categories:
    - coding
tags:
    - rust
    - docker
    - cli
    - code

date: "2020-08-06"
lastmod: "2020-08-06"
---

I recently found a nice and clean way of building and distributing [Rust](https://rust-lang.orf) CLI apps using [docker](https://www.docker.com/). For my work I created a Rust app that wraps some AWS SDK functions to make my day-to-day work with AWS easier. This CLI is very focused on the way we work at [Synoa](https://synoa.de/) and therefore unfortunately not open source. The tech does not matter much, as we can just create a tiny example "app" for this blog post.

## Rust code

Below is the example Rust code we will use.

```rust
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    println!("{:?}", args);
}
```

This code only prints whatever arguments were passed to the script.

## Building the binary - in docker

Next we will build the binary in docker using a "[multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/#use-multi-stage-builds)" setup. This way we do not need to manage our local Rust environment, for example we don't need to keep our Rust targets up-to-date or make sure other contributors have the same environment setup - the compiling is all done inside Docker.

We start by declaring a `builder` container. This container is only used for compiling the binary.
```ini
FROM clux/muslrust:1.45.0-stable as builder
WORKDIR /volume
COPY . .
RUN cargo build --release
```

These four lines do the following:

- Create a container based on [`clux/muslrust`](https://github.com/clux/muslrust)
- Give it a name of `builder` (so we can reference it later)
- Declare the working directory to be `/volume` 
- Copy over all files from the current directory to `/volume`
- Run the `cargo build --release` command which builds our Rust binary

## Creating the docker image

Next, in the same Dockerfile, we declare the actual image. This is where we copy the compiled binary from the "builder" container.

```ini
FROM alpine
# Copy the compiled binary from the builder container
COPY --from=builder /volume/target/x86_64-unknown-linux-musl/release/docker-cli-sample .
# Pass all arguments etc to binary
ENTRYPOINT [ "/docker-cli-sample" ]
```

So what happens here?
- First with `FROM alpine` we use the slim [Alpine Linux](https://alpinelinux.org/) as base image. Depending on what our binary is doing we could also use `FROM scratch` to not use a base image at all. For my case I chose Alpine because we needed to make HTTPS calls and they didn't work in a "scratch" image.
- `COPY` copies the binary from the builder container and places it in the root directory of our container
- `ENTRYPOINT [ "/docker-cli-sample" ]` means we execute the `docker-cli-sample` binary when we run the container

All together, the Dockerfile looks like this.

```ini
FROM clux/muslrust:1.45.0-stable as builder
WORKDIR /volume
COPY . .
RUN cargo build --release

FROM alpine
COPY --from=builder /volume/target/x86_64-unknown-linux-musl/release/docker-cli-sample .
ENTRYPOINT [ "/docker-cli-sample" ]
```

## Building the image and running the container

We can build the image now with the `docker build` command. Open a terminal and type:

```bash
docker build -t kevingimbel/rust-docker-cli-sample:1.0 .  
```

Then run the image in a container. `--rm` makes sure the container is removed after it is executed, as we do not need it anymore.

```bash
$ docker run --rm kevingimbel/rust-docker-cli-sample:1.0 -hello -world
["/docker-cli-sample", "-hello", "-world"]
```

## Setting up the CLI and docker

To execute this container like a CLI script we add the following to `~/.bashrc` (for Bash) or `~/.zshrc` (for zsh).

```bash
alias docker-rust-cli='docker run --rm kevingimbel/rust-docker-cli-sample:1.0'
```
Source the file by running the following, then test the command.

```bash
# bash
source ~/.bashrc
# zsh
source ~/.zshrc
```

Now we can execute the command just like any other CLI. The arguments are all passed to the script, just as if it was a "normal" binary somewhere in our `$PATH`.

```bash
$ docker-rust-cli hello from docker
["/docker-cli-sample", "hello", "from", "docker"]
```

## Advanced: volumes

We could end this post here, but there's one "advanced" topic I want to highlight: Volumes. If our script would create or download files we could not access them because they are only inside the container and the container. To prevent this we need to add a volume.

A volume can be added with `-v` in the docker command.

```bash
alias docker-rust-cli='docker run --rm -v $(pwd):/cmd-root-dir kevingimbel/rust-docker-cli-sample:1.0'
```

### `WORKDIR`

Now we need to make sure that our cli app puts created files in the `/cmd-root-dir` directory. This can be done by specifying the `WORKDIR` in the Dockerfile. To do this we add a new line above `ENTRYPOINT` as shown below.

```ini
FROM clux/muslrust:1.45.0-stable as builder
WORKDIR /volume
COPY . .
RUN cargo build --release

FROM alpine
COPY --from=builder /volume/target/x86_64-unknown-linux-musl/release/docker-cli-sample .
WORKDIR /cmd-root-dir
ENTRYPOINT [ "/docker-cli-sample" ]
```

`WORKDIR` will create the directory if it doesn't exist. To test the changes, we can adjust the rust script to write to a file.

```rust
use std::env;
use std::fs;

fn main() -> std::io::Result<()> {
    let args: Vec<String> = env::args().collect();
    println!("{:?}", args);
    fs::write("docker-cli-sample.log", format!("Args: {:?}", args))?;
    Ok(())
}
```

This will write the arguments into the `docker-cli-sample.log`. Because we set `WORKDIR` this will execute in the `/cmd-root-dir` inside the container. To actually get the log, we can now mount the volume with `-v` in our alias.

```bash
alias docker-rust-cli='docker run --rm -v $(pwd):/cmd-root-dir kevingimbel/rust-docker-cli-sample:1.0'
```

`$(pwd)` always evaluates to the current directory. This **only works if** we use sigle-quotes (`'`) in the alias!

So finally, running the command now will yield us the log in the current directory.

```bash
$ docker-rust-cli
["/docker-cli-sample", "hello", "world"]
$ cat docker-cli-sample.log
Args: ["/docker-cli-sample", "hello", "world"]
```

## Advanced: managing versions

For a bit more comfort we can use a variable for the docker image tag so we can update easier. The `.bashrc` or `.zshrc` then looks like:

```bash
export MY_CLI_VERSION="1.0"
alias docker-rust-cli='docker run --rm -v $(pwd):/cmd-root-dir kevingimbel/rust-docker-cli-sample:$MY_CLI_VERSION'
```

And there's that! Everybody else with access to the docker image can now use our CLI by adding the `alias` and optionally version to their `.bashrc` or `.zshrc`.

## Recap

So what did we learn?

- We can use [multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/#use-multi-stage-builds "Docker Documentation about multi-stage builds") to build our code using docker. This is done by creating a container with `FROM image:tag as builder`
- Rust binaries can be run in a small image such as `alpine` or even in a blank image using `FROM scratch`
- We can use an `alias` to comfortably run the long docker command
- By using `WORKDIR` and volumes we can extract files from the container and save them in the current directory outside the container

The source code of the example Rust CLI can be found on [GitHub at kevingimbel/docker-cli-sample](https://github.com/kevingimbel/docker-cli-sample). A working docker image can be found on [Docker Hub at kevingimbel/rust-docker-cli-sample](https://hub.docker.com/r/kevingimbel/rust-docker-cli-sample). 

The docker sample can be run with 

```bash
docker run --rm kevingimbel/rust-docker-cli-sample:1.0 hello from docker
```
