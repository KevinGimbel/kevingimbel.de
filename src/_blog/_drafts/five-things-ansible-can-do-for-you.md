---
title: "5 Things Ansible Can Do for You"

type: blog
categories:
    - coding
tags:
    - ansible
    - configuration
    - tool
    - devops
    - sysops
    - sysadmin
date: "2021-01-12"
lastmod: "2021-01-12"
language: "en"
draft: true
---

In this post I want to highlight 5 things that Ansible can do you may not know about. When I started with Ansible I was quite overwhelmed by all the new things, and my first custom roles and playbooks weren't that great (in fact, they were really bad!). It took time to get to a comfortable level and to establish rules in the team at work, and we constantly iterate and improve over our Ansible usage.

Some code examples for this blog post can be found on GitHub at [KevinGimbel/blog-ansible-tips](https://github.com/KevinGimbel/blog-ansible-tips). Feel free to clone the repo and test things along the way!

## Ansible can encrypt and decrypt variable files

Ansible comes with a command named `ansible-vault` that can be used to encrypt and decrypt files! This makes it super easy and secure to commit config files into source control like git. 

To use `ansible-vault` we first need a `ansible.cfg` configuration file. Chances are you already got one in your playbook, but if you haven't here's an example:

```ini
[defaults]
vault_password_file = /some/directory/my.vault.password
```

{% note "info" %}
I removed everything that isn't relevant from the config file! A config file in your project will likely have more fields
{% endnote %}

By configuring `vault_password_file` we tell ansible in which file it can find a password to encrypt and decrypt our files. This file contains only the password, like so:

```bash
fHd0M5wWuYRqstyI7rw4WvwP10xnkvhNLHo3BC2O4bhVuT7hNhtOnfWtjgIySKhzWHNUr3Z6Nn9uU93yDbmqymGXFmUkjGhXCBmCc468rwrQsEg2HMt1h0Pmqj5yVTkN
```

With this config in place encrypt and decrypt files with the `ansible-vault` cli. Assuming we have all secrets in a `vault_vars.yml` file inside `inventories/production/group_vars/magento2` directory:

- ansible-vault encrypt inventories/production/group_vars/magento2/vault_vars.yml
- ansible-vault decrypt inventories/production/group_vars/magento2/vault_vars.yml

You can also view the file without decrypting it:

- ansible-vault view inventories/production/group_vars/magento2/vault_vars.yml

{% note %}
**Pro tip**: If you are using a shared cloud drive like Nextcloud, OwnCloud or AWS S3, you can share the vault password files with your team and have them automatically synced into some directory on everyones computer, like `~/work/ansible-password/` so everybody can decrypt the files with no additional setup steps. 

Alternatively you can share the password with a traditional password manager but then everybody needs to setup the files first!
{% endnote %}

## Ansible can run commands against localhost

Ansible by default connects via SSH to a remote server and then runs commands through Python, but sometimes we do not need this. If we talk to a API (see below), we may not want to run the code on a server and instead just want to execute code through Ansible. For this the special `localhost` host keyword exists!

Take the following playbook

```yaml
---
- hosts: localhost
  tasks:
    - name: "get hostname"
      command: "hostname"
      register: local_name
    - name: "show hostname"
      debug:
        msg: "{{ local_name.stdout }}"
```

If we run this playbook with `ansible-playbook tip-2-local.yml` it will not connect to any remote server and just show the host name of the local computer.

```bash
$ ansible-playbook tip-2-local.yml

PLAY [localhost] **************************************************************************************************

TASK [Gathering Facts] ********************************************************************************************
ok: [localhost]

TASK [get hostname] ***********************************************************************************************
changed: [localhost]

TASK [show hostname] **********************************************************************************************
ok: [localhost] => {
    "msg": "kevins-mbp.lan"
}

PLAY RECAP ********************************************************************************************************
localhost                  : ok=3    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   

```

## Ansible can simulate changes

When working on a playbook or deploying a new role for the first time, it can be nice to get an overview of what would change before doing any change at all. For this, Ansible has the `--check` flag.

All tasks will be marked as "skipped" and Ansible will not make any changes at all!

```bash
$ ansible-playbook --check tip-3-check.yml

PLAY [localhost] **************************************************************************************************

TASK [Gathering Facts] ********************************************************************************************
ok: [localhost]

TASK [move file] **************************************************************************************************
skipping: [localhost]

PLAY RECAP ********************************************************************************************************
localhost                  : ok=1    changed=0    unreachable=0    failed=0    skipped=1    rescued=0    ignored=0   

```

## Ansible can run only a subset of tasks

Ansible can also run a subset of all tasks. This is especially helpful when the changes do not require a full deployment / check. Think of a Apache role where the user maybe wants to update a virtual host but has no interest in running other tasks such as checking the installed version or enabling modules. In such a case we can use tags on our tasks when writing an ansible role.

```yaml
---
- name: "test tags"
  debug:
    msg: "I only run with -t test1"
  tags:
    - test1
- name: "test tags 2"
  debug:
    msg: "I only run with -t test2"
  tags:
    - test2
```

If we now run ansible-playbook with `--tags` or `-t` flag only the matching tasks will be executed. If we run _without specifying tags_, all tasks will run!