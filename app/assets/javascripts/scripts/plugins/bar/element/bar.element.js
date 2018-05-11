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
 * Define Bar Element
 * @class BarElement
 * @extends PluginElement
 */
module.exports = class BarElement extends PluginElement {

  /**
   * @param {PanelView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('BarElement', view, false);

    this._config(view, opts, $(this.getTemplate())).build(opts);
    this.addCSS('bar');
  };

  /**
   * Define template
   * @memberOf BarElement
   * @returns {string}
   */
  getTemplate() {
    return '<ul class="nav" />';
  }

  /**
   * Define content container
   * @memberOf BarElement
   * @returns {*}
   */
  getContentContainer() {
    return this.$.find('.nav');
  }
};