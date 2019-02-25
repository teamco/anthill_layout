const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const {window} = new JSDOM(`<!DOCTYPE html>`);

global.window = window;
global.document = window.document;
global.jQuery = global.$ = window.jQuery = window.$ = require('jquery');

if (!Object.keys(window).length) {
  throw 'jsdom failed to create a usable environment, try uninstalling and reinstalling it';
}

describe('JS Unit tests', () => {
  require('./unit/app.unit');
});