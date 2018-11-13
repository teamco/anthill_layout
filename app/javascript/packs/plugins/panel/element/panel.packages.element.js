/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';

/**
 * Define Panel Packages Element
 * @class PanelPackagesElement
 * @extends PluginElement
 */
export class PanelPackagesElement extends PluginElement {

  /**
   * @param {PanelView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('PanelPackagesElement', view, false);
    this._config(view, opts, $(`<nav class="sidebar-nav ps" />`)).build(opts);
  };

  /**
   * Select item
   * @memberOf PanelPackagesElement
   * @param {string} resource
   */
  selectItem(resource) {
    this.unselectItems();
    $('.content.' + resource, this.$).addClass('activated').removeClass('collapsed');
  }

  /**
   * Remove items selection
   * @memberOf PanelPackagesElement
   */
  unselectItems() {
    this.deactivateItems().addClass('collapsed');
  }

  /**
   * Remove items activation
   * @memberOf PanelPackagesElement
   * @returns {*|jQuery}
   */
  deactivateItems() {
    return $('ul.panel-bar li', this.$).removeClass('activated collapsed');
  }
}