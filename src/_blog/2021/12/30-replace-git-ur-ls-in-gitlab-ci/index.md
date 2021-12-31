---
title: "Replace git URLs in Gitlab CI"
subtitle: ""
type: blog
categories:
  - devops
tags:
  - git
  - ci
  - gitlab
date: "2021-12-30"
lastmod: "2021-12-30"

head: null
foot: null
svg_title: null

draft: false
---

When working with Gitlab as a storage for Terraform or Ansible modules you probably access them using SSH, like `git@gitlab.instance:group/project.git`. This has the advantage that authentication is done using SSH keys and everybody on your team can access the repositories just like they'd do when cloning on the terminal - no need for entering passwords during clone or install.

{% note "info" %}
Before we begin: I use Ansible roles as an example here, but this applies to any sort of installable module from git sources, e.g. private NPM modules or Python packages stored in Gitlab repositories.
{% endnote %}

The method described has a disadvantage: In CI you may not have an SSH key ready, or you need different SSH keys for security reasons. Managing all the different SSH keys just to clone some repositories is tiresome - so how can we access the repositories without rewriting all our code or exposing SSH keys on the build agent?

The answer is `git config --global url`! 

```shell
git config --global url."https://gitlab-ci-user:${GITLAB_TOKEN}@gitlab.instance/".insteadOf "git@gitlab.instance:"
```

Notice the `/` and `:` - they are important! This will rewrite `git@gitlab.instance:group/project.git` to `https://gitlab-ci-user:${GITLAB_TOKEN}@gitlab.instance/project/group.git` when cloning the source code, which allows us to access the repository using the `$GITLAB_TOKEN` and username rather than SSH.

`$GITLAB_TOKEN` is a custom project level access token. Assuming you have all your Ansible roles under `gitlab.instance/ansible` the token would be created on the `ansible` group level (see [official Gitlab documentation](https://docs.gitlab.com/ee/user/project/deploy_tokens/#group-deploy-token)).

## Full gitlab-ci example

```yaml
variables:
  GITLAB_TOKEN:
    description: "Token used to authenticate with the Ansible group in Gitlab"
  GITLAB_USER:
    description: "User associated with the GITLAB_TOKEN. Can be set during creation"
    value: "gitlab-ci-ansible"

stages:
  - deploy

deploy-ansible:
  image: my/ansible-container
  stage: deploy
  script:
    - git config --global url."https://${GITLAB_USER}:${GITLAB_TOKEN}@gitlab.instance/".insteadOf "git@gitlab.instance:"
    - ansible --version
    - ansible-galaxy install -r requirements.yml -p roles --force
    - ansible-playbook site.yml
```

This config will run the configuration step, then print the ansible version, install the requirements, and finally runs the `site.yml` playbook. The requirements can now be installed from private Gitlab repositories, and the Ansible run finishes successfully!

## Further reading

- [Gitlab Documentation](https://docs.gitlab.com/ee/user/project/deploy_tokens/#group-deploy-token)
