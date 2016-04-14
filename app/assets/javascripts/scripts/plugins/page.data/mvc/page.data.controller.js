/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'config/anthill',
    'plugins/plugin.controller'
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
         * @memberOf PageDataController
         * @param item
         */
        storeItem: function storeItem(item) {
            this.logger.debug('Update storage', item);
            this.model.collectItems(item);
        },

        /**
         * Get module data
         * @memberOf PageDataController
         */
        getModuleData: function getModuleData() {
            return this.model.getPageData(
                this.getPage()
            );
        },

        /**
         * Set active content
         * @memberOf PageDataController
         * @param {string} uuid
         * @returns {*|boolean}
         */
        setActiveContent: function setActiveContent(uuid) {

            if (!uuid) {
                this.logger.debug('Skip active content setter');
                return false;
            }
            
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
                var panel = this.controller.getDesignTimePanel();

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
         * Check if content was updated
         * @memberOf PageDataController
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
         * @memberOf PageDataController
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
                scope.name.toDash()
            ].join('-');

            this.getView().elements.items[uuid].setAttributes(
                widget
            );
        },
        
        /**
         * Open rules from prefs dialog
         * @memberOf PageDataController
         * @param {*} event
         */
        rulesPageData: function rulesPageData(event) {

            /**
             * Define panel
             * @type {Panel}
             */
            var panel = this.getDesignTimePanel();

            /**
             * Define widget rules
             * @type {WidgetRules}
             */
            var widgetRules = panel.controller.getWidgetRules();

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

            this.scope.view.get$modal().selfDestroy();

            panel.observer.publish(
                panel.eventmanager.eventList.openPanel, [
                    'widget-rules', event,
                    this.prepareTriggerShowModalData.bind({
                        widget: widget,
                        scope: widgetRules
                    })
                ]
            );
        },

        /**
         * Restore layer index
         * @memberOf PageDataController
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
         * @memberOf PageDataController
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
         * @memberOf PageDataController
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
                panel = this.getDesignTimePanel();

            // Close author panel
            panel.controller.closePanels();

            // Destroy properties dialog
            scope.view.elements.$modal.selfDestroy();

            page.api.destroyWidget(
                content.controller.getContainment()
            );
        },

        /**
         * Bind ParallaxEffect Toggle
         * @memberOf PageDataController
         * @param content
         */
        bindParallaxEffectToggle: function bindParallaxEffectToggle(content) {

            var scope = this.scope,
                eventName = content.eventmanager.eventList.successBuildElement;

            scope.logger.debug('Bind ParallaxEffect Toggle', content);

            // Remove before subscribe
            scope.eventmanager.removeListener({
                scope: content,
                eventName: eventName,
                eventUUID: scope.eventmanager.unSubscribe[eventName]
            });

            /**
             * Fetch event uuid
             * @type {String}
             */
            var eventUUID = scope.eventmanager.subscribe({
                event: eventName,

                /**
                 * successBuildElement
                 * @param {ModalElement} $element
                 * @private
                 */
                callback: function _buildCallback($element) {

                    if (!$element.isModal()) {
                        return false;
                    }

                    this.logger.debug('After build element callback', $element, content);
                    content.view.elements.$preferences.toggleParallaxPrefs();
                }
            }, true);

            // Store event
            scope.eventmanager.unSubscribe[eventName] = eventUUID;
        }

    }, AntHill.prototype, PluginBase.prototype);
});