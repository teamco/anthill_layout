/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/22/14
 * Time: 9:15 PM
 */

define(function defineWidgetMaximize() {

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
         * @memberOf WidgetMaximize
         * @returns {boolean}
         */
        isMaximized: function isMaximized() {

            /**
             * Get page
             * @type {Page}
             */
            var page = this.getContainment();

            return page.controller.getMaximized() === this.scope;
        },

        /**
         * Check if maximizable
         * @memberOf WidgetMaximize
         * @returns {boolean}
         */
        isMaximizable: function isMaximizable() {

            /**
             * Get capability and prefs
             * @type {boolean}
             */
            var capability = this.scope.permission.getCapability('maximizable'),
                preferences = !!this.model.getConfig('preferences').maximizable;

            return capability && preferences;
        },

        /**
         * Reduce widget
         * @memberOf WidgetMaximize
         */
        reduceWidget: function reduceWidget() {

            if (!this.controller.isMaximized()) {

                this.logger.debug('Widget not maximized');
                return false;
            }

            this.observer.publish(
                this.eventManager.eventList.beforeReduce
            );

            this.view.get$item().reduce();
        },

        /**
         * Enlarge widget
         * @memberOf WidgetMaximize
         */
        enlargeWidget: function enlargeWidget() {

            if (this.controller.isMaximized()) {

                this.logger.warn('Widget already maximized');
                return false;
            }

            if (!this.controller.isMaximizable()) {

                this.logger.warn('Widget can\'t be maximized');
                return false;
            }

            this.observer.publish(
                this.eventManager.eventList.beforeMaximize
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
                page.eventManager.eventList.disableItemInteractions,
                this
            );

            page.observer.publish(
                page.eventManager.eventList.updateHashOnMaximize,
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
                page.eventManager.eventList.enableItemInteractions
            );

            page.observer.publish(
                page.eventManager.eventList.updateHashOnReduce,
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