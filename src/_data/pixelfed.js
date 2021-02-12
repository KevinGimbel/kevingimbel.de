const Cache = require("@11ty/eleventy-cache-assets");
const Image = require("@11ty/eleventy-img");
let Parser = require('rss-parser');
const htmlParser = require('node-html-parser');

let parser = new Parser({
  customFields: {
    item: ['summary'],
  }
});

async function get_pixelfed_images() {
  // https://developer.github.com/v3/repos/#get
  let text = await Cache("https://pixelfed.social/users/kevingimbel.atom", {
    duration: "1h", // cache for 1h
    type: "text"
  });

  const feed = await parser.parseString(text);
  let images_data = [];

  feed.items.forEach(async function (item) {
    // pixelfed provides the image as inline HTML so we parse it here
    let url = htmlParser.parse(item.summary).querySelector('img').getAttribute('src');
    // Using eleventy-img we download and cache the file! This way we can serve it from our own webserver
    let stats = await Image(url, {
      widths: [400],
      outputDir: "src/assets/img/pixelfed/"
    });

    // console.log(item);

    images_data.push({
      href: item.link,
      src: stats,
      date: item.pubDate,
    });
  });

  return {
    images: images_data
  };
}


module.exports = async function () {
  let data = await get_pixelfed_images();
  let sorted_images = data.images.sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  });

  return {
    images: sorted_images
  };
};