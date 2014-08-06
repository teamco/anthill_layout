/**
 * Created by i061485 on 7/9/14.
 */

define([], function definePageMaximize() {

    /**
     * Define PageMaximize
     * @class PageMaximize
     * @constructor
     */
    var PageMaximize = function PageMaximize() {
        
    };
    
    return PageMaximize.extend('PageMaximize', {

        /**
         * Set widget as maximized
         * @memberOf  {PageMaximize}
         * @param {Widget} widget
         */
        setMaximized: function setMaximized(widget) {

            /**
             * Set maximized
             * @memberOf PageMaximize
             * @type {Widget}
             */
            this.maximized = widget;

            this.logger.debug('Set maximized', this.maximized);
        },

        /**
         * Unset widget as maximized
         * @memberOf  {PageMaximize}
         */
        unsetMaximized: function unsetMaximized() {

            /**
             * Unset maximized
             * @memberOf PageMaximize
             * @type {{}}
             */
            this.maximized = {};

            this.logger.debug('Unset maximized', this.maximized);
        },

        /**
         * Disable items interactions on enlarge
         * @memberOf PageMaximize
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
         * @memberOf PageMaximize
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