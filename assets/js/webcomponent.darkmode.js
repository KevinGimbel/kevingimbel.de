class DarkMode extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" })

    this.state = {
      isDarkMode: false,
    }
    this.LOCAL_STORAGE_KEY = "kgde_theme_dark_mode";

    // handle clicks
    this.addEventListener("click", this.changeMode);

    // update on dom load
    document.addEventListener("DOMContentLoaded", () => {
      let darkModeFromLocalStorage = window.localStorage.getItem(this.LOCAL_STORAGE_KEY);
      if (darkModeFromLocalStorage != null) {
        let dm = darkModeFromLocalStorage == "true";
        this.setDarkMode(dm);
      }
      if (darkModeFromLocalStorage == null) {
        // try to get dark mode preference via CSS query
        let wantDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
        this.setDarkMode(wantDarkMode.matches || false);
      }
      this.render();
    });
  }

  // helper to get this components css 
  CSS() {
    return `<style>
    .dark-mode-toggle {
      width: 1.5em;
      height: 1.5em;
      display: inline-block;
      margin-right: .25em;
    }
    
    label {
      line-height: 1.25em;
      display: flex;
      align-items: center;
    }
  </style>`;
  }

  setDarkMode(boolDarkMode) {
    if (boolDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }

    this.state.isDarkMode = boolDarkMode;
    window.localStorage.setItem(this.LOCAL_STORAGE_KEY, boolDarkMode);
  }

  changeMode(event) {
    event.stopPropagation()
    let input = event.composedPath()[0];
    console.log("changeMode - var input = ", input);
    this.state.isDarkMode = input.checked;
    console.log("changeMode - input.checked", input.checked);
    this.setDarkMode(this.state.isDarkMode);

  }

  renderDarkmodeToggle() {
    return `<label for="dark-mode-toggle"><slot></slot> <input type="checkbox" id="dark-mode-toggle" name="dark-mode-toggle" class="dark-mode-toggle" ${this.state.isDarkMode ? 'checked' : ''}/></label>`
  }

  // Render the whole component
  render() {
    let darkModeHtml = this.renderDarkmodeToggle();
    // Update the innerHTML of the Shadow DOM
    this.shadowRoot.innerHTML = `${this.CSS()}\n${darkModeHtml}`;
  }
}

customElements.define('kg-darkmode', DarkMode);