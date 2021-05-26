---
title: "First steps with Traefik 2"
subtitle: "A tale of Auto SSL, Basic Auth, and lots of debugging"
type: blog
categories:
  - devops
tags:
  - devops
  - networking
  - edge-proxy
  - docker
  - traefik
series:
  - in-production
date: "2021-05-21"
lastmod: "2021-05-21"

head: null
foot: null
svg_title: null
---

Recently I've spent some time at work trying out [Traefik 2](https://traefik.io) and learning about the new concepts like routers and middleware since we'll use Traefik 2 as part of some new infrastructure.

We've used Traefik 1 in production at Synoa for the past 3 years. Initially I chose Traefik because it was easy to integrate with Kubernetes and later on with Amazon ECS when we moved to it from Kubernetes. Traefik has always served us well and I felt very confident deploying it to production. We tried an unreleased version of Traefik 2 with ECS support in the past but so far had no time to update every system to the new version. Since we are in the process of creating a new product with completely new infrastructure I decided to include Traefik 2 from the start.

## The stack

Before we start with any technical stuff, let's talk about the stack everything runs on for a second. The infrastructure is planned with simplicity and "small-scale" in mind. We **do not need** a big cluster setup with thousands of servers (or even with tenths of servers), no orchestrator like Kubernetes (or ECS, Mesos/Marathon, ...) and we have predictable workloads. There's no need to suddenly scale up to hundreds or thousands of containers, nor will there be a requirements to scale without it being planned ahead.

All my testing in this case was done on a small [Hetzner Cloud](https://hetzner.cloud/) server running standalone Docker with no orchestrator. 

I may write more about small-scale cloud (infra), but not today. :)

The goals we hope to archive with Traefik are:

* Handle all traffic on port `80` and `443`
* Redirect from port `80` to `443`
* Auto-SSL for port `443`
* Auto-SSL for all sub-domains like `service-1.my.tld`, `service-2.my.tld`, ...
* Basic Auth for all exposed services, preferably by default and without extra config
* Traefik Dashboard with basic auth
* Prometheus metrics with basic auth

## Gotchas

{% note "info" %}
**Head's up!** This post is about Traefik 2, specifically version 2.4!
I am using the TOML file format for this post, but anything mentioned here applies to YAML or other config sources as well.
{% endnote %}

### Where to configure what??

Traefik has a "main" config file, usually named `traefik.toml`, where general config is placed in. This includes providers, default entry points (ports like 80, 443, ...), log level configuration, the dashboard and API, ... however there's stuff that _cannot be in this file_. Namely, any [middleware](https://doc.traefik.io/traefik/middlewares/overview/) config! 

I didn't know that and it took me quite some time to figure it out. In the end I found a forum post that said middleware has to be in another file, which must be loaded in the main configuration using the [file provider](https://doc.traefik.io/traefik/providers/file/)

This means the following config is **Invalid**:

```toml
# traefik.toml

[http.middlewares.my-atuh.basicAuth]
usersFile="/etc/traefik/.htpasswd"
```

The middleware named `my-auth` will not work and cannot be accessed as `my-auth@file`. Instead we need to put it into a second file like so:

```toml
# traefik.toml
# enable file provider
[providers.file]
directory="/etc/traefik/config.d/"
```

```toml
# /etc/traefik/config.d/middlewares.toml
[http.middlewares.my-atuh.basicAuth]
usersFile="/etc/traefik/.htpasswd"
```

Now the middleware is usable by specifying a Docker label like `traefik.http.routers.my-container.middlewares=my-auth@file`

#### Summary: config files

- Middleware cannot be configured in the main config file
- Any `X@file` middleware must be in a separate config file
- The file provider must be enabled with `[providers.file]`

### Providers must be enabled explicitly

In the previous section we saw that we can specify `[providers.file]` to configure the file provider. What I didn't know when I started digging into Traefik 2 is that **each provider that should be used MUST be added to the config file, even if no special config is needed**!

So in order to use the docker provider, which reads Docker labels from containers, we need to add the following:

```toml
# traefik.toml
[providers.docker]
```

That's it. I spent literal hours debugging why Traefik return a "404 not found" for every request and didn't seem to pickup the containers I deployed, only to discover the provider **must be in the config file to enable it**, even without any special config values. 

One may wonder why an empty config is required and it does look a bit weird, even more so in YAML:

```yaml
providers:
  docker:
```

But it all makes sense when we think about the Traefik command line arguments, where a provider is enabled by setting `--providers.docker` or `--providers.file`. From a Traefik point of view the provider config acts as a boolean-ish thing: Is the provider there? If so, it is enabled. The more explicit alternative could be:
```toml
# traefik.toml (PSEUDO code, not working)
[providers]
  [providers.docker]
    enabled=true
  [providers.file]
    enabled=true
```

But then again, this would be pretty redundant. 

In hindsight it's logical and makes sense, but at the time I was biting my teeth and cussing at Traefik. Well, in the end it was ~~DNS~~ human error. 

#### Summary: providers

- Providers are enabled by adding a config like `[providers.file]` or `[providers.docker]` into `traefik.toml`
- Even with no additional config it must be added or Traefik must be started with `--providers.x` flag

### SSL Certificates

Traefik can automatically register certificates with Let's Encrypt. This is incredibly helpful when deploying Traefik in an automated setup because it means there's no need for any other tool to handle SSL, like an API call to AWS Certificate Manager or a manual setup where certificates are requested once the server is up and running.
In our current setup, once the server is started it briefly uses an invalid self-signed default certificate and once the Let's Encrypt certificates are ready Traefik uses them.

In order to generate SSL certificates we  need to define a Certificate Resolver, like so:

```toml
# traefik.toml
[certificateresolver.my-resolver.acme]
storage = "/srv/docker/traefik/config/acme.json"
email = "totally@valid.email"
[certificateresolver.my-resolver.acme.httpChallenge]
entryPoint = "web"
```

That's it. Now the resolver can be used in a router or entrypoint configuration. If used in an Entrypoint configuration, all routers that use this entry point will have SSL enabled.

```toml
# traefik.toml
[entryPoints.websecure]
  address = ":443"
  [entryPoints.websecure.http.tls]
    certResolver = "my-resolver"
```

And again, that's it. We tell the entrypoint named `websecure` to use the certificate resolver named `my-resolver` which we defined in the step before.

To backup the certificates the file specified under `storage` is all that's needed, because it contains all the certificates and keys. 

### Automatic basic auth

Middlewares can also be used to enable defaults for an entrypoint, the following example tells every router that uses `websecure` to use the `my-auth@file` middleware (which we defined in the first section!)

```toml
# traefik.toml
[entryPoints.websecure]
    address = ":443"
    [entryPoints.websecure.http.tls]
      certResolver = "my-resolver"
    [entryPoints.websecure.http]
      middlewares = [ "my-auth@file" ]
```

## Conclusion

Despite some hiccups in the beginning and some frustration I'm still confident in my choice. Traefik is a great proxy and does everything we need. It integrates with lots of different providers and the Docker provider is the absolute simplest to run, since it doesn't require any orchestrator - just Docker labels on containers.

I'm looking forward to dig deeper into Traefik, especially getting more familiar with [Plugins](https://doc.traefik.io/traefik/plugins/)!
