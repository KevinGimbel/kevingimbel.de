
const d = new Date();
const m = ("0" + (d.getMonth() + 1)).slice(-2); // wtf?
const y = d.getFullYear();


module.exports = {
    // The base URL for puppeteer to work with
    base_url: "https://kevingimbel.de",
    // The directory where screenshots will be saved
    out_dirs: {
        screenshots: 'screenshots/' + y + '-' + m + '/'
    },
    // List of pages puppeteer will work with, e.g. for screenshot taking.
    // `path` is the relative URL path
    // `name` is an optional name used for logs and as filename (if screenshots are taken)
    //  {
    //    path: String,
    //    name: String?
    //  }
    captures: [
        {
            path: "/about"
        }, {
            path: "/now"
        }, {
            path: "/legal"
        }, {
            path: "/",
            name: "home"
        }, {
            path: "/blog/2020/01/auto-ssl-with-apache2/",
            name: "blog-auto-ssl-with-apache2"
        },
    ]
}