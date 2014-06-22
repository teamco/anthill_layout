/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'config/anthill',
    'plugins/plugin'
], function defineMaximizeController(AntHill, PluginBase) {

    /**
     * Define maximize controller
     * @class MaximizeController
     * @extends AntHill
     * @extends PluginController
     * @constructor
     */
    var MaximizeController = function MaximizeController() {
    };

    return MaximizeController.extend('MaximizeController', {

        /**
         * Store item
         * @member MaximizeController
         * @param item
         */
        storeItem: function storeItem(item) {
            this.logger.debug('Update storage', item);
            this.model.collectItems(item);
        },

        /**
         * Get providers data
         * @member MaximizeController
         */
        getData: function getData() {
            return this.model.getMaximize(
                this.getPage()
            );
        },

        /**
         * Set active content
         * @member MaximizeController
         * @param {string} uuid
         * @returns {*|boolean}
         */
        setActiveContent: function setActiveContent(uuid) {

            /**
             * Get page
             * @type {Page}
             */
            var page = this.controller.getPage();

            /**
             * Get widget
             * @type {Widget}
             */
            var widget = page.model.getItemByUUID(uuid);

            if (!widget) {

                this.logger.warn('Invalid data', page, uuid);

                /**
                 * Get panel
                 * @type {Panel}
                 */
                var panel = this.controller.getAuthorPanel();

                panel.observer.publish(
                    panel.eventmanager.eventList.closePanel,
                    panel.active
                );

                return false;
            }

            /**
             * Set active content
             * @type {WidgetContent}
             */
            this.activeContent = widget.controller.getContent();

            /**
             * Define referrer
             * @type {Maximize}
             */
            this.activeContent.referrer = this;

            this.logger.debug('Active content', this.activeContent);
        },

        /**
         * Load prefs
         * @member MaximizeController
         * @param config
         * @param event
         * @param {function} [callback]
         */
        loadPreferences: function loadPreferences(config, event, callback) {

            this.observer.publish(
                this.eventmanager.eventList.setActiveContent,
                config.uuid
            );

            /**
             * Define collected items
             * @type {*}
             */
            var items = this.model.getCollectedItems();

            for (var index in items) {

                if (items.hasOwnProperty(index)) {
                    this.controller.defineContentReferrer(items[index]);
                }
            }

            if (this.base.isFunction(callback)) {
                callback(event);
            }
        },

        /**
         * Locate page data element
         * @member MaximizeController
         * @param e
         */
        locateMaximize: function locateMaximize(e) {

            // Get active content
            var active = this.scope.activeContent;

            if (!active) {
                return false;
            }

            /**
             * Define $item
             * @type {BaseElement}
             */
            var $item = active.controller.getContainment().view.get$item();

            this.locateElement($item, e);
        },

        /**
         * Load maximize content
         * @member MaximizeController
         * @param opened
         */
        loadContent: function loadContent(opened) {

            if (opened) {
                this.getView().renderContent(
                    this.getData()
                );
            }
        },

        /**
         * Define maximize interaction
         * @member MaximizeController
         * @param {Widget} widget
         */
        defineInteraction: function defineInteraction(widget) {

            /**
             * Get page
             * @type {Page}
             */
            var page = this.controller.getPage();

            if (page.maximized === widget) {

                this.observer.publish(
                    this.eventmanager.eventList.reduceWidget,
                    [widget, page]
                );

            } else {

                this.observer.publish(
                    this.eventmanager.eventList.reduceWidget,
                    [page.maximized, page]
                );

                this.observer.publish(
                    this.eventmanager.eventList.enlargeWidget,
                    [widget, page]
                );
            }
        },

        /**
         * Reduce widget
         * @member MaximizeController
         * @param {Widget} widget
         * @param {Page} page
         */
        reduceWidget: function reduceWidget(widget, page) {

            if (!widget.view) {
                return false;
            }

            this.observer.publish(
                this.eventmanager.eventList.beforeReduce,
                [widget, page]
            );

            this.view.get$item().reduce(widget);
        },

        /**
         * Enlarge widget
         * @member MaximizeController
         * @param {Widget} widget
         * @param {Page} page
         */
        enlargeWidget: function enlargeWidget(widget, page) {

            this.observer.publish(
                this.eventmanager.eventList.beforeMaximize,
                [widget, page]
            );

            this.view.get$item().enlarge(widget);
        },

        /**
         * Before maximize callback
         * @member WidgetController
         * @param {Widget} widget
         * @param {Page} page
         */
        beforeMaximize: function beforeMaximize(widget, page) {

            this.logger.debug('Before maximize', widget);

            var items = page.model.getItems(),
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

            widget.view.get$item().show();

            page.controller.banAddWidget();

            page.observer.publish(
                page.eventmanager.eventList.setMaximized,
                widget
            );
        },

        /**
         * After maximize callback
         * @member WidgetController
         * @param {Widget} widget
         */
        afterMaximize: function afterMaximize(widget) {
            this.logger.debug('After maximize', widget);
        },

        /**
         * Before reduce callback
         * @member WidgetController
         * @param {Widget} widget
         * @param {Page} page
         */
        beforeReduce: function beforeReduce(widget, page) {

            this.logger.debug('Before reduce', widget);

            var items = page.model.getItems(),
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

            page.controller.allowAddWidget();

            page.observer.publish(
                page.eventmanager.eventList.unsetMaximized
            );
        },

        /**
         * After reduce callback
         * @member WidgetController
         * @param {Widget} widget
         */
        afterReduce: function afterReduce(widget) {
            this.logger.debug('After reduce', widget);
        }

    }, AntHill.prototype, PluginBase.prototype);
});