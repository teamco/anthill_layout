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
 * @class DeltaScrollElement
 * @type {module.DeltaScrollElement}
 */
module.exports = class DeltaScrollElement extends BaseElement {

  /**
   * @param {PageView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('DeltaScrollElement', view, false);
    this._config(view, opts, $('<div />')).build(opts);
  }
};