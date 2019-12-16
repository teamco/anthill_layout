/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/25/15
 * Time: 6:35 PM
 */

import {Layout} from '../../config/layout';

/**
 * @class PageLayout
 */
export class PageLayout {

  /**
   * Update layout config
   * @memberOf PageLayout
   */
  updateLayoutConfig() {

    this.logger.debug('Update layout config');

    /**
     * Get page preferences
     * @type {{layoutColumns: number}}
     */
    const preferences = this.model.getConfig('preferences') || {};

    /**
     * Get layout
     * @type {Layout}
     */
    const layout = this.layout;
    layout.observer.publish(layout.eventManager.eventList.updateNumberOfColumns, preferences.layoutColumns);
  }

  /**
   * Update page padding
   * @memberOf PageLayout
   * @param opts
   */
  updatePadding(opts) {

    // Get scope
    const scope = this;

    // Get padding
    const padding = scope.model.getConfig('html/padding');

    window.$.extend(padding, opts);

    /**
     * @type {PageElement|{setPadding}}
     */
    const $item = scope.view.get$item();

    if ($item) {
      $item.setPadding(padding);
    } else {
      scope.eventManager.subscribe({
        event: scope.eventManager.eventList.successRendered,
        callback() {
          scope.view.get$item().updateDimensions();
        }
      }, true);
    }
  }

  /**
   * Update page height
   * @memberOf PageLayout
   */
  updateHeight() {
    this.view.get$item().updateDimensions();
  }

  /**
   * Update page scroll height
   * @memberOf PageLayout
   */
  updatePageScrollHeight() {

    // Get scope
    const scope = this;

    /**
     * @type {PageElement|{updateDimensions}}
     */
    const $item = scope.view.get$item();

    if ($item) {
      //$item.updateDimensions(padding);
    } else {
      scope.eventManager.subscribe({
        event: scope.eventManager.eventList.successRendered,
        callback() {
          scope.view.get$item().updateDimensions();
        }
      }, true);
    }
  }

  /**
   * Define expandLayout
   * @memberOf PageLayout
   * @param {Widget} widget
   */
  expandLayout(widget) {

    /**
     * Get layout
     * @type {Layout}
     */
    const layout = this.controller.getLayout();
    layout.observer.publish(layout.eventManager.eventList.onExpand, widget);
  }

  /**
   * Create page layout
   * @memberOf PageLayout
   * @param opts
   */
  createLayout(opts) {

    /**
     * Define layout
     * @memberOf Page
     * @type {Layout}
     */
    this.layout = new Layout(opts, this);
  }

  /**
   * Destroy layout
   * @memberOf PageLayout
   */
  destroyLayout() {
    this.logger.info('Destroy Layout', this.layout);
    delete this.layout;
  }

  /**
   * Get Layout
   * @memberOf PageLayout
   * @returns {Layout}
   */
  getLayout() {
    return this.scope.layout;
  }

  /**
   * Update layout config
   * @memberOf PageLayout
   */
  updateLayout() {

    /**
     * Define scope
     * @type {Layout}
     */
    const layout = this.scope.layout;

    layout.observer.publish(layout.eventManager.eventList.updateMinCellWidth);
    this.updateWidgetsConfig();
  }
}