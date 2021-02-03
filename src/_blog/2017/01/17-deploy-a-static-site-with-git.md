---
date: 2017-01-17T21:28:38+01:00
title: "Deploy a static site with git"
categories: 
  - coding
  - tools
  - devops
tags:
  - git
  - hugo
  - deployment
  - bash
aliases:
  - /deploy-a-static-site-with-git/
---

If you follow my blog you might recall that I switched from Jekyll hosted on GitHub to [Hugo hosted on Uberspace](/farewell-jekyll-hello-hugo/). Beside the fact I had to create a custom Hugo theme for myself and learn how to run a Hugo blog/website I also had to think about how I am going to deploy my website. Hugo is a static site generator and when executed (`$ hugo`) it compiles the site from Markdown and HTML templates into a `public` directory with lots of folders and HTML files. I could have fiddled with GitHub pages and created a `docs` directory with the live site inside but then I could have stayed with Jekyll in the first place. What made me move to Hugo beside the speed advantages was that I wanted to self-host my website again and use [Let's Encrypt](https://letsencrypt.org/) to create SSL certificates and use HTTPS.

### So, what is a "static site"?

> If you already know the answer, [skip to the next section](#deploying-a-static-site)!

As the name suggest a static site is - well - _static_. There's no fancy Backend to login and no Database required to fetch content. All the content comes from [a bunch of markdown files](https://github.com/kevingimbel/kevingimbel.com/tree/8cc66cd61774e28628848bcfde58d93b8ba3cae1/content/post). These files are then compiled into a lot of HTML files based on [templates](https://github.com/kevingimbel/kevingimbel.com/tree/8cc66cd61774e28628848bcfde58d93b8ba3cae1/themes/kevingimbel/layouts) which in turn a template engine to get content into place. The template for my [/about/](/about/) page looks like this.

```html
{{ define "main" }}
<section class="page wrap" aria-labeldyby="title" aria-describedby="desc">
  <header class="page-header">
    <h2 id="title">{{ .Title }}</h2>
  </header>
  <div class="page-body" id="desc">
    {{ .Content }}
  </div>
</section>
{{ end }}
```

These 10 lines of code make up the default for single pages without a custom template. The words in curly brackets (e.g. `{{ .Content }}`) are variables filled by Hugo when the template is compiled. `{{ define "main" }}` defines the `main` block used inside the [`baseof.html` template](https://github.com/kevingimbel/kevingimbel.com/blob/8cc66cd61774e28628848bcfde58d93b8ba3cae1/themes/kevingimbel/layouts/_default/baseof.html#L36-L38). All these templates make up the final site. So, despite being "static" when finished a static site is not so static! It can be flexible and you can use template logic like conditions (`if/else`, `with`), loops (`range`), and with Hugo even custom [shortcodes inside your markdown](http://gohugo.io/extras/shortcodes/).

At the end of the day we get a static site. This site is compiled from our source files and consists of folders (for URLs) and files (lots of `index.html` files!) so our server (apache, nginx, a node app) can deliver the content to the client. You might know that by default apache will serve any files such as `index.html` or `index.htm` when a route is requested unless you use a dynamic system such as PHP, Ruby, or NodeJS to serve your files. When you load this article at https://kevingimbel.com/deploy-a-static-site-with-git/ you request a folder, `deploy-a-static-site-with-git`, located inside the web root directory of my server and the `index.html` file inside this folder gets served to you by Apache. This is the basics how static websites work - they're simply HTML files and folders!

### Deploying a static site

So far we learned  that static sites are "just" folders and HTML files when generated. The only dependency they have to make them work is a Web Server. This can be apache, nginx, IIS, a simple nodeJS app, or even `python -m SimpleHTTPServer`. The most basic deployment for our website would be to upload the content of the generated folder (`public`) to our server using FTP. You might remember that this was the standard for having a website in the 90s were all websites were coded in Frames or tables. My first "real website" around 2008 was deployed that way. It was a mess.

What I did might be over-engineering in some way. I have all my source code in git so I set up a git repository on my server and push to this repository whenever I want to publish a new blog post, fix an issue, or change some templates/CSS. What's important about the repository is that it needs to be a [bare repository](https://git-scm.com/book/en/v2/Git-on-the-Server-Getting-Git-on-a-Server).

#### Setting up the git repository

The repository can be in any directory on your server which your user (the one you login with ssh) has access to. It should not be your web server root, that is `/var/www/` or `/var/www/html/` depending on your system since the files inside the bare repo could be exposed to the public this way. I created a directory outside the web server root in my users `home` directory, namely `$HOME/repository/kevingimbel.com`. The steps to setup the bare repository are as follows.

```bash
$ ssh youruser@yourserver
$ mkdir -p $HOME/repository/kevingimbel.com
$ cd $HOME/repository/kevingimbel.com
$ git clone --bare https://github.com/kevingimbel/kevingimbel.com
```

These commands create the `repository` directory with a sub-directory `kevingimbel.com` inside. Inside this new directory I clone the git repository from GitHub with the [`--bare`](https://git-scm.com/docs/git#git---bare) flag set. This will not checkout the source code but instead setup a git repository which we can push to or pull from - just like we would do from GitHub. What we need to build the static site is `hugo` as executable on the server -and the source code of the site. "Wait!" I hear you say, "Didn't you just say there _is no source code?!_" - that's right. The bare repository holds no source code but it can _be pushed to_! When we push our code to this remote we can use a [git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) to execute a set of scripts when a push is received. To do so, we use the `post-receive` hook. There are examples for each hook inside your newly created directory, e.g. `$HOME/repository/kevingimbel.com/hooks`.

#### The post-receive hook

The `post-receive` hook is executed after the git repository receives a new push. There are also `pre-` hooks which are executed before certain actions take place. You can use `pre-commit` for example to run a set of tests before you are able to write a commit message. I did this in for my example [node cli script nodesh](https://github.com/kevingimbel/nodesh/blob/master/scripts/pre-commit) to run [mocha](https://mochajs.org/) before I am able to commit. If a test fails and mocha exits with a non 0 code the commit is aborted. To build our static site after we push to the repository we will use the `post-receive` hook.

The `post-receive` hook I use can be found [on GitHub](https://github.com/kevingimbel/kevingimbel.com/blob/master/scripts/post-receive). The `post-receive` hook is a bash script which has access to a lot of built-in functions as well as all your users functions when a `source ~/.bash_profile` line is added to the top.

```
#!/bin/sh

source ~/.bash_profile

repository_path=$HOME/repositories/kevingimbel.com
project_path=$HOME/subdomains/html
hugo_file_path=$HOME/hugosrc
css_path=$hugo_file_path/themes/kevingimbel/static/css
css_file=$css_path/style.css
base_theme_file=$hugo_file_path/themes/kevingimbel/layouts/_default/baseof.html
while read oldrev newrev refname
do
    # Get the name of the current branch
    branch=$(git rev-parse --symbolic --abbrev-ref $refname)

    # Checkout master branch
    if [ "$branch" = "master" ]; then
      git --work-tree=$hugo_file_path --git-dir=$repository_path checkout -f master

      # Get checksum of file
      file_shasum=$(shasum $css_file | awk -F' ' '{ print $1 }')

      # declare name of new CSS file
      new_css_file_name="style.$file_shasum.css"

      # move style.css to the new CSS name (rename)
      mv $css_file $css_path/$new_css_file_name

      # replace name in template before hugo is build
      sed -i "s/style\.css/${new_css_file_name}/g" $base_theme_file

      hugo -b="https://kevingimbel.com" -d="$project_path" -s="$hugo_file_path"
    fi
done
```

There happens quite a lot in my `post-receive` but the most import parts are the  `git checkout` with the [`--work-tree`](https://git-scm.com/docs/git#git---work-treeltpathgt) and [`--git-dir`](https://git-scm.com/docs/git#git---git-dirltpathgt) to tell git were the git repository is (`--git-dir`) and were the files should be checked-out to (`--work-tree`). I checkout the files to `$HOME/hugosrc`where the source code of my website is placed just like on GitHub. I then [do some magic](https://github.com/kevingimbel/kevingimbel.com/blob/master/scripts/post-receive#L33-L42) to re-write my `style.css` file to a hashed-file. This is used to force browsers to re-load the CSS when the file has changed. After the style.css re-write is done and the css path inside the  `baseof.html` template is changed I build the site with `hugo`.

```bash
hugo -b="https://kevingimbel.com" -d="$project_path" -s="$hugo_file_path"
```
`-b` is the base url, `-d` is the destination and `-s` is the source. This way the static site is generated into my document root folder ($home/subdomains/html) with the new source files checked-out by git into the `$HOME/hugosrc` directory. Hugo generates the site and logs all output to the terminal - which is nice to have. In case of a build error hugo stops and does not overwrite the existing, working site. This is also nice to have.

What's important is that the `post-receive` hook is executable, so you have to run `$ chmod +x post-receive` to set the `x` (or e`x`ecute) permission on the file.

#### Pushing to the new repository

To push your code to the new repository you need to add it as a [remote](https://git-scm.com/docs/git-remote) to your local git repository. To do so, use `git remote add` filling in the remote name and remote url parameters.

```bash
# git remote add $name $url
$ git remote add production ssh://YOUR_USER@YOUR_SERVER:/home/YOUR_USER/repository/gitrepo
```
Afterwards you are able to push your code with `git push production master`.

And that's it! This way I deploy and build my static site on my server using git. I am sure the script could be refactored and optimized more if I would dive deeper into git and git hooks - and I might do. At the moment it satisfies my needs and I am happy with it.
