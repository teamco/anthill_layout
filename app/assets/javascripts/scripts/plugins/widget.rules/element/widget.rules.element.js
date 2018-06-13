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
 * @class WidgetRulesElement
 * @extends PluginElement
 */
module.exports = class WidgetRulesElement extends PluginElement {

  /**
   * @param {WidgetRulesView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('WidgetRulesElement', view, false);
    this._config(view, opts, $('<ul />')).build(opts);
    this.addCSS('widget.rules');
    this.addCSS('', {url: '/assets/scripts/plugins/rules/widget/rules.css'});
  }
};