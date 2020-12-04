class ContentWidth extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" })

    this.state = {
      contentWidth: 60,
      unit: 'rem'
    }

    this.sizes = [
      {
        name: 'L',
        title: 'Large',
        size: 90,
      }, {
        name: 'M',
        title: 'Medium',
        size: 60,
      }, {
        name: 'S',
        title: 'Small',
        size: 45,
      }
    ];

    this.LOCAL_STORAGE_KEY = "kgde_content_width";
    this.CSS_VAR_NAME = "--content-max-width";
    this.ELEMENT = null;

    this.addEventListener("click", this.setContentWidthOnClick);

    // we are explicitly not using connectedCallback because with connectedCallback there's a short flickering
    // between the time the page is loaded and the adjustments to content size.
    document.addEventListener("DOMContentLoaded", (event) => {
      this.ELEMENT = document.querySelector(".article-single") || document.querySelector(".page-content");

      if (this.ELEMENT != null) {
        let value = window.localStorage.getItem(this.LOCAL_STORAGE_KEY);

        if (value != null) {
          this.state.contentWidth = value;
          this.setContentWidth(value);
        }

        this.render();
      }
    });
  }

  // helper to get this components css 
  CSS() {
    return `<style>
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

  setContentWidth(value) {
    this.state.contentWidth = value;
    let unit = this.state.unit;
    this.ELEMENT.style.setProperty(this.CSS_VAR_NAME, `${value}${unit}`);
    window.localStorage.setItem(this.LOCAL_STORAGE_KEY, value);
  }

  setContentWidthOnClick(event) {
    let buttons = event.composedPath().filter((element, index) => element.tagName == "BUTTON");

    if (buttons.length > 0) {
      let btn = buttons[0];
      let size = btn.dataset.size;
      this.setContentWidth(size)
    } else {
      console.error("Cannot find button from composed event path.")
    }
  }

  renderButtons() {
    return this.sizes.map(item => {
      return `<button id="btn-content-width-${item.title.toLowerCase()}" data-size="${item.size}" title="${item.title}">${item.name}</button>`;
    }).join(' ');
  }

  // Render the whole component
  render() {
    let buttons = this.renderButtons();
    // Update the innerHTML of the Shadow DOM
    this.shadowRoot.innerHTML = `${this.CSS()}\n<slot></slot> ${buttons}`;
  }
}

customElements.define('kg-contentwidth', ContentWidth);