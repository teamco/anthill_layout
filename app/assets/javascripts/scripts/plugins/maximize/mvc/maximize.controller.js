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
         * @param load
         * @param event
         * @param {function} [callback]
         */
        loadPreferences: function loadPreferences(config, load, event, callback) {

            this.view.showPreferences(config, load);

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
         * Check if content was updated
         * @member MaximizeController
         * @param data
         * @param content
         * @returns {boolean}
         */
        isUpdate: function isUpdate(data, content) {

            /**
             * Define hash
             * @type {*}
             */
            var hash = this.base.lib.hash;

            return hash.hashLength(data || {}) !==
                hash.hashLength(content || {})
        },

        /**
         * Update prefs
         * @member MaximizeController
         */
        approveUpdatePreferences: function approveUpdatePreferences() {

            /**
             * Define scope
             * @type {Maximize}
             */
            var scope = this.scope;

            scope.activeContent.controller.updatePreferences(
                scope.view.elements.$modal
            );
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
         * Open rules from prefs dialog
         * @member MaximizeController
         * @param {*} event
         */
        rulesMaximize: function rulesMaximize(event) {

            /**
             * Trigger click rules
             * @private
             */
            function _triggerRules() {

                /**
                 * Define $item
                 * @type {WidgetRulesContentElement}
                 */
                var $item = this.view.elements.items[widget.model.getUUID() + '-widgetrules'];

                $item.$.trigger('click.rules');
            }

            /**
             * Define panel
             * @type {Panel}
             */
            var panel = this.getAuthorPanel();

            /**
             * Define widget rules
             * @type {WidgetRules}
             */
            var widgetRules = this.getWidgetRules();

            /**
             * Define active content
             * @type {*}
             */
            var content = this.scope.activeContent;

            /**
             * Define widget
             * @type {Widget}
             */
            var widget = content.controller.getContainment();

            panel.observer.publish(
                panel.eventmanager.eventList.openPanel,
                ['widgetrules', event, _triggerRules.bind(widgetRules)]
            );

            this.scope.view.elements.$modal.selfDestroy();
        },

        /**
         * Restore layer index
         * @member MaximizeController
         */
        restoreWidgetsLayerIndex: function restoreWidgetsLayerIndex() {

            /**
             * Define active content
             * @type {*}
             */
            var content = this.scope.activeContent;

            content.observer.publish(
                content.eventmanager.eventList.executeOnWidgetEvent,
                'restoreLayerIndex'
            );
        }

    }, AntHill.prototype, PluginBase.prototype);
});