(function (window, document, undefined) {
    let theme = window.localStorage.getItem("kgde_theme");
    if (theme) {
        var [colorMain, colorSecondary] = JSON.parse(theme).colors;
        document.body.style = `--color-main:${colorMain};--color-secondary:${colorSecondary}`;
    } else {
        // [dark-color, light-color]
        // Color combinations taken from https://botsin.space/@accessibleColors
        let themes = [
            ["#123D3C", "#90F072"],
            ["#403D58", "#dea584"],
            ["#400E3B", "#DCC78A"],
            ["#17098D", "#EADD1C"],
            ["#233B07", "#FFDD6D"]
        ]
        var [colorMain, colorSecondary] = themes[Math.floor(Math.random() * themes.length)];
        document.body.style = `--color-main:${colorMain};--color-secondary:${colorSecondary}`;
    }
    document.addEventListener('DOMContentLoaded', function () {
        let schema_btn = document.querySelector("#btn_schema");
        let theme = window.localStorage.getItem("kgde_theme");
        if (theme) {
            schema_btn.textContent = "Use random color theme";
        } else {
            schema_btn.textContent = "Keep current color theme";
        }
        schema_btn.style.display = "block";
        schema_btn.addEventListener('click', function (e) {
            if (theme) {
                window.localStorage.removeItem("kgde_theme");
                window.reload();
            } else {
                window.localStorage.setItem("kgde_theme", JSON.stringify({ colors: [colorMain, colorSecondary] }));
            }
        });
    });
}(window, document));