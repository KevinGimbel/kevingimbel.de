---
title: "Two Factor Auth, Password managers, and cloud sync"
intro_text: "A guide on how I secure my passwords, 2FA data, and sync between devices"
type: blog
categories:
    - tools
tags:
    - workflow
    - productivity
    - password
    - management
    - sync
    - cloud_storage
    - 2FA
    - security
    - android
date: "2020-01-04"
lastmod: "2020-01-04"
draft: true
---

For years I have not given much thought to passwords, security, or how to manage my passwords efficiently and securely. I usually would either save them in the browser or just re-use passwords (which of course is the worst). Around 6-7 years ago I began to use password managers and password generators, and when {{< abbr "2FA" "Two Factor Authentication, a method of authentication where two parts are needed: A Password and a generated token" >}} became a more common thing I was enabling that on all services I could. 2FA (Two Factor Authentication) is a method of authentication where two parts are needed: A Password and a generated token, this token can be hardware based (e.g. a tiny usb key that generates a token) or they can be time-based which is the most common usage I'd say. I used Google Authenticator for this for years and all was good - until I had to factory-reset my phone and lost my Google Authenticator app with all its 2FA settings.

## Why I lost all my 2FA tokens and settings

I falsely assumed that Google Authenticator would somehow save the Time-based Tokens with my Google Account but that is not the case - they only exist on the device itself. Looking back that is probably the right choice, but I somehow missed it and only realized after receiving my replacement Pixel phone and setting it up again.

"Alright", I thought, "this is bad but I can just redo the setup and I'm good to go." - Well, no. Since 2FA is a security feature you'll need to have a token ready when you want to deactivate it, which is needed in most cases to setup a new 2FA device. For this exact scenario you usually get a bunch of pre-created tokens, usually labeled as "Recovery codes" or "Recovery tokens".

## Recovery codes

I had almost none saved. "Past me" was a idiot and didn't save the recovery codes properly or saved them on some old, long gone computer. I was left without recovery codes, without a working 2FA device, and with no way of resetting 2FA without codes. I checked my computer to find services I was still logged-in to and reset the 2FA settings - or recreated them - where ever it was possible without supplying a code. 

I lost all access to my Discord account and had to create a new one because there is no way of resetting 2FA.

I could recover all really important stuff tho, like GitHub. I saved my recovery codes this time and made sure they are stored in a secure place - a good offline place would be a USB drive, a print-out in a safe; A good online place might be a special password manager database.

## Password manager

Around 2012/2013 i started using a Password Manager called KeyPassX. I meanwhile switched to [KeyPassXC](https://keepassxc.org/) which is a community driven fork because the original KeyPassX does no longer receive updates. KeyPassXC has a great MacOS App and works well with multiple databases, so I can split my passwords across multiple databases, e.g. one for work and some for private usage.

It supports auto-fill with browser plugins and works completely offline. There is no syncing to a third-party cloud, no auto backups in the cloud, no anything; By default it is all on your local computer in an encrypted database file protected by password or key.

On my phone I have used [Keepass2Android](https://play.google.com/store/apps/details?id=keepass2android.keepass2android&hl=en_US) for some years now and it works like a charm. Keepass2Android can read, save, and merge the database in case it is changed on my computer and then synced to the phone or vice versa.

## 2FA Tokens

For 2FA tokens I now use [andOTP](https://github.com/andOTP/andOTP), an open source 2FA token generator app for Android which supports encrypted backups. 

## Sync and cloud storage

As a cloud storage solution I am using Nextcloud. Nextcloud is open source, as are all their official extensions, see [github.com/nextcloud](https://github.com/nextcloud "View open source code by Nextcloud on GitHub"). Another benefit for me is that Nextcloud is developed and maintained by a Germany-based company, which is a nice added bonus and always good to see, since a lot of software comes out of the Silicon Valley filter bubble. I'm increasingly looking to find software and services that do not rely on USA-based infrastructure, money, or services. While laws such as {{< abbr "GDPR" "General Data Protection Law" >}} protect European citizens even if the companies themselves are not within the EU, I feel better when the companies I do business with are closer to me, geographically and law-*ly* . 

Anyhow, Nextcloud is the sync and "backup" solution in my stack. It syncs the database files between my computer and my phone so that I can always access all passwords whenever I need them. On my computer and phone the databases are protected by passwords, all communication to Nextcloud is done over a encrypted connection (HTTPS), too.

I've been using this solution for a bit over two years now and I am very happy with it. Before switching to Nextcloud I used Google Drive to sync my KeyPassX database files, but I am growing increasingly distrustful of Google, so I am trying to pull as much as I can away from its services. Nextcloud works just as good if not better than the Google Drive or Dropbox sync solutions.

Thank you for coming to my TED Talk, see ya. 