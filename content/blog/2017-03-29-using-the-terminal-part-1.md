---
title: "Using the Terminal: The Prompt"
categories: 
  - coding
  - devops
  - tutorial
tags:
  - workflow
  - productivity
  - apps
date: 2017-03-29T18:34:37+01:00
aliases:
  - /using-the-terminal-the-prompt/
---

The Terminal (or _bash_, _shell_, _console_) is an incredibly powerful program available on (almost) all operating systems such as Mac OS, Windows, or Linux Distributions like Ubuntu, Mint, Fedora, CentOS, ... - you get the picture. Using the terminal in an efficient way to navigate the computer or writing your own programs and snippets to enhance your workflows is incredibly powerful. I already [wrote about one custom script named `ws`](/bash-script-ws/) which enhances my daily workflows. This article marks the first of many to come about using and configuring your terminal. This tutorial is written for MacOS and Linux, though most of it will work on Windows 10 if you use Bash.

To get started with this tutorial open up your terminal. If you don't know how to open a terminal your first mission is to find out how! (_Hint: Google is your friend!_). Once the terminal is open we can start with some basic operations.

_Note:_ On newer Windows versions you should use Bash if available! This tutorial will probably not work with older Windows Verisons (XP, 7, maybe even 8) and the Windows Terminal (e.g. CMD).

In this tutorial we will customize the Prompt. To do so, we will use VIM, a command-line Editor available in most systems (including servers) - VIM is powerful but horribly unfamiliar at first. If you prefer to use a different editor do so, but I highly recomment to learn the basics of VIM - it'll help you once you start interacting with systems that do not have a graphical user interface (e.g. Servers, Containers).

## Preface: VIM

