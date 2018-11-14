/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';

/**
 * Define PanelContent Element
 * @class PanelContentElement
 * @extends PluginElement
 */
export class PanelContentElement extends PluginElement {

  /**
   * @param {PanelView|WorkspaceDataView} view
   * @param opts
   * @param [name]
   * @constructor
   */
  constructor(view, opts, name) {
    super(name || 'PanelContentElement', view, false);
    this._config(view, opts, $(`<ul class="nav-dropdown-items" />`)).build(opts);
  };

  /**
   * Select item
   * @memberOf PanelContentElement
   * @param {string} resource
   */
  selectItem(resource) {
    this.unselectItems();
  }

  /**
   * Remove items selection
   * @memberOf PanelContentElement
   */
  unselectItems() {
  }

  /**
   * Remove items activation
   * @memberOf PanelContentElement
   * @returns {*|jQuery}
   */
  deactivateItems() {
  }

  /**
   * Init sortable
   * @memberOf PanelContentElement
   */
  initSortable() {
    if (!this.$.sortable) {
      this.view.scope.logger.warn('Undefined sortable plugin');
      return false;
    }

    this.$.sortable({
      containment: this.$container,
      cursor: 'move',
      distance: 5,
      items: '> li.page',
      opacity: 0.8,
      tolerance: 'pointer',
      stop: this._stopSortable.bind(this)
    });
  }

  /**
   * Stop sortable
   * @memberOf PanelContentElement
   * @param event
   * @param ui
   * @private
   */
  _stopSortable(event, ui) {

    /**
     * Get scope
     * @type {WorkspaceData}
     */
    const scope = this.view.scope;

    scope.observer.publish(scope.eventManager.eventList.updatePagesOrder,
        [this.$.sortable('toArray', {attribute: 'rel'})]);

    ui.item.attr('style', ui.item.attr('style').replace(/position: relative;/, ''));
  }
}