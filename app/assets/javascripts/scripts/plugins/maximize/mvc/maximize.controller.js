/**
 * Created with RubyMine.
 * User: teamco
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
         * @memberOf MaximizeController
         * @param item
         */
        storeItem: function storeItem(item) {
            this.logger.debug('Update storage', item);
            this.model.collectItems(item);
        },

        /**
         * Get providers data
         * @memberOf MaximizeController
         */
        getModuleData: function getModuleData() {
            return this.model.getMaximize(
                this.getPage()
            );
        },

        /**
         * Set active content
         * @memberOf MaximizeController
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
         * @memberOf MaximizeController
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

            if (_.isFunction(callback)) {
                callback(event);
            }
        },

        /**
         * Locate page data element
         * @memberOf MaximizeController
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
         * @memberOf MaximizeController
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
         * @memberOf MaximizeController
         * @param {Widget} widget
         */
        defineInteraction: function defineInteraction(widget) {

            /**
             * Get page
             * @type {Page}
             */
            var page = this.controller.getPage();

            if (page.maximized === widget) {

                widget.observer.publish(
                    widget.eventmanager.eventList.reduceWidget
                );

            } else {

                if (page.maximized.observer) {

                    page.maximized.observer.publish(
                        page.maximized.eventmanager.eventList.reduceWidget
                    );
                }

                widget.observer.publish(
                    widget.eventmanager.eventList.enlargeWidget
                );
            }
        }

    }, AntHill.prototype, PluginBase.prototype);
});