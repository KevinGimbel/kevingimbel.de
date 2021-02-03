// Plugins 
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");
const caniuse = require("@kevingimbel/eleventy-plugin-caniuse");
const codepenEmbed = require("@kevingimbel/eleventy-plugin-codepen");
const ratingPlugin = require("@kevingimbel/eleventy-plugin-emoji-rating");
const pageAssetsPlugin = require('eleventy-plugin-page-assets');
const Image = require("@11ty/eleventy-img");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const path = require("path");
const sizeOf = require('image-size');
// Helper
const markdown = require("markdown-it")({ html: true });
const inspect = require("util").inspect;

// This shortcode is taken from the official docs at 11ty.dev/docs/plugins/image/#use-this-in-your-templates
async function imageShortcode(src, alt, url) {
  let metadata = Image.statsSync(src, {
    widths: [600, 900, 1200],
    formats: ["avif", "jpeg"],
    outputDir: path.dirname(src),
    urlPath: url,
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);

      return `${name}-${width}w.${format}`;
    }
  });

  let lowsrc = metadata.jpeg[0];

  let imageAttributes = {
    alt,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return `<picture>
    ${Object.values(metadata).map(imageFormat => {
    return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="(min-width: 30em) 50vw, 100vw">`;
  }).join("\n")}
      <img
        src="${lowsrc.url}"
        alt="${alt}"
        loading="lazy"
        decoding="async">
    </picture>`;
}

module.exports = function (eleventyConfig) {

  // image shortcode
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  // ============================================= Plugins 
  //
  //
  // Readtime, with emoji!
  eleventyConfig.addPlugin(emojiReadTime);
  // caniuse shortcode
  eleventyConfig.addPlugin(caniuse);
  // rating shortcode
  eleventyConfig.addPlugin(ratingPlugin);

  // codePen embed shortcode
  eleventyConfig.addPlugin(codepenEmbed, {
    height: 350
  });

  // allows assets beside article content
  eleventyConfig.addPlugin(pageAssetsPlugin, {
    mode: "directory",
    assetsMatching: "*.png|*.jpg|*.jpeg|*.avif|*.gif",
    postsMatching: ["_blog/**/**/**/*.md", "_photography/**/*.md"],
  });

  // syntax highlighting
  eleventyConfig.addPlugin(syntaxHighlight);
  // RSS
  eleventyConfig.addPlugin(pluginRss);

  // debug shortcode to print out prettyfied data structs
  eleventyConfig.addFilter("debug", (content) => `<pre>${inspect(content)}</pre>`);

  // abbr shortcode to use the `<abbr>` tag in Markdown
  eleventyConfig.addShortcode("abbr", function (short, explanation) { return `<abbr title="${explanation}">${short}</abbr>` });

  // figure, this is used _a lot_
  eleventyConfig.addShortcode("figure", function (src, caption, alt) {
    // @TODO: find way to retrieve image width and height here
    let figcaption_html = (caption != "") ? `<figcaption>${markdown.renderInline(caption)}</figcaption>` : '';
    return `<figure><img src="${src}" alt="${alt ? alt : (caption ? caption : '')}" />${figcaption_html}</figure>`;
  });

  // beautiful quotes, used for "this week on the internetz" -> https://kevingimbel.de/tags/this-week-on-the-internetz/
  eleventyConfig.addPairedShortcode("quotefm", function (content, quote_src_link, quote_src_text) {
    let src = quote_src_link ? `<cite class="quotefm__source">via <a href="${quote_src_link}">${quote_src_text ? quote_src_text : new URL(quote_src_link).hostname}</a></cite>` : '';
    return `<blockquote class="quotefm"><a href="${quote_src_link}" class="db"><span class="quotefm__content"><span class="quote-lvl1"><span class="quote-lvl2"><span class="quote-lvl3">“${content}”</span></span></span></span></a>${src}</blockquote></a>`
  });

  // TODO(kevingimbel): Properly implement Mastodon shortcode again
  eleventyConfig.addShortcode("mastodon", function (link) { return `<a href="${link}">${link}</a>` });

  // wraps content in `<details>` HTML element
  eleventyConfig.addPairedShortcode("details", function (content, summary) { return `<details><summary>${summary}</summary>${markdown.render(content)}</details>` });

  // TODO(kevingimbel): Refactor 
  eleventyConfig.addPairedShortcode("note", function (content, css_class = '') {
    return `<div class="note ${css_class}">${markdown.render(content)}</div>`;
  });

  // allow content to "break-out" to the right and left from the page grid
  eleventyConfig.addPairedShortcode("breakout", function (content, direction, classes) {
    return `<div class="break-${direction} ${classes ? classes : ''}">${markdown.render(content)}</div>`
  });

  // render content as markdown
  eleventyConfig.addPairedShortcode("markdown", function (content) {
    return markdown.render(content);
  });

  // get newest content of a collection
  eleventyConfig.addShortcode("latest_post", function (collection, exclude_from) {
    let index = collection.length - 1;
    let last_post = collection[index];

    while (last_post.data.exclude_from && last_post.data.exclude_from.indexOf(exclude_from) >= 0) {
      index = index - 1;
      last_post = collection[index];
    }
    if (!last_post) {
      return "ERROR: Cannot render latest post"
    }
    return `<a href="${last_post.data.page.url}">${last_post.data.title}</a>`;
  });

  // Copy `assets/css` to `_site/assets/css`
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("src/assets/font");

  // legacy support for old static assets from 2017 and earlier
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "images" });


  // ======================================== Custom content collections
  //
  //
  // blog collection
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getAll().filter(function (item) {
      return item.data.page.inputPath.substr(2, 9) == 'src/_blog' && (process.env.NODE_ENV == 'production' ? item.data.draft != true : true);
    }).sort((a, b) => a.date - b.date);
  });

  // photography content
  eleventyConfig.addCollection("photography", function (collectionApi) {
    return collectionApi.getAll().filter(function (item) {
      return item.data.page.inputPath.substr(2, 16) == 'src/_photography' && item.data.draft != true;
    }).sort((a, b) => a.date - b.date);
  });

  // books content
  eleventyConfig.addCollection("books", function (collectionApi) {
    return collectionApi.getAll().filter(function (item) {
      return item.data.page.inputPath.substr(2, 10) == 'src/_books' && item.data.draft != true;
    }).sort((a, b) => a.date - b.date);
  });

  // @TODO(kevingimbel): 11ty complains that this shortcode is slow. Refactor.
  eleventyConfig.addFilter("toFormattedDate", function (date) {
    if (!date) {
      return;
    }
    return date.toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' });
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};