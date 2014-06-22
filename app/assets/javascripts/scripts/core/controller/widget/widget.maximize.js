/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/22/14
 * Time: 9:15 PM
 */

define([], function defineWidgetMaximize() {

    /**
     * Define WidgetMaximize
     * @class WidgetMaximize
     * @constructor
     */
    var WidgetMaximize = function WidgetMaximize() {

    };

    return WidgetMaximize.extend('WidgetMaximize', {

        /**
         * Reduce widget
         * @member WidgetMaximize
         */
        reduceWidget: function reduceWidget() {

            this.observer.publish(
                this.eventmanager.eventList.beforeReduce
            );

            this.view.get$item().reduce();
        },

        /**
         * Enlarge widget
         * @member WidgetMaximize
         */
        enlargeWidget: function enlargeWidget() {

            this.observer.publish(
                this.eventmanager.eventList.beforeMaximize
            );

            this.view.get$item().enlarge();
        },

        /**
         * Before maximize callback
         * @member WidgetMaximize
         */
        beforeMaximize: function beforeMaximize() {

            this.logger.debug('Before maximize');

            /**
             * Get page
             * @type {Page}
             */
            var page = this.controller.getContainment();

            page.observer.publish(
                page.eventmanager.eventList.disableItemInteractions,
                this
            );

            this.view.get$item().show();
        },

        /**
         * After maximize callback
         * @member WidgetMaximize
         */
        afterMaximize: function afterMaximize() {
            this.logger.debug('After maximize');
        },

        /**
         * Before reduce callback
         * @member WidgetMaximize
         */
        beforeReduce: function beforeReduce() {

            this.logger.debug('Before reduce');

            /**
             * Get page
             * @type {Page}
             */
            var page = this.controller.getContainment();

            page.observer.publish(
                page.eventmanager.eventList.enableItemInteractions
            );
        },

        /**
         * After reduce callback
         * @member WidgetMaximize
         */
        afterReduce: function afterReduce() {
            this.logger.debug('After reduce');
        }
    });
});