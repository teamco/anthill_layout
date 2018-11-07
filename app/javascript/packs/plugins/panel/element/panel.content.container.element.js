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
 * Define PanelContentContainer Element
 * @class PanelContentContainerElement
 * @extends PluginElement
 */
module.exports = class PanelContentContainerElement extends PluginElement {

  /**
   * @param {PanelView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('PanelContentContainerElement', view, false);
    this._config(view, opts, $('<li />')).build(opts);
  };
};