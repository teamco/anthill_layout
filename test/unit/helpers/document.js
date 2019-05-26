/**
 * @export jsDocument
 * @constant
 */
import {_it} from './utils';

export const jsDocument = (init = false) => {
  const jsdom = require('jsdom');
  const {JSDOM} = jsdom;
  const {document} = (new JSDOM(``, {url: 'http://localhost:5000'})).window;

  /**
   * @method
   * @returns {*}
   */
  (function createDocument() {
    const window = document.defaultView;
    global.document = document;
    global.window = window;
    global.jQuery = global.$ = require('jquery');
    global._ = require('underscore');

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

    if (init) {
      Object.defineProperty(navigator, 'userAgent', editableFn(navigator.userAgent));
      Object.defineProperty(navigator, 'appVersion', editableFn(navigator.appVersion));
    }
  })();

  describe('Define globals', () => {
    _it(global, 'window');
    _it(global, 'document');
    _it(global, 'jQuery');
    _it(global, '$');
    _it(global, '_');
  });
};