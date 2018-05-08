/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseElement
 * @type {module.BaseElement}
 */
const BaseElement = require('../lib/modules/Element.js');

/**
 * Define Header Element
 * @class HeaderElement
 * @type {module.HeaderElement}
 * @extends BaseElement
 */
module.exports = class HeaderElement extends BaseElement {

  /**
   * @param view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('HeaderElement', view, false);

    if (!view.getConfigHTML('header')) {
      return this;
    }

    this._config(view, opts, $('<div />')).build(opts);
  }
};