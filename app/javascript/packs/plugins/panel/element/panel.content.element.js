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
 * Define PanelContent Element
 * @class PanelContentElement
 * @extends PluginElement
 */
module.exports = class PanelContentElement extends PluginElement {

  /**
   * @param {PanelView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('PanelContentElement', view, false);
    this._config(view, opts, $('<div class="content-container" />')).build(opts);
  };

  /**
   * Select item
   * @memberOf PanelContentElement
   * @param {string} resource
   */
  selectItem(resource) {
    this.unselectItems();
    $('.content.' + resource, this.$).addClass('activated').removeClass('collapsed');
  }

  /**
   * Remove items selection
   * @memberOf PanelContentElement
   */
  unselectItems() {
    this.deactivateItems().addClass('collapsed');
  }

  /**
   * Remove items activation
   * @memberOf PanelContentElement
   * @returns {*|jQuery}
   */
  deactivateItems() {
    return $('ul.panel-bar li', this.$).removeClass('activated collapsed');
  }
};