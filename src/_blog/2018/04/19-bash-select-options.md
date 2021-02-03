---
title: "TIL: Bash select"
categories: 
  - coding
  - devops
tags:
  - bash
  - til
  - shell
date: 2018-04-18T00:00:00Z
aliases:
  - /til-bash-select/
---

I was recently researching different bash prompts and stumbled upon an [StackExchange answer](https://unix.stackexchange.com/a/193660/136550 "StackExchange answer for question 'In which situations are PS2, PS3, PS4 used as the prompt?'") which explains the different prompt types (`PS1`, `PS2`, `PS3`, and `PS4`). The answer explains how the PS3 prompt is used for commands like `select`. I did not know about select before, so that's the real {% abbr "TIL", "Today I learned" %} here!

> [...] PS3 is shown when the select command is waiting for input [...]

So the `PS3` prompt is shown when a bash program is waiting for user input, and it turns out that the `select` bash command is used for creating a "choice" {% abbr "UI", "User Interface"%} in bash. So what does that mean and how does it work?

## Asking interactive questions in Bash

Let's assume we have a shell script called `make-project` which bootstraps some project stuff, for example configuration files. We could provide the user with an option to choose a format from a list of available configuration formats like `XML` or `JSON`.

We can handle these options via shell arguments like `make-project -format xml`, but we could also ask questions interactively using `select`.

The script looks like this.

```bash
#!/bin/bash

# Default format
format="xml"

# Ask a question
echo "Which configuration format do you prefer?"
# Create the "UI" with a choice option
select f in xml json; do
  format=$f
  # Break to end the select after something was selected
  break;
done

echo "Format: $format"
```

The `select` function takes a variable name (`f` above) and a list of possible values (`xml json`) which is seperated by spaces.

```bash
select myvariable in value1 value2 value3; do
  # $myvariable will be value1, value2, or value3
  selectedValue = $myvariable
  break;
done
```

When our little `make-project` script is run it would looks like this (in Bash 4.4 on Mac OS):
```
$ ./make-project.sh
Which configuration format do you prefer?
1) xml
2) json
#? _
```

The last line, `#?`, is the `PS3` prompt and `_` is the cursor position. The user can now enter a number (1 for `xml` or 2 for `json`) and the selection would be captured and assigned to the `format` variable in our script. If we add `export PS3="Your answer: "` to the script it will replace the default PS3 prompt for your script as shown below.

```
$ ./make-project.sh
Which configuration format do you prefer?
1) xml
2) json
Your answer: _
```

`select` is a clean and simple way to create a interactive UI! I tried the code with the `zsh` and `fish` shell and it looks the same.
