---
title: "Auto SSL With apache2"
intro_text: "How Apache 2.4.30 and later can be used to automate SSL certificate setups"
type: blog
categories:
    - coding
    - backend
    - tutorial
tags:
    - apache
    - server
    - automation
    - security
    - ssl
    - ubuntu
    - linux
date: "2020-01-08"
lastmod: "2020-01-08"
---

Apache 2.4.30 and later supports an experimental module called `mod_md` which supports automatic SSL certificate setup with Let's Encrypt as standard provider. This greatly simplifies the management of SSL certificates. Instead of setting up [certbot](https://certbot.eff.org/) and cronjobs to automatically renew certs server administrators now only need to add a few lines to their virtual host files.

This guide assumes the operating system is *Ubuntu*! If you use a different distro some commands may be different.

## Installing a new apache version

Since `mod_md` is only available with Apache 2.4.30+ we need a fairly new apache version. Sadly, the newest on Ubuntu 18.04. is 2.4.29, so we need to add a new ppa to install from first. [ondrej/apache2](https://launchpad.net/~ondrej/+archive/ubuntu/apache2) seems to be what most people use and recommend, so we'll add this.

```sh
sudo add-apt-repository ppa:ondrej/apache2
sudo apt-get update
```

Next, apache can be updated

```sh
$ apt install apache2
```

Check the apache version

```sh
$ apache2 -v
Server version: Apache/2.4.41 (Ubuntu)
Server built:   2019-08-21T20:43:21
```

## Enabling mod_md

First `mod_md` must be enabled. This can be done with `a2enmod`.

```sh
$ sudo a2enmod md
```
Next, Apache must be reload with `systemctl`

```sh
$ systemctl reload apache2
```

Now the virtual host can be updated as shown in the minimal example below.

```apache
ServerAdmin mailto:some-valid@email.com
MDCertificateAgreement accepted
MDomain test.kevingimbel.de

<VirtualHost *:80>
        ServerName test.kevingimbel.de
        [...]
</VirtualHost>

<VirtualHost *:443>
        ServerName test.kevingimbel.de
        [...]
</VirtualHost>
```

The following values are required for `mod_md` to work properly:
- `ServerAdmin` with valid e-mail address
- ServerName in VirtualHost
- MDomain with valid domain name
- `MDCertificateAgreement accepted` to accept the ACME terms of service

After making the changes, the server must be reloaded again.

```sh
$ systemctl reload apache2
```

With the values in place the server will contact Let's Encrypt and retrieve a certificate, wire it up in the backend, and serve the website over https. The [mod_md documentation](https://httpd.apache.org/docs/trunk/mod/mod_md.html "Read the Apache Documentation on mod_md") contains more configuration options as well as information on how to use a different Certificate Authority. 