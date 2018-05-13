/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseElement
 * @type {BaseElement|*}
 */
const BaseElement = require('../../lib/modules/Element.js');

/**
 * @extends BaseElement
 * @class PageContentElement
 * @type {module.PageContentElement}
 */
module.exports = class PageContentElement extends BaseElement {

  /**
   * @param {PageView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('PageContentElement', view, false);
    this._config(view, opts, $('<ul />')).build(opts);
  }
};