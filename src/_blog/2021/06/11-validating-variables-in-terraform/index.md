---
title: "Validating variables in terraform"
subtitle: "Finally, terraform can validate input variables!"
type: blog
categories:
  - devops
  - coding
tags:
  - terraform
  - infrastructure
  - devops
  - IaC
date: "2021-06-11"
lastmod: "2021-06-11"

head: null
foot: null
svg_title: null
---

With the 0.13 release terraform introduces input validation, and with the 1.0.0 releases it was stabilized! Before there was no way of validating variables other than checking their length or doing basic checks inside the code, for example in the `locals.tf` file, and errors with variables mostly came to light during deployments. There was also no way of telling the user _what_ what wrong with a variable.

Excited about this feature I took a deep-dive at work and implemented validation for all variables in our new infrastructure modules. This blog post will go over the possibilities of validations and how to implement them and how to combine multiple asserts. All code examples are _practical_ and no foo-bar-baz made-up code!

Knowledge of terraform is not required, however you should be somewhat familiar with [HCL](https://github.com/hashicorp/hcl), the configuration language of terraform.

{% note "info" %}
All examples are available in a repo at [github.com/KevinGimbel/blog-terraform-validation-example](https://github.com/KevinGimbel/blog-terraform-validation-example). At times this post says "To test this, run..."; All of these can be run against the code inside the example repo. To use the repo, follow these steps:

```bash
git clone https://github.com/KevinGimbel/blog-terraform-validation-example.git
cd blog-terraform-validation-example
terraform init
```
{% endnote %}

## Syntax of a validation

All validations happen in the `variables.tf` file where variables are defined. Inside the block defining a variable a new `validation` block is placed:

```hcl
variable "my_var" {
  type = number
  default = 0

  validation {
    condition = var.my_var >= 0
    error_message = "Please set my_var to a positive number or 0."
  }
}
```

{% note "info" %}
Terraform requires the sentence to start with an uppercase letter and end with a dot.
{% endnote %}

## Validating the length of a string

The following defines a variable named `hetzner_api_token` that represents a [Hetzner Cloud](https://hetzner.cloud/) API token.
 
```hcl
# file: variables.tf
variable "hetzner_api_token" {
  type        = string
  description = "Hetzner API token"
}
```

If somebody would specify `hetzner_api_token = ""` the variable would be defined as far as terraform is concerned and terraform would start deploying until it reaches a point where the missing token causes an issue; To prevent this we can apply validations like so

```hcl
# file: variables.tf
variable "hetzner_api_token" {
  type        = string
  description = "Hetzner API token"

  validation {
    condition     = length(var.hetzner_api_token) == 64
    error_message = "Must be a 64 character long Hetzner API token."
  }
}
```

This validates that the variable is set AND is exactly 64 characters long, which is the length of Hetzner Cloud API tokens.

To test this, run

```bash
# Shows no error and logs the configured token
terraform apply -target=null_resource.validate_hetzner_api_token
# Invalid, shows error message
terraform apply -target=null_resource.validate_hetzner_api_token -var "hetzner_api_token=xxx"
```

## Advanced validation with regex

Checking the `length` might be helpful for simple assertions but sometimes more advanced checks are needed. This is where regex comes into play. To use regex terraform provides the `can` function.

```hcl
variable "server_role_arn" {
  type        = string
  description = "AWS arn of the role to assign to servers"

  validation {
    condition     = can(regex("^arn:aws:iam::[[:digit:]]{12}:role/.+", var.server_role_arn))
    error_message = "Must be a valid AWS IAM role ARN."
  }
}
```

This validation fails if the provides string doesn't match the format of an  _AWS IAM role ARN_. This means it will also fail if an ARN is provided that matches a user, like `arn:aws:iam::012345678912:user/kevin`! The `[[:digit:]]{12}` checks for exactly 12 digits, it's equal to `\d{12}` in other regex engines. `.+` at the end matches any character one or more times.

To test this, run

```bash
terraform apply
# Invalid, shows error message
terraform apply -target=null_resource.validate_server_role_arn
terraform apply -target=null_resource.validate_server_role_arn -var "server_role_arn=arn:aws:iam::012345678912:user/kevin"
```

```
│ Error: Invalid value for variable
│ 
│   on variables.tf line 1:
│    1: variable "server_role_arn" {
│ 
│ Must be a valid AWS IAM role ARN.
│ 
│ This was checked by the validation rule at variables.tf:5,3-13.
```

## Multiple conditions

Validations can have more than one condition. Conditions are grouped together with the `alltrue` and `anytrue` functions, which take a list of conditions and returns `true` or `false`.

```hcl
variable "env" {
  type        = string
  description = "Environment to deploy, can be production, staging, development, or test."

  validation {
    condition = anytrue([
      var.env == "production",
      var.env == "staging",
      var.env == "development",
      var.env == "test"
    ])
    error_message = "Must be a valid env, can be production, staging, development, or test."
  }
}
```

To test this, run

```bash
# valid 
terraform apply -target=null_resource.validate_env
# Invalid 
terraform apply -target=null_resource.validate_env -var "env=prod"
```

## Multiple, nested conditions

`alltrue` and `anytrue` can be nested! The next example validates the variable is a legit Hetzner Server type identifier, without requiring any regex magic! 🥸

```hcl
variable "hetzner_server_type" {
  type        = string
  description = "Server type to use, see https://www.hetzner.com/cloud#pricing"
  default     = "cx21"

  validation {
    condition = alltrue([
      anytrue([
        can(regex("cx*", var.hetzner_server_type)),
        can(regex("cpx*", var.hetzner_server_type)),
        can(regex("ccx*", var.hetzner_server_type))
      ]),
      anytrue([
        length(var.hetzner_server_type) == 5,
        length(var.hetzner_server_type) == 4
      ])
    ])
    error_message = "Must be a valid Hetzner server type, e.g. cx21, cx11, ccx22 see https://www.hetzner.com/cloud#pricing for available options."
  }
}
```

It checks that both of these are true:
- The variable starts with `cx`,  `cpx`, or `ccx`
- The variable is 4 or 5 characters long

To test this, run

```bash
# valid 
terraform apply -target=null_resource.validate_hetzner_server_type
# invalid, shows validation error
terraform apply -target=null_resource.validate_hetzner_server_type -var "hetzner_server_type=nope"
```

## Validating elements in a list

Lastly, using a `for` loop entries inside of a list can be validated.

```hcl
variable "hetzner_datacenters" {
  type        = list(string)
  description = "List of datacenter identifier into which the server can be launched, chosen at random"
  default     = ["nbg1", "fsn1"]

  validation {
    condition = alltrue([
      for dc in var.hetzner_datacenters : contains(["nbg1", "fsn1", "hel1"], dc)
    ])
    error_message = "Must one or more of: 'nbg1', 'fsn1', or 'hel1' - no other value is allowed."
  }
}
```

Right now Hetzner has three datacenter locations, two in Germany (Nürnberg (`nbg1`) and Falkenstein (`fsn1`)) and one in Finland (Helsinki (`hel1`)), so validating them is doable; for AWS, GPC, or Azure this would be a lot harder and require regex instead.

To test this, run

```bash
# valid 
terraform apply -target=null_resource.validate_hetzner_datacenters
# invalid, shows validation error
terraform apply -target=null_resource.validate_hetzner_datacenters -var 'hetzner_datacenters=["fsn1", "lax1"]' 
```

## Conclusion

Using the shown functions like `regex`, `length` and loops we can validate a variable has a certain value or follows a certain format.

With `anytrue` and `alltrue` we can group together multiple validations so that either all or one of multiple conditions must match.

## Further reading

- [Terraform variable documentation](https://www.terraform.io/docs/language/values/variables.html)
- [Terraform `can` function](https://www.terraform.io/docs/language/functions/can.html)
- [Terraform `regex` function](https://www.terraform.io/docs/language/functions/regex.html)
