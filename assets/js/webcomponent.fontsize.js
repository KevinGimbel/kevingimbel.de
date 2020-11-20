class FontSizer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" })

    this.state = {
      fontSize: 1,
      unit: 'rem'
    }

    this.LOCAL_STORAGE_KEY = "kgde_font_size";
    this.CSS_VAR_NAME = "--root-font-size";

    this.render();

    this.addEventListener("click", this.setFontSizeOnClick);

    // read and applu theme from local storage
    document.addEventListener("DOMContentLoaded", () => {
      let value = window.localStorage.getItem(this.LOCAL_STORAGE_KEY);
      if (value != null) {
        this.state.fontSize = value;
        this.setFontSize();
      }
    });
  }

  // helper to get this components css 
  CSS() {
    return `<style>
    ::host {
      display: inline-block;
    }
    .fontsizer-icon {
      font-variant: small-caps;
    }

    button {
      font-size: .75em;
    }

    slot {
      display: block;
      font-size: .85em;
    }
</style>`;
  }

  setFontSize() {
    let { fontSize, unit } = this.state;
    document.body.style.setProperty(this.CSS_VAR_NAME, `${fontSize}${unit}`);
    window.localStorage.setItem(this.LOCAL_STORAGE_KEY, fontSize);
  }

  setFontSizeOnClick(event) {
    let buttons = event.composedPath().filter((element, index) => element.tagName == "BUTTON");
    let currentSize = this.state.fontSize;

    if (buttons.length > 0) {
      let btn = buttons[0];
      let action = btn.dataset.action;
      if (action == "increase") {
        this.state.fontSize = parseFloat(currentSize) + 0.1;
      } else {
        this.state.fontSize = parseFloat(currentSize) - 0.1;
      }
      this.setFontSize()
    } else {
      console.error("Cannot find button from composed event path.")
    }
  }

  // Render the whole component
  render() {
    // Update the innerHTML of the Shadow DOM
    this.shadowRoot.innerHTML = `${this.CSS()}\n<slot></slot> <button id="btn-fontsizer-increase" data-action="increase"><span class="fontsizer-icon">Aa+</span></button> <button id="btn-fontsizer-decrease" data-action="decrease"><span class="fontsizer-icon">Aa-</span></button>`;
  }
}

customElements.define('kg-fontsize', FontSizer);