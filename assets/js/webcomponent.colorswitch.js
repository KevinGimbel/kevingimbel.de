class ColorSwitcher extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" })

    this.state = {}

    this.LOCAL_STORAGE_KEY = "kgde_theme_colors"
    this.colors = this.getAttribute('color-map') || [
      ["#123D3C", "#90F072"],
      ["#403D58", "#dea584"],
      ["#400E3B", "#DCC78A"],
      ["#17098D", "#EADD1C"],
      ["#233B07", "#FFDD6D"],
      ["#37059F", "#D1D99F"],
      ["#222", "#ccc"]
    ];

    this.render(this.state);

    this.addEventListener("click", this.switchColor);
  }

  connectedCallback() {
    let theme = window.localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (theme != null) {
      let colors = JSON.parse(theme).colors;
      this.setThemeOnBody(colors);
    }
  }

  // helper to get this components css 
  CSS() {
    return `<style>
    :host {
      display: inline-block;
      height: fit-content;
    }
    .color-comb {
      width: 2em;
      height: 2em;
      display: inline-block;
      border: .01rem solid black;
      margin-right: .25em;
      background: linear-gradient(-45deg, var(--c1), var(--c1) 50%, var(--c2) 51%, var(--c2));
      border-radius: .5em .3em 1em .6em;
    }
    .color-comb:hover {
      cursor: pointer;
    }
    
    slot {
      display: block;
      font-size: .85em;
    }
  </style>`;
  }

  setThemeOnBody(theme) {
    var [colorMain, colorSecondary] = theme;
    document.body.style = `--color-main:${colorMain};--color-secondary:${colorSecondary}`;
  }

  // Switch the colors by updating the variables on the body element
  switchColor(event) {
    let sourceElement = event.composedPath()[0];
    let c1 = window.getComputedStyle(sourceElement).getPropertyValue('--c1');
    let c2 = window.getComputedStyle(sourceElement).getPropertyValue('--c2');
    document.body.style.setProperty('--color-main', c1);
    document.body.style.setProperty('--color-secondary', c2);
    window.localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify({ colors: [c1, c2] }));
  }

  // Render color option as button
  renderColorOption(colors) {
    let [c1, c2] = colors;
    return `<button class="color-comb" style="--c1: ${c1}; --c2: ${c2}">&nbsp;</button>`
  }

  // Render the whole component
  render(state) {
    let colorHtml = this.colors.map(color => this.renderColorOption(color)).join('');
    // Update the innerHTML of the Shadow DOM
    this.shadowRoot.innerHTML = `${this.CSS()}\n<slot></slot> ${colorHtml}`;
  }
}

customElements.define('kg-colorswitcher', ColorSwitcher);