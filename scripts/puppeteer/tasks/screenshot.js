const puppeteer = require('puppeteer');
const config = require('../config');

const out_dir = config.out_dirs.screenshots;

const prepare = () => {
    const fs = require('fs');
    if (!fs.existsSync(out_dir)) {
        fs.mkdirSync(out_dir);
    }


}

// prepare things :) 
prepare();

// Make screenshots
(async () => {
    const puppeteer_options = {
        product: "firefox",
        executablePath: "/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox",
        defaultViewport: {
            width: 1400
        }
    };
    const browser = await puppeteer.launch(puppeteer_options);
    const base_url = config.base_url;

    for (let single_page of config.captures) {
        const page = await browser.newPage();
        let url = base_url + single_page.path;
        let file_path = out_dir + (single_page.name ? single_page.name : single_page.path.replace("/", "")) + '.png';

        await page.goto(url);
        await page.screenshot({ path: file_path, fullPage: true });
    }


    // await page.goto(base_url);
    // await page.screenshot({ path: 'example.png' });

    await browser.close();
})();