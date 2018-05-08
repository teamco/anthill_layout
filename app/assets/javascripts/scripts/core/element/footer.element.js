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
 * Define Footer Element
 * @class FooterElement
 * @type {module.FooterElement}
 * @extends BaseElement
 */
module.exports = class FooterElement extends BaseElement {

  /**
   * @param view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('FooterElement', view, false);

    if (!view.getConfigHTML('footer')) {
      return this;
    }

    this._config(view, opts, $('<div />')).build(opts);
  }
};
