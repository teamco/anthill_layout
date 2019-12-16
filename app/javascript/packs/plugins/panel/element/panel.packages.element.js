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
    super('PanelPackagesElement', view);
    this._config(view, opts, window.$(`<nav class="sidebar-nav" />`)).build(opts);
  }

  /**
   * Select item
   * @memberOf PanelPackagesElement
   */
  selectItem() {
    this.unselectItems();
  }

  /**
   * Remove items selection
   * @memberOf PanelPackagesElement
   */
  unselectItems() {
    this.deactivateItems();
  }

  /**
   * Remove items activation
   * @memberOf PanelPackagesElement
   * @returns {*|jQuery}
   */
  deactivateItems() {
    window.$('.open', this.$).removeClass('open');
  }
}