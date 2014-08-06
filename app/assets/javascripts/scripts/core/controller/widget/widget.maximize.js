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
     * @extends Router
     */
    var WidgetMaximize = function WidgetMaximize() {

    };

    return WidgetMaximize.extend('WidgetMaximize', {

        /**
         * Reduce widget
         * @memberOf WidgetMaximize
         */
        reduceWidget: function reduceWidget() {

            this.observer.publish(
                this.eventmanager.eventList.beforeReduce
            );

            this.view.get$item().reduce();
        },

        /**
         * Enlarge widget
         * @memberOf WidgetMaximize
         */
        enlargeWidget: function enlargeWidget() {

            this.observer.publish(
                this.eventmanager.eventList.beforeMaximize
            );

            this.view.get$item().enlarge();
        },

        /**
         * Before maximize callback
         * @memberOf WidgetMaximize
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

            page.observer.publish(
                page.eventmanager.eventList.updateHashOnMaximize,
                this
            );

            this.view.get$item().show();
        },

        /**
         * After maximize callback
         * @memberOf WidgetMaximize
         */
        afterMaximize: function afterMaximize() {
            this.logger.debug('After maximize');
        },

        /**
         * Before reduce callback
         * @memberOf WidgetMaximize
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

            page.observer.publish(
                page.eventmanager.eventList.updateHashOnReduce,
                this
            );
        },

        /**
         * After reduce callback
         * @memberOf WidgetMaximize
         */
        afterReduce: function afterReduce() {
            this.logger.debug('After reduce');
        }
    });
});