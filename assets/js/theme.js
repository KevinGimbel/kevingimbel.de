/* PRE HEADER */
(function (document, window, undefined) {

  function css_to_int(cssStyleDeclaration, unitStr) {
    return parseInt(cssStyleDeclaration.replace(unitStr, ''));
  }

  // set margin-top to 0 so the element comes "back" into view
  function pre_header_show(element) {
    element.style.setProperty('margin-top', 0);
    element.dataset.shown = true;
  }

  // set margin-top to -$this_height so the element comes goes out of view
  function pre_header_hide(element) {
    let this_height = window.getComputedStyle(element).height;
    element.style.setProperty('margin-top', `-${this_height}`);
    element.dataset.shown = false;
  }

  function is_element_hidden(element) {
    return ['none'].indexOf(window.getComputedStyle(element).display) > -1;
  }

  // Wait for DOM to load
  document.addEventListener('DOMContentLoaded', () => {
    // Get pre-header and toggle
    const pre_header_element = document.querySelector('#pre-header');
    const pre_header_toggle = document.querySelector('#pre-header-toggle');

    // cheap way to check if the small screen CSS has hidden the menu!
    if (!is_element_hidden(pre_header_toggle)) {
      pre_header_hide(pre_header_element);
    }

    pre_header_toggle.addEventListener('click', (event) => {
      // Need to do a string comparison because the attribute is a string!
      if (pre_header_element.dataset.shown == "true") {
        pre_header_hide(pre_header_element);
      } else {
        pre_header_show(pre_header_element);
      }
    });

    window.addEventListener('resize', () => {
      // cheap way to check if the small screen CSS has hidden the menu!
      if (!is_element_hidden(pre_header_toggle)) {
        pre_header_hide(pre_header_element);
      } else {
        pre_header_show(pre_header_element);
      }
    });
  });
}(document, window));