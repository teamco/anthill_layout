/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

/**
 * @constant PluginElement
 * @type {module.PluginElement}
 */
const PluginElement = require('../../plugin.element.js');

/**
 * @class PageDataElement
 * @extends PluginElement
 */
module.exports = class PageDataElement extends PluginElement {

  /**
   * @param {PageDataView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('PageDataElement', view, false);
    this._config(view, opts, $('<ul />')).build(opts);
    this.addCSS('page.data');
    this.addCSS('preferences');
  }
};
