---
title: "How to extend and reuse configs in Gitlab CI"
subtitle: ""
type: blog
categories:
  - devops
tags:
  - gitlab
  - yaml 
  - ci
  - cd
  - deployment
date: "2022-01-11"
lastmod: "2022-01-11"

head: null
foot: null
svg_title: null

draft: true
---

When I began using Gitlab CI the first thing I wanted to know was how to reuse configs. I know that we'll have changing requirements at work and that we'll have hundreds of repositories using basically-the-same configurations so I wanted to make sure we'd have a central place to make changes to these. 

I found two ways to archive reusable configurations which I'll explain below.

## Extends

First of we have the `extends` keyword. This makes a config section of the CI yaml reuse another section, as illustrated below.

```yaml
my-base-block:
  stage: deploy
  script:
    - echo "Hello, Gitlab CI!"

my-other-block:
  extends:
    - my-base-block
```

Gitlab combines this into the following YAML:

```yaml
my-base-block:
  stage: deploy
  script:
  - echo "Hello, Gitlab CI!"
my-other-block:
  stage: deploy
  script:
  - echo "Hello, Gitlab CI!"
  extends:
  - my-base-block
```

So far so good! But there's one downside to `extends`: If `my-other-block` has its own script, it will overwrite the original script, as shown below.

```yaml
my-base-block:
  stage: deploy
  script:
    - echo "Hello, Gitlab CI!"

my-other-block:
  extends:
    - my-base-block
  script:
    - echo "Bye, Gitlab CI!"
```

Merged YAML:

```yaml
my-base-block:
  stage: deploy
  script:
  - echo "Hello, Gitlab CI!"
my-other-block:
  stage: deploy
  script:
  - echo "Bye, Gitlab CI!"
  extends:
  - my-base-block
```

Now that's not what we want, the `script` field was overwritten! Good for us that Gitlab has a solution: `!reference[]`.

## !reference

`!reference[]` is an extension to YAML Gitlab provides, it allows us to reference another block and key which will be - well - referenced!

```yaml
my-base-block:
  stage: deploy
  script:
    - echo "Hello, Gitlab CI!"

my-other-block:
  extends:
    - my-base-block
  script:
    - !reference [my-base-block, script]
    - echo "Bye, Gitlab CI!"
```
And the merged YAML:

```yaml
my-base-block:
  stage: deploy
  script:
  - echo "Hello, Gitlab CI!"
my-other-block:
  stage: deploy
  script:
  - - echo "Hello, Gitlab CI!"
  - echo "Bye, Gitlab CI!"
  extends:
  - my-base-block
```

Now we have both script parts! I'm exited to explore Gitlab further in the future, so far my experience with it has been a real pleasure. 🧡

Thanks for coming to my TED Talk!

## Further reading

- [Official Gitlab Documentation](https://docs.gitlab.com/ee/ci/yaml/yaml_optimization.html#reference-tags)
- [Full .gitlab-ci YAML reference](https://docs.gitlab.com/ee/ci/yaml/)
