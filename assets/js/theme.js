// (function (window, document, undefined) {

//   function setThemeOnBody(theme) {
//     var [colorMain, colorSecondary] = theme;
//     document.body.style = `--color-main:${colorMain};--color-secondary:${colorSecondary}`;
//   }


//   // [dark-color, light-color]
//   // Color combinations taken from https://botsin.space/@accessibleColors
//   let themes = [
//     ["#123D3C", "#90F072"],
//     ["#403D58", "#dea584"],
//     ["#400E3B", "#DCC78A"],
//     ["#17098D", "#EADD1C"],
//     ["#233B07", "#FFDD6D"],
//     ["#37059F", "#D1D99F"]
//   ]

//   let themeFromLocalStorage = window.localStorage.getItem("kgde_theme");

//   // setThemeOnBody(theme);


//   document.addEventListener('DOMContentLoaded', function () {
//     let schema_btn = document.querySelector("#btn_schema");
//     let theme = window.localStorage.getItem("kgde_theme");
//     let text_keep = document.querySelector("#widget_color_changer_txt_keep").textContent;
//     let text_random = document.querySelector("#widget_color_changer_txt_random").textContent;
//     if (theme) {
//       schema_btn.textContent = text_random;
//     } else {
//       schema_btn.textContent = text_keep;
//     }
//     schema_btn.style.display = "block";
//     schema_btn.addEventListener('click', function (e) {
//       if (theme) {
//         window.localStorage.removeItem("kgde_theme");
//         window.location = window.location;
//       } else {
//         window.localStorage.setItem("kgde_theme", JSON.stringify({ colors: [colorMain, colorSecondary] }));
//         window.location = window.location;
//       }
//     });

//     let resizer = document.querySelector("#resizer");
//     let article_content_el = document.querySelector(".article-single") || document.querySelector(".page-content");
//     let width = window.localStorage.getItem("kgde_theme_width");
//     if (!width) {
//       window.localStorage.setItem("kgde_theme_width", 80);
//       content_update_size(width, article_content_el);
//     }

//     if (resizer) {
//       let opts = resizer.querySelectorAll("option");
//       opts.forEach(entry => {
//         entry.selected = entry.value == width;
//       })
//     }

//     if (resizer && article_content_el) {
//       if (width) {
//         content_update_size(width, article_content_el);
//       }
//       resizer.addEventListener("change", (event) => {
//         let size = event.target.value;
//         content_update_size(size, article_content_el);
//         window.localStorage.setItem("kgde_theme_width", size);
//       })
//     } else {
//       resizer.parentNode.style.display = "none";
//     }
//   }); // DOMContentLoaded

//   function content_update_size(size, element) {
//     element.style.setProperty('--content-max-width', `${size}rem`);
//   }
// }(window, document));