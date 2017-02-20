/**
 * Created with RubyMine.
 * User: teamco
 * Date: 1/14/14
 * Time: 8:38 PM
 */

define([], function defineBehaviorWindowResize() {

  /**
   * Define Behavior Window resize
   * @class BehaviorWindowResize
   * @constructor BehaviorWindowResize
   */
  var BehaviorWindowResize = function BehaviorWindowResize() {

    /**
     * Define model
     * @property BehaviorWindowResize
     * @type {undefined}
     */
    this.model = undefined;

    /**
     * Define scope
     * @property BehaviorWindowResize
     * @type {undefined}
     */
    this.scope = undefined;
  };

  return BehaviorWindowResize.extend('BehaviorWindowResize', {

    /**
     * Get resize attributes
     * Get items are ready to be resized
     * @memberOf BehaviorWindowResize
     * @returns {{event: string|*, items: *}}
     * @private
     */
    _getResizeAttributes: function _getResizeAttributes() {

      var items = this.model.getItems(),
          current, event;

      if (items) {

        var cname = this.model.getItemNameSpace(),
            plural = this.model.getConfig(cname).plural,
            abstract = this.scope.eventmanager.abstract;

        /**
         * Define resize event
         * @type {*}
         */
        event = this.scope.eventmanager.eventList[abstract.resizeItem];

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
    },

    /**
     * Nested resize
     * @memberOf BehaviorWindowResize
     * @param resize
     * @private
     */
    _resizeNestedEventTrigger: function _resizeNestedEventTrigger(resize) {

      if (resize.items) {

        /**
         * Define local items
         * @type {*}
         */
        var items = resize.items,
            scope = this.scope;

        if (!this.model.getConfig('isResized')) {
          scope.logger.debug('Skip resize items', items);
          return false;
        }

        for (var index in items) {

          if (items.hasOwnProperty(index)) {

            /**
             * Define local item
             * @type {*}
             */
            var item = items[index];

            scope.observer.publish(
                resize.event,
                item
            );

            /**
             * Define containment
             * @type {*}
             */
            var containment = item.controller.getContainment();

            containment.logger.debug(resize.event.humanize(), item);
          }
        }
      }
    },

    /**
     * Resize items on resize window
     * @memberOf BehaviorWindowResize
     */
    resizeItems: function resizeItems() {

      this.logger.debug(
          'Resize items',
          this.model.getConfig('isResized')
      );

      this.controller._resizeNestedEventTrigger(
          this.controller._getResizeAttributes()
      );
    },

    /**
     * Resize item on resize window
     * @memberOf BehaviorWindowResize
     * @param item
     */
    resizeItem: function resizeItem(item) {

      this.controller._resizeNestedEventTrigger.bind(item.controller)(
          item.controller._getResizeAttributes()
      );
    }
  });
});