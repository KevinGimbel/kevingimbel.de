const { createCanvas, loadImage } = require('canvas');
const { pathToFileURL } = require('url');
const canvas = createCanvas(600, 314)
const ctx = canvas.getContext('2d')

// getLines function via https://stackoverflow.com/a/16599668
function getLines(ctx, text, maxWidth) {
  var words = text.split(" ");
  var lines = [];
  var currentLine = words[0];

  for (var i = 1; i < words.length; i++) {
    var word = words[i];
    var width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

function createSocialImage(title, subtitle = '', outpath, avatar_path = undefined) {
  canvas.width = 600;
  canvas.height = 314;

  ctx.fillStyle = '#f1cce1';
  ctx.fillRect(0, 0, 600, 314);

  ctx.fillStyle = '#24d';
  ctx.fillRect(0, 0, 600, 40);
  ctx.fillRect(0, 290, 600, 24);

  ctx.font = 'bold 48px Georgia, "Times New Roman", Times, serif';

  ctx.fillStyle = 'black';

  ctx.fillText(title, 150, 100);

  ctx.font = 'italic 26px Georgia, "Times New Roman", Times, serif'
  let lines = getLines(ctx, subtitle, 500);
  // render lines, 200 + (idx * 30) calculates the position of the next line
  lines.forEach((line, idx) => ctx.fillText(line, 50, (200 + (idx * 30))));

  ctx.font = '16px monospace';
  ctx.fillStyle = 'white';
  ctx.fillText("read on kevingimbel.de", 375, 308)
  if (avatar_path) {
    loadImage(avatar_path).then((image) => {

      // Create a circular clipping path
      ctx.beginPath();
      ctx.arc(75, 75, 50, 0, Math.PI * 2, true);
      ctx.clip();
      ctx.drawImage(image, 25, 25, 120, 120);
      save_image(canvas, outpath + titleToFilename(title));
    });
  } else {
    save_image(canvas, outpath + titleToFilename(title));
  }
}

function titleToFilename(title) {
  return title.replace(/[\W_]+/g, "-").toLowerCase() + '.png';
}

function save_image(canvas, filepath) {
  console.log('save_image called')
  const fs = require('fs')
  const buf = canvas.toBuffer()
  fs.writeFileSync(filepath, buf);
}

// https://developer.mozilla.org/de/docs/Web/API/CanvasRenderingContext2D
// createSocialImage('Moving to 11ty', 'Recap of my experience moving from Hugo to Eleventy', './', '../../src/assets/img/kevin-avatar.jpg');
module.exports = createSocialImage;