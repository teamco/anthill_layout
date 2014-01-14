/**
 * Created with RubyMine.
 * User: teamco
 * Date: 1/14/14
 * Time: 8:38 PM
 */

define([
    'modules/base'
], function defineBaseResize(Base) {

    /**
     * Define Base Window resize
     * @class BaseResize
     * @constructor BaseResize
     */
    var BaseResize = function BaseResize() {

    };

    return BaseResize.extend({

        /**
         * Get resize attributes
         * Get items are ready to be resized
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
         * @param resize
         * @private
         */
        _resizeNestedEventTrigger: function _resizeNestedEventTrigger(resize) {

            if (resize.items) {

                /**
                 * Define local items
                 * @type {*}
                 */
                var items = resize.items;

                for (var index in items) {

                    if (items.hasOwnProperty(index)) {

                        /**
                         * Define local item
                         * @type {*}
                         */
                        var item = items[index];

                        this.scope.observer.publish(

                            resize.event,
                            item

                        );

                        item.config.containment.logger.debug(resize.event.humanize(), item);
                    }
                }
            }

        },

        /**
         * Resize items on resize window
         */
        resizeItems: function resizeItems() {

            /**
             * Define instance
             * @type {Controller}
             */
            var controller = this.controller;

            controller._resizeNestedEventTrigger(
                controller._getResizeAttributes()
            );

        },

        /**
         * Resize item on resize window
         * @param item
         */
        resizeItem: function resizeItem(item) {

            this.controller._resizeNestedEventTrigger(
                item.controller._getResizeAttributes()
            );

        }

    }, Base);

});