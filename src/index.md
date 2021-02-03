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
  }
  </style>
---

<section class="pop-box">
<div class="[ flex flex--space-around flex--centered ]  [ small--flex__column ]">
  <div class="flex__boxed" style="--padding: 4rem 0 2rem">
    <img src="/assets/img/kevin-avatar-w200.jpg" class="author__avatar" style="max-width: 200px;">
  </div>
  <div class="flex__boxed" style="--padding: 2rem 0 2rem 2rem">
    <h1 class="mb0 mt0">Hi, I'm <a href="/about/">Kevin</a>.</h1>
  </div>
</div>
    <p class="h4">A <i class="t-accent">DevOps Engineer</i> with a background in Front-End Development, passionated Gamer both digital and tabletop, <br>& a <i class="t-accent">husband/dad</i>.</p>
</section>

<p class="h4">The last thing I blogged about was:<br>
<span class="h1">{% latest_post collections.blog, "home" %}</span></p>

<p><a href="/blog">View all articles</a></p>