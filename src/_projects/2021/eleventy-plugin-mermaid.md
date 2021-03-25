---
title: "eleventy-plugin-mermaid"
subtitle: "Integrate Mermaid graphs with eleventy"
type: project
tags:
  - 11ty
  - 11ty-plugin
  - eleventy
  - eleventy-plugin
date: "2021-03-25"
lastmod: "2021-03-25"

repo_url: "https://github.com/KevinGimbel/eleventy-plugin-mermaid"
npm_url: "https://npmjs.com/@kevingimbel/eleventy-plugin-mermaid"
---

This plugin integrate the [Mermaid graphic library](https://mermaid-js.github.io/mermaid/#/) with [Eleventy](https://11ty.dev/), all that is needed is a Code Block with the `mermaid` language tag.

See [GitHub Readme](https://github.com/KevinGimbel/eleventy-plugin-mermaid) for setup instructions.

## Examples

The following graphs are all rendered with the plugin, see [source code of this page on GitHub](https://github.com/KevinGimbel/kevingimbel.de/tree/main/src/_projects/2021/eleventy-plugin-mermaid.md).

```mermaid
graph TD;
A[Want graphs in 11ty] -->|Search Plugin| B[Find plugin];
B --> C{Use plugin?};
C -->|Yes| D[NICE GRAPHS];
C -->|No| E[NO GRAPHS];
```

```mermaid
graph LR;
A[Install plugin] --> B[???] --> C[Profit];
```

```mermaid
graph BT
A --- B
B-->C[C]
B-->D(D);
```

```mermaid
pie title My pie chart
  "Eaten": 30
  "Not eaten": 70
```

```mermaid
erDiagram
CUSTOMER }|..|{ DELIVERY-ADDRESS : has
CUSTOMER ||--o{ ORDER : places
CUSTOMER ||--o{ INVOICE : "liable for"
DELIVERY-ADDRESS ||--o{ ORDER : receives
INVOICE ||--|{ ORDER : covers
ORDER ||--|{ ORDER-ITEM : includes
PRODUCT-CATEGORY ||--|{ PRODUCT : contains
PRODUCT ||--o{ ORDER-ITEM : "ordered in"
```