---
title: "Docker Apache Proxy Setup"
intro_text: ""
type: blog
categories:
    - coding
    - backend
tags:
    - server
    - apache2
    - docker
    - proxy
    - httpd
date: "2020-05-05"
lastmod: "2020-05-05"
---

In this post I'd like to detail how I am managing docker containers behind an apache2 proxy on a Ubuntu 18.04. server. I'm using one Apache server to route traffic from multiple sub-domains to docker containers all running with docker-compose. This setup is _not_ automated and the containers do not need to interact with each other; It's just how I run software for my private usage.

## Overview

Let's start with an overview image, because this can be quite confusing.

{{< figure src="/images/posts/2020/docker-apache-proxy/apache-docker-server-diagram.svg" caption="A diagram showing how traffic comes through Apache and is routed to different docker containers exposing services on different TCP ports" >}}

The diagram shows how traffic comes from the public internet and hits Apache. This happens for example when you type https://kevingimbel.de into your browser and hit enter. Apache then decides which service running should respond to the request, in most scenarios this will be some PHP code (like WordPress). When we want to use NodeJS or run software from docker we usually do not bind to port 80 (HTTP) or 443 (HTTPS) directly. Instead we need to proxy the request. 

In order to make our services accessible without knowing the ports of each container we'll setup a virtual host in Apache. 

The goal is:
- Access each service through a nice domain (like `app1.kevingimbel.de` instead of `kevingimbel.de:8081`)
- Have SSL for every service
- Get new certificates automatically

## Starting services with docker-compose

