/**
 * Created by teamco on 4/1/14.
 */

define([], function defineWidgetSubscribe() {

    /**
     * Define widget subscribe events
     * @class WidgetSubscribe
     * @constructor
     */
    var WidgetSubscribe = function WidgetSubscribe() {

    };

    return WidgetSubscribe.extend({

        /**
         * On drag event
         * @member WidgetSubscribe
         * @param type
         * @param args
         */
        dragDraggable: function dragDraggable(type, args) {

            /**
             * Define widget
             * @type {Widget}
             */
            var widget = this.controller.getContainment();

            /**
             * Get jQuery.UI element
             * @type {*}
             */
            var ui = args[1];

            /**
             * Get $widget
             * @type {*}
             */
            var $widget = widget.view.get$item().$;

            /**
             * Set delta left
             * @type {number}
             */
            var deltaLeft = ui.position.left -
                ui.originalPosition.left;

            /**
             * Set delta top
             * @type {number}
             */
            var deltaTop = ui.position.top -
                ui.originalPosition.top;

            $widget.css({
                left: widget.dom.left + deltaLeft,
                top: widget.dom.top + deltaTop
            });
        },

        /**
         * On drag stop event
         * @member WidgetSubscribe
         */
        stopDraggable: function stopDraggable() {

            var widget = this.controller.getContainment();

            widget.observer.publish(
                widget.eventmanager.eventList.saveDom
            );
            
            widget.observer.publish(
                widget.eventmanager.eventList.stopDraggable,
                'stopDraggable'
            );
        }

    });
});