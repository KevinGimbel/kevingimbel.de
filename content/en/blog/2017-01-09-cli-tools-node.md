---
title: "Writing NodeJS cli tools"
categories: 
  - coding
  - nodejs
  - tools
tags:
  - nodejs
  - javascript
  - cli
date: "2017-01-09T18:02:48+01:00"
aliases:
  - /writing-nodejs-cli-tools/
---

Over 2015 and 2016 I got more and more interested in automating my daily workflows with scripts. For this purpose I learned Bash Scripting (or Shell Scripting) and started writing my first scripts to automate repeating tasks, [creating apache vhosts](https://github.com/kevingimbel/vhost) files for example. Recently I started exploring how to implement command line tools in NodeJS and this post should give an overview.

### Shebang

> If you already know what a Shebang is skip to [the next section](/writing-nodejs-cli-tools/#writing-a-tiny-node-cli-script)

Shell Scripts always start with a [Shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) on the first line. This line is used to indicate which program is used to execute the following script. For Bash scripts the Shebang is `#!/bin/bash`. What the OS or program loader does when executing the script is the following. Consider this sample script named `hello.sh`

```
#!/bin/bash
echo "Hello World!"
```

When it is executed from the command line (cli) with `./hello.sh` the operating system executes the script (`echo "Hello World!"`) with `/bin/bash`. Equally, you could run `/bin/bash ./hello.sh`. When programming a bash script you can also set it to exit on every error, either with `set -e` or with a shebang similar to `#!/bin/bash -e`. The screenshot below demonstrates the difference when running a invalid shell script `bad.sh`.

{{< figure caption="Executing a invalid bash script without shebang and with shebang and -e flag" src="/images/posts/2017/node-cli/shell-shebang-example.png" >}}

As you can see without the `#!/bin/bash -e` shebang the script will execute even after an error occurred - this might not be intended behavior. Anyway, the topic of this post is node and the Shebang in node is essential. NodeJS Scripts are JavaScript and cannot be run - like shell scripts - without an Shebang to tell the system to invoke them with node. The NodeJS Shebang looks a bit different and specifies the "environment" or `env` with `/usr/bin/env`. The Shebang then reads `#!/usr/bin/env node`. Without the Shebang NodeJS scripts will fail immediately after being invoked as seen in the following screenshot.

{{< figure caption="Node Script executed with and without shebang" src="/images/posts/2017/node-cli/node-without-and-with-shebang.png" >}}

While it is not necessarily needed for scripts written in in Shell/Bash the Shebang cannot be omitted from NodeJS scripts intended to be run as command line program.

Well, that has been a fun excursion into the world of shell scripting. Back to node!

### Writing a tiny node cli script

Since we now know how to use a Shebang and how to invoke out Node scripts from the command line we may write a script. Let's keep it simple. We will greet the person executing the script.

```javascript
#!/usr/bin/env node

const sayHello = () => {
  console.log(`Hello, ${process.env.USER}`)
}

sayHello()
```

Let's save the script and run it with `$ node hello.js` from the command line.

{{< figure caption="Running the hello.js script" src="/images/posts/2017/node-cli/node-running-hello-js.png" >}}

Now that's interesting: The script greets the currently logged-in user! That's the case because we make use of the `process` variable which holds information about the current environment - the `env` object for example holds your environment variables. Add a new function to `hello.js` to see the output.

```javascript

const printEnv = () => {
  console.log(process.env)
}

printEnv()
```

You will see the `USER` variable is part of the environment object and holds the name of the logged-in user. This way node scripts can access terminal variables and use them. Run `export _test=123` and then `node hello.js` - `_test` is now part of the environment. By using the Environment we can make a script execute different tasks depending on the environment, as seen in the next snippet.

```javascript
const log = (message, level = 0) => {
  if(process.env.NODE_ENV == 'production') {
    writeLogFile(message, level)
  } else {
    console.log(message)
  }
}

const writeLogFile = (message, level) => {
  console.error('Not implemented')
  process.exit(1)
}

log("This is a test!")
```

Here we have a log function which either runs the `writeLogFile` function when in production mode or logs to the console if we are in any other mode (development for example.)

{{< figure caption="Making use of the environment in a node cli script" src="/images/posts/2017/node-cli/node-using-process-environment.png" >}}

As you can see in the screenshot depending on the `NODE_ENV` variable a different function is executed. The environment can be set inline (`$ export NODE_ENV=production`) for the duration of the shell session or it can be set permanent, e.g. by adding it to the shell runtime file (`~/.zshrc` or `~/.bashrc`). You may also noticed the `process.exit(1)` inside the `writeLogFile` function. The `exit` function enables us to use exit codes to indicate if our script ended successful or not to other processes. If a script exits with `0` it was successful, everything else is considered an error. To see how a script exits you can run `echo $?` inside a terminal.

You can read more about exit codes in [the resources of TLDP](http://www.tldp.org/LDP/abs/html/exit-status.html).

So far we learned that Node CLI scripts:

* need a shebang, `#!/usr/bin/env node`
* are written in regular JavaScript
* can access the environment
* can exit using `process.exit(exit_code)`
* can utilize lots of Node packages

And that's it for today. All the example scripts are [available on GitHub](https://github.com/kevingimbel/blog-node-cli-tools-data).
