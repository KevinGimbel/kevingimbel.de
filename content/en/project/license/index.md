---
title: "License"
type: project
layout: single
date: "2020-05-29"

categories: 
  - javascript
  - deno
tags:
    - cli
    - tool
    - automation

featured: true
short_description: "A Deno CLI script to find and generate LICENSE files"

code_source: https://github.com/kevingimbel/license-cli
code_host: GitHub.com

# Screenshots etc
resources:
    - src: 
      name: ""
---

`license` is a CLI tool for generation open source license files. It's written in TypeScript and executed with [Deno](https://deno.land/), a secure runtime for JavaScript.

`license` is the successor of a [Golang project of the same name](https://github.com/kevingimbel/license) I started years ago and contains more function that I never came around to implement. All features and command can be found on GitHub at [kevingimbel/license-cli](https://github.com/kevingimbel/license-cli).

## Highlights

### Search for a license by keywords

The example below shows all licenses matching the keyword "public-use"

```bash
$ license find public-use

========================================
Academic Free License v3.0 (AFL-3.0)
Description:
The Academic Free License is a variant of the Open Software License that does not require that the source code of derivative works be disclosed. It contains explicit copyright and patent grants and reserves trademark rights in the author.

Conditions:  include-copyright, document-changes
Limitations: trademark-use, liability, warranty
Permissions: commercial-use, modifications, distribution, private-use, patent-use


========================================
GNU Affero General Public License v3.0 (AGPL-3.0)
Description:
Permissions of this strongest copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights. When a modified version is used to provide a service over a network, the complete source code of the modified version must be made available.

Conditions:  include-copyright, document-changes, disclose-source, network-use-disclose, same-license
Limitations: liability, warranty
Permissions: commercial-use, modifications, distribution, patent-use, private-use


========================================
Apache License 2.0 (Apache-2.0)
Description:
A permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code.

Conditions:  include-copyright, document-changes
Limitations: trademark-use, liability, warranty
Permissions: commercial-use, modifications, distribution, patent-use, private-use
```