/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'config/anthill',
    'plugins/plugin'
], function definePageDataController(AntHill, PluginBase) {

    /**
     * Define page.data controller
     * @class PageDataController
     * @extends AntHill
     * @extends PluginController
     * @constructor
     */
    var PageDataController = function PageDataController() {
    };

    return PageDataController.extend('PageDataController', {

        /**
         * Store item
         * @member PageDataController
         * @param item
         */
        storeItem: function storeItem(item) {
            this.logger.debug('Update storage', item);
            this.model.collectItems(item);
        },

        /**
         * Get providers data
         * @member PageDataController
         */
        getData: function getData() {
            return this.model.getPageData(
                this.getPage()
            );
        },

        /**
         * Set active content
         * @member PageDataController
         * @param {string} uuid
         */
        setActiveContent: function setActiveContent(uuid) {

            /**
             * Get widget
             * @type {Widget}
             */
            var widget = this.controller.getPage().model.getItemByUUID(uuid);

            /**
             * Set active content
             * @type {WidgetContent}
             */
            this.activeContent = widget.controller.getContent();

            /**
             * Define referrer
             * @type {PageData}
             */
            this.activeContent.referrer = this;

            this.logger.debug('Active content', this.activeContent);
        },

        /**
         * Load prefs
         * @member PageDataController
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
         * @member PageDataController
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
         * @member PageDataController
         */
        approveUpdatePreferences: function approveUpdatePreferences() {

            /**
             * Define scope
             * @type {PageData}
             */
            var scope = this.scope;

            scope.activeContent.controller.updatePreferences(
                scope.view.elements.$modal
            );
        },

        /**
         * Locate page data element
         * @member PageDataController
         * @param e
         */
        locatePageData: function locatePageData(e) {

            /**
             * Define $item
             * @type {BaseElement}
             */
            var $item = this.scope.activeContent.containment.view.get$item();

            this.locateElement($item, e);
        },

        /**
         * Load page.data content
         * @member PageDataController
         * @param opened
         */
        loadContent: function loadContent(opened) {

            if (opened && this.isDataNotExist()) {
                this.getView().renderContent(
                    this.getData()
                );
            }
        },

        /**
         * Open rules from prefs dialog
         * @member PageDataController
         * @param {*} event
         */
        rulesPageData: function rulesPageData(event) {

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
            var panel = this.getPanel();

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
         * @member PageDataController
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