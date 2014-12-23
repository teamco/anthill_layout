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
         * Get module data
         * @member PageDataController
         */
        getModuleData: function getModuleData() {
            return this.model.getPageData(
                this.getPage()
            );
        },

        /**
         * Set active content
         * @member PageDataController
         * @param {string} uuid
         * @returns {*|boolean}
         */
        setActiveContent: function setActiveContent(uuid) {

            /**
             * Get workspace data
             * @type {WorkspaceData}
             */
            var workspacesData = this.controller.getModuleByName('workspace-data');

            /**
             * Get current page
             * @type {Page}
             */
            var page = this.controller.getPage();

            workspacesData.observer.publish(
                workspacesData.eventmanager.eventList.setActiveContent,
                page.model.getUUID()
            );

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

            if (!this.activeContent) {
                this.logger.warn('Undefined content');
                return false;
            }

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
            var scope = this.scope,
                content = scope.activeContent;

            content.controller.updatePreferences(
                scope.view.elements.$modal,
                true
            );

            /**
             * Get widget
             * @type {Widget}
             */
            var widget = content.controller.getContainment();

            /**
             * Get element uuid
             * @type {string}
             */
            var uuid = [
                widget.model.getUUID(),
                scope.constructor.name.toDash()
            ].join('-');

            this.getView().elements.items[uuid].setAttributes(
                widget
            );
        },

        /**
         * Locate page data element
         * @member PageDataController
         * @param e
         */
        locatePageData: function locatePageData(e) {

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
                var $item = this.view.elements.items[
                widget.model.getUUID() + '-widget-rules'];

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
                ['widget-rules', event, _triggerRules.bind(widgetRules)]
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
        },

        /**
         * Restore widget sticker
         * @member PageDataController
         */
        restoreWidgetSticker: function restoreWidgetSticker() {

            /**
             * Define active content
             * @type {*}
             */
            var content = this.scope.activeContent;

            content.observer.publish(
                content.eventmanager.eventList.executeOnWidgetEvent,
                'restoreWidgetSticker'
            );
        },

        /**
         * Remove widget from page
         * @member PageDataController
         * @param e
         */
        removeWidget: function removeWidget(e) {

            /**
             * Get scope
             * @type {PageData}
             */
            var scope = this.scope;

            /**
             * Get active content
             * @type {WidgetContent}
             */
            var content = scope.activeContent;

            if (!content) {

                scope.logger.warn('Undefined active content', e);
                return false;
            }

            /**
             * Get page
             * @type {Page}
             */
            var page = this.getPage(),
                panel = this.getAuthorPanel();

            // Close author panel
            panel.controller.closePanels();

            // Destroy properties dialog
            scope.view.elements.$modal.selfDestroy();

            page.api.destroyWidget(
                content.controller.getContainment()
            );
        }

    }, AntHill.prototype, PluginBase.prototype);
});