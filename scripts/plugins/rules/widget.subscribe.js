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
         * On drag event simulate
         * @member WidgetSubscribe
         * @param type
         * @param args
         */
        dragDraggableSimulate: function dragDraggableSimulate(type, args) {

            /**
             * Define widget
             * @type {Widget}
             */
            var widget = this.scope.controller.getContainment();

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

        resizeResizableSimulate: function resizeResizableSimulate(type, args) {

            /**
             * Get jQuery.UI element
             * @type {*}
             */
            var ui = args[1];

            /**
             * Define widget
             * @type {Widget}
             */
            var widget = this.scope.controller.getContainment();

            /**
             * Define direction
             * @type {string}
             */
            var direction = widget.interactions.resizable.getResizeDirection(ui);

            console.log(direction)
        },

        /**
         * On drag stop event simulate
         * @member WidgetSubscribe
         */
        stopDraggableSimulate: function stopDraggableSimulate() {

            /**
             * Define widget
             * @type {Widget}
             */
            var widget = this.scope.controller.getContainment();

            widget.observer.publish(
                widget.eventmanager.eventList.saveDom
            );

            widget.observer.publish(
                widget.eventmanager.eventList.stopDraggable,
                'stopDraggable'
            );
        },

        /**
         * On drag stop event simulate
         * @member WidgetSubscribe
         */
        stopResizableSimulate: function stopResizableSimulate() {

        },

        /**
         * Set embedded content simulate
         * @member WidgetSubscribe
         */
        setEmbeddedContentSimulate: function setEmbeddedContentSimulate() {

            /**
             * Define referrer widget
             * @type {Widget}
             */
            var widget = this.referrer;

            /**
             * Get subscribers
             * @type {Array}
             */
            var subscribers = widget.controller.getSubscribers(
                    widget.eventmanager.eventList.setEmbeddedContent
                ),
                splitTo = subscribers.length + 1;

            this.scope.view.elements.$image.renderEmbeddedContent(
                this.referrer.model.getPrefs('imageUrl'),
                this.referrer.model.getPrefs('imageText'),
                splitTo
            );
        },
        transferStatsSimulate: function transferStatsSimulate(uuid, $element) {
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.collectStats,
                [uuid, $element]
            );

        }

    });
});