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
const BaseElement = require('../../lib/modules/Element.js');

/**
 * Define Application content element
 * @class ApplicationContentElement
 * @type {module.ApplicationContentElement}
 * @extends BaseElement
 */
module.exports = class ApplicationContentElement extends BaseElement {

  /**
   * @param {ApplicationView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('ApplicationContentElement', view, false);
    this._config(view, opts, $('<workspaces />')).build(opts);
  }
};
