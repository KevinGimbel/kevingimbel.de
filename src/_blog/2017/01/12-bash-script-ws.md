---
title: "Bash script: ws"
categories: 
  - coding
  - tools
  - devops
tags:
  - cli
  - bash 
  - scripting
  - automation
  - workflow
  - productivity
date: "2017-01-12T19:22:48+01:00"
aliases:
  - /bash-script-ws/
---

For the past year or so I had a little function in my `.bash_profile` file which made my interaction with the terminal roughly 9001% better - yeah, over 9000! This little function is called `ws` and makes switching between projects inside my workspace a lot easier. Both my private and work projects are inside the `~/Development` directory. If I want to get to a project I would normally navigate like `cd ~/Development/private/github/kevingimbel/kevingimbel.com` - even with tab completion I am too lazy to type this every time I want to work on my website, so I wrote a script for it!

### The script: `ws`

The script is actually a shell function and it looks like this.

```bash
function ws() {
  local workspace="$HOME/Development"
	# $1 is the target directory
  local target_dir="$1"
  # We start searching from the workspace dir
  cd $workspace
  # -maxdepth is the max directories to go "down"
  # head -n1 gives back the first result
  workspace_path=$(find . -maxdepth 3 -type d -name "*$target_dir*" | head -n1)
  if [  -z "$workspace_path" ]; then
    echo "Directory '$target_dir' not found. Changing to $workspace"
  else
    cd "$workspace_path"
  fi
}
```

This function is placed [inside my ~/.bash_profile](https://github.com/kevingimbel/dotfiles/blob/997590a65c134326ca051e1e28a78f947673831d/.zshrc#L14-L28) or `~/.zshrc` so the function is available on every terminal start. It might look odd if your not too farmiliar with shell scripts but it is really rather simple and basic - let's explore it line by line.

With `function ws()` we declare the function name. In shell scripts a function name has parentheses after it tho it does not take arguments this way (If you know why this is, [open an issue and explain it please](https://github.com/kevingimbel/kevingimbel.com/issues) or [tweet me](https://twitter.com/kevingimbel)!). The next lines declare a local variable, `workspace` and then `target_dir=$1` were I assign whatever is passed to the function as being the target directory the user is trying to find. Then, I execute `cd $workspace` to go to the workspace directory and start a search with `workspace_path=$(find -maxdepth 3 -type d -name "*$target_dir*" | head -n1)` - now that might look weird. What happens here is the following:

* We declare a variable, `workspace_path`
* We execute a function with `$()`
* We use `find . -maxdepth 3 -type d -name "*$target_dor*"` to search for a `d`irectory with a name similar to `$target_dir` (the variable from earlier)
* We then pipe (`|`) the output from find to `head` and read in the first line `-n1` - this is the first match
* The return value from `$(find ... | head -n1)` is then available in the `$workspace_path` variable

`$workspace_path` now holds whatever directory was found - or nothing. This is why we check if it is empty (`-z "$workspace_path"`) in the `if` block.

```bash
if [  -z "$workspace_path" ]; then
  echo "Directory '$target_dir' not found. Changing to $workspace"
else
  cd "$workspace_path"
fi
```

This reads: If `$workspace_path` is empty, then `echo` the directory was not found and notify the user we changed to `$workspace` with the `cd $workspace` earlier. Else, `cd` into the found directory. And that's it! Some examples can be seen in the screenshot below.

{% figure "Using the ws function to navigate through my workspace", "/images/posts/2017/bash-ws/bash-ws-function-in-use.png" %}

I am sure the `ws` function can be improved more but it has served my needs well so far. One optimisation might be to use the second argument, `$2`, as parameter for `-maxdepth`.
