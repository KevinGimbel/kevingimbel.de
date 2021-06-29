---
title: "Proxy websocket connections with Apache2"
subtitle: "How to configure Apache2 to pass through web socket connections"
type: blog
categories:
  - devops
tags:
  - server
  - apache2
  - sysops
  - devops
date: "2021-06-24"
lastmod: "2021-06-24"

head: null
foot: null
svg_title: null

draft: true
---

Recently I had to adjust an Apache Virtual Host to allow proxying of Web Socket requests to a service running on localhost which would also accept HTTP requests on the same port.

## The problem

The service in question was [Loki](https://grafana.com/oss/loki/), the _"Prometheus, but for logs"_ from Grafana. At [Synoa](https://synoa.de/) we've grown to love Prometheus and Grafana, so the choice to do our centralized log management with Loki came naturally; Especially since Loki is a lot simpler in its architecture and easier to operate with a small ops team; But that's stuff for another blog post. :)

Without the Socket proxy the "Live View" on incoming logs and the "Show Context" button which shows surrounding lines of a log in Grafana didn't work; Since I've had no experience with Web Sockets it took some time to figure out  that the problem was the sockets didn't reach the backend service running on `127.0.0.1:3000` behind Apache2. 

## The solution

The solution was to configure Apache so it would proxy the web socket request to the websocket service (`ws://127.0.0.1:3000/`) explicitly if the request is marked as such with the [`Upgrade`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade) and [`Connection`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection) headers. 

For this to work, we first need the `proxy_wstunnel` module. 

```bash
# Enable module on Ubuntu
$ sudo a2enmod proxy_wstunnel
```

Then, we can adjust the vhost configuration file to include a rewrite rule (lines 4 to 7):

```xml/4-7
<VirtualHost *:443>
  ServerName my.server.tld
  SSLEngine On

  RewriteEngine On
  RewriteCond %{HTTP:Upgrade} websocket [NC]
  RewriteCond %{HTTP:Connection} upgrade [NC]
  RewriteRule ^/?(.*) "ws://127.0.0.1:3000/$1" [P,L]

  ProxyPreserveHost On
  ProxyPass / http://127.0.0.1:3000/
  ProxyPassReverse / http://127.0.0.1:3000/
  ProxyRequests off
</VirtualHost>
```

After making these changes and reloading Apache2, the Grafana Live Log view and Loki "Show Context" function was working again. 

## Further reading

- "[Apache2 Websockets](https://noqqe.de/blog/2018/04/21/apache2-websockets/)" on noqqe.de (in German)
- [mod_proxy_wstunnel module documentation](https://httpd.apache.org/docs/2.4/mod/mod_proxy_wstunnel.html)
