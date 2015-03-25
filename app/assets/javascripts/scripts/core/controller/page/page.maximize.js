/**
 * Created by i061485 on 7/9/14.
 */

define([], function definePageItemMaximize() {

    /**
     * Define PageItemMaximize
     * @class PageItemMaximize
     * @constructor
     */
    var PageItemMaximize = function PageItemMaximize() {
    };

    return PageItemMaximize.extend('PageItemMaximize', {

        /**
         * Get maximized widget
         * @member PageItemMaximize
         * @returns {Widget|*}
         */
        getMaximized: function getMaximized() {
            return this.scope.maximized;
        },

        /**
         * Set widget as maximized
         * @member  {PageItemMaximize}
         * @param {Widget} widget
         */
        setMaximized: function setMaximized(widget) {

            /**
             * Set maximized
             * @member PageItemMaximize
             * @type {Widget}
             */
            this.maximized = widget;

            this.logger.debug('Set maximized', this.maximized);
        },

        /**
         * Unset widget as maximized
         * @member PageItemMaximize
         */
        unsetMaximized: function unsetMaximized() {

            /**
             * Unset maximized
             * @member PageItemMaximize
             * @type {{}}
             */
            this.maximized = {};

            this.logger.debug('Unset maximized', this.maximized);
        },

        /**
         * Disable items interactions on enlarge
         * @member PageItemMaximize
         * @param {Widget} widget
         */
        disableItemInteractions: function disableItemInteractions(widget) {

            var items = this.model.getItems(),
                index, item;

            for (index in items) {

                if (items.hasOwnProperty(index)) {

                    /**
                     * Define item
                     * @type {Widget}
                     */
                    item = items[index];

                    item.observer.publish(
                        item.eventmanager.eventList.disableDraggable
                    );

                    item.observer.publish(
                        item.eventmanager.eventList.disableResizable
                    );

                    if (widget !== item) {
                        item.view.get$item().hide();
                    }
                }
            }

            this.controller.banAddWidget();

            this.observer.publish(
                this.eventmanager.eventList.setMaximized,
                widget
            );
        },

        /**
         * Enable item interaction on reduce
         * @member PageItemMaximize
         */
        enableItemInteractions: function enableItemInteractions() {

            var items = this.model.getItems(),
                index, item;

            for (index in items) {

                if (items.hasOwnProperty(index)) {

                    /**
                     * Define item
                     * @type {Widget}
                     */
                    item = items[index];

                    item.observer.publish(
                        item.eventmanager.eventList.enableDraggable
                    );

                    item.observer.publish(
                        item.eventmanager.eventList.enableResizable
                    );

                    item.view.get$item().show();
                }
            }

            this.controller.allowAddWidget();

            this.observer.publish(
                this.eventmanager.eventList.unsetMaximized
            );
        }
    });
});