> Below I explain some basics for using VIM, which is used throughout this tutorial to edit files. If you know how to use VIM, [skip to the next section]({{< anchor >}}#the-prompt)

[VIM](http://www.vim.org/) is am incredibly powerful text editor available from the command line. It's a bit weird to get used to at first but once you know your way around you'll become quite productive with it. It's easier to edit config files with VIM compared to opening them in a Editor like Atom or Sublime Text. VIM can be used by executing the `vim` command from a terminal which shows the default vim startup screen as seen below.

{{< figure src="/images/posts/2017/terminal/prompt/vim-empty-file.png" caption="An empty file opened in VIM" >}}

To start writing text we need to enter Input Mode. This is done by typing an `i`. Afterwards, we can write. VIM has three different modes: Input, Visual and Normal. To leave a mode and return to normal, you need to press `ESC`. Visual Mode can be used to select multiple lines or copy/paste things around. Insert Mode is mainly used for writing text and Normal Mode is used for navigation, e.g to move to the Top of a file (`gg`) or bottom of a file (`SHIFT+G`). VIM works a lot with shortcuts which is why we can edit text files so fast with it. Consider the following example HTML tag.

```html
<div class="some-class-name another-class-name yet more classes"></div>
```

To remove all classes and add a new class name you would move your mouse to the line, select everything between `"` and `"`, and then enter the new class name. In VIM, you can enter Normal Mode, place the cursor inside the element and press `ci"` (_change in "_). The entrie text will be removed and VIM enters Insert Mode inside the `""`. To change a word, you write `cw`. To write text inside the tag, `cit` (change in tag) and the cursor is placed inside the `<div>`. Additional to the default movement and replacing there are plugins to make this even faster or smarter, like [surround.vim](https://github.com/tpope/vim-surround).

So, VIM is quite an editor. Get used to it, you'll thank me later! What we need to know for basic file editing and this tutorial is the following:

- `i` is pressed to enter Insert Mode
- `ESC` is pressed to exit a mode, e.g. Insert or Visual
- all commands starting with `:` are executed by pressing the `<Enter>` key, e.g. `:wq<Enter>`
- `:` is pressed to enter a command (literally type a `:`, e.g. with `SHIFT+.` or wherever it is on your keyboard)
- `:w` means `write`. To write a file, press `SHIFT+.`, then `w`, then `Enter`.
- To quit the editor, write `:q`, then `Enter`. To force quit without saving, type `:q!`, then `Enter`
- Moving the cursor is done with UP, DOWN, RIGHT, and LEFT Arrow Keys or `h,j,k,l` in Normal Mode or Visual Mode
  - `h` = left
  - `j` = down
  - `k` = up
  - `l` = right

Lots of VIM Tips can be found in the [VIM Wikia](http://vim.wikia.com/wiki/Vim_Tips_Wiki).

## The Prompt

One your terminal is open you should see a Dollar Sign (`$`) or similar symbol, like shown below.

```sh
~ $
```

This is the Prompt. The Prompt shows the current directory (`~`) and most of the time has a fixed sign, e.g. `$`. Other prompts might use symbols like `# `, `%` `bash-3.2$` or `kevin@ubuntu: $`. The prompt is configurable and comes with different defaults depending on the operating system. So, each line below is how a prompt may look.

```sh
kevin@MacBook-Pro: ~ $
~/Development #
/usr/share/docs %
root@ubuntu: / $
```

The Prompt can be changed by updating the `PS1` environment variable. Environment variables are available to the entire system and can be used to configure programs or create shortcuts. The `PS1` is defined inside the `.bashrc`, `.zshrc`, or other shell runtime file. If you are not sure which shell your are using, run `echo $SHELL` which gives back a string like `/bin/zsh` or `/bin/bash`. To change the PS1, open the config file (either `.bashrc` or `.zshrc`) inside an editor like `vim` - from the command line.

```
$ vim $HOME/.bashrc
```

If the files is not empty, go to the bottom (`SHIFT+G` in vim) and enter input mode (press `i`). Write the following, then save the file and quit:

```sh
export PS1="MY CUSTOM PROMPT "
```
> *Note:* To write a file in VIM, press `:` and then type `w` and press enter.

Now we need to reload the configuration file (`.bashrc`) by typing `source ~/.bashrc` into the terminal and hitting enter. The prompt now looks like this:

```sh
MY CUSTOM PROMPT
```

Congrats, your first custom prompt! That's not a useful prompt, however, because it will always show `MY CUSTOM PROMPT`. A prompt that shows the current directory would be more useful. As it happens, we can use variables inside the Prompt and there are pre-defined variables which hold informations like the current directory, the current logged-in user, the hostname, and man more! Let's start with the working directory - the directory on the file system we are currently in. The working directory is stored inside the `\W` variable and we can use it like so

```
$ vim ~/.bashrc
export PS1="\W $"
```

Save the fie (`:wq`) and reload the configuration with `source ~/.bashrc`. The prompt now looks like shown below.

{{< figure src="/images/posts/2017/terminal/prompt/prompt-simple-working-directory.png" caption="A simple prompt showing the Working Directory" >}}

The first part before the `$` will be different for you, depending on where on your computer you currently are. To find out where you are, type `pwd` which shows the current path. You will see that `pwd` shows a lot more than what we see in the prompt! That is because the variable `\W` holds only the current directory without a full path. To get the full path, we need to use `\w`. Change your `.bashrc` file so the `PS1` uses the `\w` variable, reload the configuration (`source ~/.bashrc`) and see what happens. Your prompt should look similar to the one below.

{{< figure src="/images/posts/2017/terminal/prompt/prompt-long-working-directory.png" caption="Using \w, we get the full path from the HOME directory" >}}

The full directory path can be helpful but it can also get really long. I like to have a line break in my `PS1` so that I can enter text below the directory listing. To have a line break add a `\n` character before `$` - the `$`-symbol will then move to the next line as shown below.

{{< figure src="/images/posts/2017/terminal/prompt/prompt-with-new-line.png" caption="A terminal prompt with a new line" >}}

Looking good! The last thing we need - or I want - is to have some color in my prompt so that it's easier to recognize the path or see the hostname - to add color we can either use escape characters like `\[\033[34m\]` or - what I prefer - `tput`. You can [read more on escape characters](http://tldp.org/HOWTO/Bash-Prompt-HOWTO/x329.html) if you wish. I will focus on [`tput`](https://linux.die.net/man/1/tput). I like to define my color variables first and then use them later. To define a variable in shell scripting write `variableName="value"`. If you need to execute a program to get your variable value, you have to surround it with `$()`. For example to read the content of the file `test.txt` into the variable `content`, you'd write `content="$(cat test.txt)"`.

Define and use colors in `.bashrc` or `.zshrc`.

```sh
# predefine variables
ps1_green="$(tput setaf 2)"
ps1_yellow="$(tput setaf 3)"
ps1_reset="$(tput sgr0)\e[m"
export PS1="$ps1_green\w\n$ps1_yellow\$$ps1_reset "
```
_Note: A great reference for this technique is [this handy list](http://linux.101hacks.com/ps1-examples/prompt-color-using-tput/)_

In my testing I needed to use `\e[m` to properly reset the new lines. Otherwise commands would sometimes become cluttered when navigating back with `arrow up`.

So that's it for the first part of customizing and using the terminal. Below are some of the `tput` colors from [linux.101hacks.com](http://linux.101hacks.com/ps1-examples/prompt-color-using-tput/) - mostly as a reference for myself. 😁

| Command | Output |
|---------|--------|
| `tput bold` | Turn on **bold** text |
| `tput smul` | Begin underline mode |
| `tput rmul` | Exit underline mode |
| `tput sgr0` | Reset code, turns off all attributes |
| `tput setaf` | Set forground color using [ANSI escape](https://en.wikipedia.org/wiki/ANSI_escape_code) |
| `tput setab` | Set background color using [ANSI escape](https://en.wikipedia.org/wiki/ANSI_escape_code) |

And here are the 8 color codes you can combine with `tput setaf` and `tput setab`.

| Code | Color |
|---------|--------|
| `0` | Black |
| `1` | Red |
| `2` | Green |
| `3` | Yellow |
| `4` | Blue |
| `5` | Magenta |
| `6` | Cyan |
| `7` | White |
