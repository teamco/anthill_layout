/**
 * Created with RubyMine.
 * User: teamco
 * Date: 1/14/14
 * Time: 8:38 PM
 */

/**
 * Define Behavior Window resize
 * @class BehaviorWindowResize
 * @type {BehaviorWindowResize}
 */
export class BehaviorWindowResize {

  /**
   * Get resize attributes
   * Get items are ready to be resized
   * @memberOf BehaviorWindowResize
   * @returns {{event: string|*, items: *}}
   * @private
   */
  _getResizeAttributes() {

    let items = this.model.getItems();
    let current, event;

    if (items) {

      const cname = this.model.getItemNameSpace(),
          plural = this.model.getConfig(cname).plural,
          abstract = this.scope.eventManager.abstract;

      /**
       * Define resize event
       * @type {*}
       */
      event = this.scope.eventManager.eventList[abstract.resizeItem];

      if (!plural) {

        items = {};
        current = this.scope[this.model.getItemNameSpace()];
        items[current.model.getConfig('uuid')] = current;
      }
    }

    return {
      event: event,
      items: items
    };
  }

  /**
   * Nested resize
   * @memberOf BehaviorWindowResize
   * @param resize
   * @private
   */
  _resizeNestedEventTrigger(resize) {

    if (resize.items) {

      /**
       * Define local items
       * @type {*}
       */
      const items = resize.items,
          scope = this.scope;

      if (!this.model.getConfig('isResized')) {
        scope.logger.debug('Skip resize items', items);
        return false;
      }

      for (const index in items) {
        if (Object.prototype.hasOwnProperty.call(items, index)) {

          /**
           * Define local item
           * @type {*}
           */
          const item = items[index];
          scope.observer.publish(resize.event, item);

          /**
           * Define containment
           * @type {*}
           */
          const containment = item.controller.getContainment();

          containment.logger.debug(resize.event.humanize(), item);
        }
      }
    }
  }

  /**
   * Resize items on resize window
   * @memberOf BehaviorWindowResize
   */
  resizeItems() {
    this.logger.debug('Resize items', this.model.getConfig('isResized'));
    this.controller._resizeNestedEventTrigger(this.controller._getResizeAttributes());
  }

  /**
   * Resize item on resize window
   * @memberOf BehaviorWindowResize
   * @param item
   */
  resizeItem(item) {
    this.controller._resizeNestedEventTrigger(item.controller._getResizeAttributes());
  }
}
