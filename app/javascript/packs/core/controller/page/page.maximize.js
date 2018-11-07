/**
 * Created by teamco on 7/9/14.
 */

/**
 * @class PageItemMaximize
 */
export class PageItemMaximize {

  /**
   * Get maximized widget
   * @memberOf PageItemMaximize
   * @returns {Widget|*}
   */
  getMaximized() {
    return this.scope.maximized;
  }

  /**
   * Set widget as maximized
   * @memberOf  {PageItemMaximize}
   * @param {Widget} widget
   */
  setMaximized(widget) {

    /**
     * Set maximized
     * @memberOf PageItemMaximize
     * @type {Widget}
     */
    this.maximized = widget;
    this.logger.debug('Set maximized', this.maximized);
  }

  /**
   * Unset widget as maximized
   * @memberOf PageItemMaximize
   */
  unsetMaximized() {

    /**
     * Unset maximized
     * @memberOf PageItemMaximize
     * @type {{}}
     */
    this.maximized = {};
    this.logger.debug('Unset maximized', this.maximized);
  }

  /**
   * Disable items interactions on enlarge
   * @memberOf PageItemMaximize
   * @param {Widget} widget
   */
  disableItemInteractions(widget) {
    const items = this.model.getItems();

    for (let index in items) {

      if (items.hasOwnProperty(index)) {

        /**
         * Define item
         * @type {Widget}
         */
        const item = items[index];

        item.observer.batchPublish(
            item.eventManager.eventList.disableDraggable,
            item.eventManager.eventList.disableResizable
        );

        if (widget !== item) {
          item.view.get$item().hide();
        }
      }
    }

    this.controller.banAddWidget();
    this.observer.publish(this.eventManager.eventList.setMaximized, widget);
  }

  /**
   * Enable item interaction on reduce
   * @memberOf PageItemMaximize
   */
  enableItemInteractions() {
    const items = this.model.getItems();

    for (let index in items) {
      if (items.hasOwnProperty(index)) {

        /**
         * Define item
         * @type {Widget}
         */
        const item = items[index];

        item.observer.batchPublish(
            item.eventManager.eventList.enableDraggable,
            item.eventManager.eventList.enableResizable
        );

        item.view.get$item().show();
      }
    }

    this.controller.allowAddWidget();
    this.observer.publish(this.eventManager.eventList.unsetMaximized);
  }
}