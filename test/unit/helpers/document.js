/**
 * @export jsDocument
 * @constant
 */
export const jsDocument = () => {
  const jsdom = require('jsdom');
  const {JSDOM} = jsdom;
  const {document} = (new JSDOM(``, {url: 'http://localhost:5000'})).window;

  /**
   * @method
   * @returns {*}
   */
  (function createDocument() {
    global.document = document;
    const window = document.defaultView;
    global.document = document;
    global.window = window;
    global.jQuery = global.$ = require('jquery')(window);

    if (!Object.keys(window).length) {
      throw 'jsdom failed to create a usable environment, try uninstalling and reinstalling it';
    }

    Object.keys(window).forEach((key) => {
      if (!(key in global)) {
        global[key] = window[key];
      }
    });

    const editableFn = _value => ({
      get: () => _value,
      set: (v) => _value = v
    });

    Object.defineProperty(navigator, 'userAgent', editableFn(navigator.userAgent));
    Object.defineProperty(navigator, 'appVersion', editableFn(navigator.appVersion));
  })();
};