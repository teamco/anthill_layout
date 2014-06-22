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

            for(var index in items){

                if(items.hasOwnProperty(index)) {
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

        defineInteraction: function defineInteraction(widget) {

            debugger
        }

    }, AntHill.prototype, PluginBase.prototype);
});