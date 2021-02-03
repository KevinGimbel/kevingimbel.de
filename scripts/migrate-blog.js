const fs = require('fs');

// This script was used to migrate the blog structure from the old schema to the new schema.
// Articles were previously named like `YYYY-MM-DD-some-title.md` and a mixture of folders and files was used.
// Now all articles are in folders like `YYYY/MM/DD-some-title.md` or `YYYY/MM/DD-some-title/index.md` if they have assets

// read all blog posts
fs.readdirSync('./src/_blog').map((file) => {
  if (file.startsWith('.')) {
    return;
  }
  if (file.length == 4) {
    console.log(file);
    return;
  }
  // get the date from filename, all files start with YYYY-MM-DD
  let date = file.substr(0, 10).split('-');
  // Get the rest of the name
  let filename_rest = file.substr(11);
  // Get year, month, and date from array created before
  let year = date[0];
  let month = date[1];
  let day = date[2];
  // construct new output directory
  let path = `./src/_blog/${year}/${month}`;

  // check if directory exists
  if (!fs.existsSync(path)) {
    // create if doesn't exists
    fs.mkdirSync(path, { recursive: true });
  }

  // Move files
  if (file.endsWith('.md')) {
    // move file
    fs.renameSync(`./src/_blog/${file}`, `${path}/${day}-${filename_rest}`);
  }

  // move directories 
  if (fs.statSync(`./src/_blog/${file}`).isDirectory()) {
    if (year && month && day) {
      fs.renameSync(`./src/_blog/${file}`, `${path}/${day}-${filename_rest}`);
    }

  }
});