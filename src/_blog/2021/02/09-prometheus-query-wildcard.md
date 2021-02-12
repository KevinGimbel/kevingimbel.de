---
title: "Wildcards in Prometheus queries"
subtitle: "Learn how to query data in Prometheus and how to use wildcards"
type: blog
categories:
    - code
    - tech
tags:
    - code
    - tech
    - devops
    - prometheus
    - monitoring
date: "2021-02-09"
lastmod: "2021-02-09"
head: null
foot: null
svg_title: null

draft: true
---

Hello and welcome to this "snippet-sized" post about [Prometheus](https://prometheus.io/) queries! Prometheus is a time-series database which means it is build to collect a lot of datasets that show values over time, for example the result of a HTTP request or the RAM usage of a server. At [Synoa](https://synoa.de/) we use Prometheus to monitor the health of our APIs and systems. I won't go into how Prometheus is setup, that's stuff for a different article, but instead this article focuses on _how to query data with wildcards in Prometheus_, using Prometheus own query language.

First we need to define a bit of test data. Assume we have the following datasets in Prometheus:

```
http_status{job="customer-dev",instance="https://dev.some-api.link/service-a",env="dev"}
http_status{job="customer-dev",instance="https://dev.some-api.link/service-b",env="dev"}
http_status{job="customer-dev",instance="https://dev.some-api.link/service-c",env="dev"}
http_status{job="customer-prd",instance="https://some-api.link/service-a",env="prd"}
http_status{job="customer-prd",instance="https://some-api.link/service-b",env="prd"}
http_status{job="customer-prd",instance="https://some-api.link/service-c",env="prd"}
```

Here we have 6 datasets describing `service-a`, `service-b`, and `service-c` running in the PRD (production) and DEV (development) environment. To get all production services we could query like this:

Prometheus Query
```
http_status{env="prd"}
```

Result
```
http_status{job="customer-prd",instance="https://some-api.link/service-a",env="prd"}
http_status{job="customer-prd",instance="https://some-api.link/service-b",env="prd"}
http_status{job="customer-prd",instance="https://some-api.link/service-c",env="prd"}
```

## Wildcards in queries

Coming from MySQL you may think a wildcard could look like `http_status{job="customer-*"}`, but that's not the case with Prometheus. Prometheus uses a Regex-like pattern and the wildcard character is `.+` (read: dot plus) combined with tilde character (`~`) instead of just the equal sign (`=`). So the query becomes  `http_status{job~="customer-.+"}`. In the example below using the `.+` wildcard character we search for metrics where the `instance` label _ends with service-c_.

{% note "info" %}
Prometheus uses the tilde character `~` to indicate a query contains a wildcard. Inside the label-query the "dot plus" (`.+`) character combination is used where all characters are accepted.
{% endnote %}

Prometheus Query
```
http_status{instance=~".+service-c"}
```

Result
```
http_status{job="customer-dev",instance="https://dev.some-api.link/service-c",env="dev"}
http_status{job="customer-prd",instance="https://some-api.link/service-c",env="prd"}
```

Depending on how your metrics are labels querying can be hard or easy. At Synoa I decided to include special labels like `env`, `system`, as well as "good" `job` names. The `job` label always has the format `customer-env-system`, e.g. `customer-prd-magento` or `customer-env-ecs`. If I want to get all customer metrics I query like `http_status{job="customer-.+"}`, if I want to see all dev system metrics I can query for `http_status{job="customer-dev-.+"}`, and so on!

If you got a better label system or a **must-have label** let me know [on Twitter @KevinGimbel](https://twitter.com/KevinGimbel).

## Further reading

- [Prometheus Query documentation](https://prometheus.io/docs/prometheus/latest/querying/basics/)