We'll start with the docker service. As an example I'm using one of my projects, [`fakedata_server`](https://github.com/kevingimbel/fakedata_server).

The docker compose file looks like this
```yaml
version: "3"

services:
    fakedata_server:
        image: kevingimbel/fakedata_server:latest
        ports:
            - 8085:8000
        restart: unless-stopped
```

We can place this in some directory, I'm usually using `$HOME/app-name`, so for example `/home/myuser/fakedata-server/docker-compose.yml`. Then we can run `docker-compose up -d`. The service will now run and restart forever until it is stopped.

If we use `curl` we can reach the service.

```bash
$ curl -vL localhost:8085
curl -vL localhost:8085
* Rebuilt URL to: localhost:8085/
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 8085 (#0)
> GET / HTTP/1.1
> Host: localhost:8085
> User-Agent: curl/7.58.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: text/plain; charset=utf-8
< Server: Rocket
< Content-Length: 515
< Date: Tue, 05 May 2020 09:35:45 GMT
<

Welcome to the fakedata_generator example implementation as a web server

Available routes:

    /gen/email
    /gen/username
    /gen/domain
    /gen/http_method
    /gen/ipv4
    /gen/enum_r/<input>
    /gen/corpora/<input>


Inputs:

/gen/enum_r/<input>
Specify input as comma-seperated strings, e.g.
/gen/enum_r/hello,world,this,is,a,tes
/gen/enum/horse,cat,dog
/gen/enum/active,inactive,unknown


/gen/corpora/<input>
Specify a corpora dataset, e.g.
/gen/corpora/horse
/gen/corpora/cat
/gen/corpora/fabric

* Connection #0 to host localhost left intact
```

```bash
$ curl localhost:8085/gen/email
benefritz@make.org
```

The service is working. Yay! Off to the next topic!

## Proxying with apache2

Now that we have a service running we want to make it accessible with a nice clean URL. We'll use `fs.bullgit.science` for this purpose, because that's where the service is actually running: [https://fs.bullgit.science](https://fs.bullgit.science/).

First we need to create some apache files:

- Virtual Host in `/etc/apache2/sites-available/fakedata-server.conf`
- Generic Domain config in `/etc/apache2/sites-available/domains.conf`

### Virtual Host

The virtual host only contains proxy commands and redirects. We want to redirect all HTTP traffic to HTTPS and all HTTPS traffic should be proxied to the port out service is running on (`8085` in the example above).

The first part of the config is the redirect. Important here is the **ServerName**! This tells apache for which sub-domain this virtual host should be routed to!

```xml
<VirtualHost *:80>
	ServerName fs.bullgit.science
	Redirect permanent / https://fs.bullgit.science/
</VirtualHost>
```

The next part is the SSL/HTTPS handler. After the redirect this handler will do the proxying. 

{{< sidebyside class="align-top" >}}

{{< left >}}

- `ServerName` tells apache which virtual host to use (if we have multiple)

- `SSLEngine On` turns on SSL encryption

This is all that is needed in the virtual host for the auto-ssl feature! The rest of the config will be handled in the `domains.conf` as described below.

- `ProxyPreserveHost On` passes on the `Host` header from the request (see [documentation](https://httpd.apache.org/docs/current/mod/mod_proxy.html#proxypreservehost))

- `ProxyPass / http://127.0.0.1:8085/` - this tells apache to sent the traffic to port 8085 on localhost (`127.0.0.1` is always the IP of the local server)
- `ProxyPassReverse / http://127.0.0.1:8085/`

The last two lines just give some extra logs, it's always good to have them in case something doesn't work or if a tool like [fail2ban](https://fail2ban.org) should be used.
- `ErrorLog ${APACHE_LOG_DIR}/fs.bullgit.science-error.log`
- `CustomLog ${APACHE_LOG_DIR}/fs.bullgit.science-access.log combined` 

{{< /left >}}

{{< right class="small" >}}
```xml
<VirtualHost *:443>
	ServerName fs.bullgit.science

	SSLEngine On

	ProxyPreserveHost On

	ProxyPass / http://127.0.0.1:8085/
	ProxyPassReverse / http://127.0.0.1:8085/

	ErrorLog ${APACHE_LOG_DIR}/fs.bullgit.science-error.log
	CustomLog ${APACHE_LOG_DIR}/fs.bullgit.science-access.log combined
</VirtualHost>
```
{{< /right >}}

{{< /sidebyside >}}

You can view the full apache2 configuration below.

{{< details summary="Click to view file /etc/apache2/sites-available/fakedata-server.conf" >}}
```xml
<VirtualHost *:80>
	ServerName fs.bullgit.science
	Redirect permanent / https://fs.bullgit.science/
</VirtualHost>

<VirtualHost *:443>
	ServerName fs.bullgit.science

	SSLEngine On

	ProxyPreserveHost On

	ProxyPass / http://127.0.0.1:8085/
	ProxyPassReverse / http://127.0.0.1:8085/

	ErrorLog ${APACHE_LOG_DIR}/fs.bullgit.science-error.log
	CustomLog ${APACHE_LOG_DIR}/fs.bullgit.science-access.log combined
</VirtualHost>
```
{{< /details >}}

The `domains.conf` is our SSL config. We will add all sub-domains we want to have covered by our SSL certificate to this configuration. The details on how to enable mod_md for automatic SSL certs with apache2 are written below, the config file looks like this:

```xml
ServerAdmin mailto:yourname@yourserver.com
MDCertificateAgreement accepted
MDomain bullgit.science fs.bullgit.science service-b.bullgit.science

<VirtualHost _default_:*>
	DocumentRoot "/var/www/html/"
</VirtualHost>
```

The above config will generate a SSL certificate valid for the domains:

- `bullgit.science`
- `fs.bullgit.science`
- `service-b.bullgit.science`

I've written about [Auto-SSL with Apache2](https://kevingimbel.de/blog/2020/01/auto-ssl-with-apache2/ "Read more about managing SSL certificates with Apache2") in the past and I'm using this feature for my docker containers, too. This way I can have free SSL certificates without the need to manage anything manually.

The Server must run Apache 2.4.30 or newer in order to use the Auto-SSL feature. Instructions on how to upgrade can be found [in my article on Apache2 and Auto-SSL](https://kevingimbel.de/blog/2020/01/auto-ssl-with-apache2/ "Read more about managing SSL certificates with Apache2").

Once everything is setup we need to enable the configs.

```bash
$ sudo a2ensite fakedata-server.conf domains.conf
```

and then restart the apache2 server.

```bash 
$ sudo systemctl restart apache2
```

{{< note >}}
It appears that apache needs to be _restarted_ not just _reloaded_ when a new subdomain is added to the certificate!
{{< /note >}}

Now you should be able to access the docker container on a subdomain. For example, [fs.bullgit.science](https://fs.bullgit.science/).