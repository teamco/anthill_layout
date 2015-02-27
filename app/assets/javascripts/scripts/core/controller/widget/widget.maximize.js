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
         * Check if widget already maximized
         * @member WidgetMaximize
         * @returns {boolean}
         */
        isMaximized: function isMaximized() {

            /**
             * Get page
             * @type {Page}
             */
            var page = this.controller.getContainment();

            return page.controller.getMaximized() === this.scope;
        },

        /**
         * Reduce widget
         * @member WidgetMaximize
         */
        reduceWidget: function reduceWidget() {

            if (!this.controller.isMaximized()) {

                this.logger.warn('Widget not maximized');
                return false;
            }

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

            if (this.controller.isMaximized()) {

                this.logger.warn('Widget already maximized');
                return false;
            }

            if (this.model.getConfig('preferences').ma)

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

            page.observer.publish(
                page.eventmanager.eventList.updateHashOnMaximize,
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

            page.observer.publish(
                page.eventmanager.eventList.updateHashOnReduce,
                this
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