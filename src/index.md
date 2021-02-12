---
title: "Home"
layout: home
templateEngineOverride: "md,njk"
head: |
  <style>
  :root {
      --content-width: 60rem;
  }
  
  .author__bio { margin: 0 0 2rem 0; max-width: 100%; }

  .post {
    margin-top: 2rem;
  }

  @media all and (max-width: 900px) {
    :root {
      --content-width: 80vw;
    }

    .flex__boxed {
      --padding: 1em 0 !important;
    }
  }
  </style>
---

<section class="pop-box">
<div class="[ flex flex--space-around flex--centered ]  [ small-flex__column ]">
  <div class="flex__boxed" style="--padding: 4rem 0 2rem">
    <img src="/assets/img/kevin-avatar-w200.jpg" alt="Avatar, a picture of Kevin Gimbel" class="author__avatar" style="max-width: 200px;">
  </div>
  <div class="flex__boxed" style="--padding: 2rem 0 2rem 2rem">
    <h1 class="mb0 mt0">Hi, I'm <a href="/about/">Kevin</a>.</h1>
    <p>I'm a <b>DevOps Engineer</b> with a focus on <i class="t-accent">automation</i> and security.</p>
  </div>
</div>
  <p>Before shifting into DevOps and cloud computing I worked as <i class="t-accent">Front-End Developer</i>, which is still a hobby and field of interest for me.</p>

  <p>You can find out more <a href="/about">on the about page</a>.</p>
</section>


<section class="break-left">
<h2 class="h1 pl2">The last things I wrote about</h2>
<div class="home__last-posts">
{% set limit = 3 %}
{% set current = 0 %}
{% set posts = collections.blog | reverse %}

{% for post in posts %}
  {% if current < limit %}
  <article class="post-teaser post-teaser-{{ current }}">
  <a href="{{ post.url }}" title="Continue reading {{ post.data.title }}">
  <h3 class="post-teaser__headline">{{ post.data.title }}</h3>
  {% if post.data.subtitle %}
  <p class="h4 post-teaser__sub-headline">{{ post.data.subtitle }}</p>
  {% else %}
  <p>{{ post.templateContent | striptags(true) | safe | truncate(280) }}</p>
  {% endif %}
  </a>
  {% for category in post.data.categories %}<span class="post-teaser__category">#{{ category }}</span> {% endfor %}
  </article> 
  {% endif %}
  {% set current = current + 1 %}
{% endfor %}

<div class="post-teaser__view-all">
  <p><a href="/blog">View all articles</a> 👉</p>
</div>
</div>
</section>