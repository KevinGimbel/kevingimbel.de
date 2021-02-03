---
date: 2016-12-21T18:02:42+01:00
title: "Gotcha: dockerignore"
tags:
- docker
- development
categories:
- coding
- devops
aliases:
  - /gotcha-dockerignore/
---

Today I was caught off-guard by a docker "bug" - or so I thought at first. I tried to boot up a project with `docker-compose up` like I do since [switching to a Mac](/goodbye-ubuntu-hello-mac). Unusual was that `docker-compose` stopped at the build step and would not finish the boot. After some confusion and after checking the projects `docker-compose.yml` configuration file I went to GitHub to see the newest [docker for mac issues](https://github.com/docker/for-mac/issues) because I was using the beta release and thought a recent update might broke a thing or two. Looking at the issues I found a similar [issue in docker/for-mac](https://github.com/docker/for-mac/issues/1063) and commented with my setup and output of `docker-compose --verbose up` only to realize a good 30 minutes later my setup was the problem all along.

While the configuration files were all correct, I made a mistake and did not provide a `.dockerignore` file. Without the `.dockerignore` two 6GB SQL dumps in the same directory which were mounted into the docker container which made the docker daemon crash / hang up. The simple solution was to create the following `.dockerignore` file.

```
# database directory on the host
.db
# all sql and gz files
*.sql
*.gz
```

Afterwards the `docker-compose` started without any issues because it now had a build context of around 400MB instead of 13GB.

Lesson learned: Always make sure your `.dockerignore` is setup right and ignores all big files! The full file looks as follows:

```
node_modules
.sass-cache
.db
*.sql
*.gz
.git
```
