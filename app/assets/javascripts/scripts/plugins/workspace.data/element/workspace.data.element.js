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
 * @class WorkspaceDataElement
 * @extends PluginElement
 */
module.exports = class WorkspaceDataElement extends PluginElement {

  /**
   * @param {module.WorkspaceDataView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('WorkspaceDataElement', view, false);
    this._config(view, opts, $('<ul />')).build(opts);
    this.addCSS('workspace.data');
    this.addCSS('preferences');
    this.initSortable();
  }

  /**
   * Init sortable
   * @memberOf WorkspaceDataElement
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
   * @memberOf WorkspaceDataElement
   * @param event
   * @param ui
   * @private
   */
  _stopSortable(event, ui) {

    /**
     * Get scope
     * @type {module.WorkspaceData}
     */
    const scope = this.view.scope;

    scope.observer.publish(scope.eventManager.eventList.updatePagesOrder,
        [this.$.sortable('toArray', {attribute: 'rel'})]);

    ui.item.attr('style', ui.item.attr('style').replace(/position: relative;/, ''));
  }
};