/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'config/anthill',
    'plugins/plugin'
], function defineWidgetRulesController(AntHill, PluginBase) {

    /**
     * Define WidgetRules controller
     * @class WidgetRulesController
     * @extends AntHill
     * @extends PluginController
     * @constructor
     */
    var WidgetRulesController = function WidgetRulesController() {
    };

    return WidgetRulesController.extend('WidgetRulesController', {

        /**
         * Store item
         * @memberOf WidgetRulesController
         * @param item
         */
        storeItem: function storeItem(item) {
            this.logger.debug('Update storage', item);
            this.model.collectItems(item);
        },

        /**
         * Get module data
         * @memberOf WidgetRulesController
         */
        getModuleData: function getModuleData() {
            return this.model.getWidgetRules(
                this.getPage()
            );
        },

        /**
         * Get rules html
         * @memberOf WidgetRulesController
         * @param {string} uuid
         * @param {boolean} load
         * @returns {*}
         */
        getRulesHtml: function getRulesHtml(uuid, load) {

            /**
             * Define scope
             * @type {WidgetRules}
             */
            var scope = this.scope;

            // set active content
            scope.observer.publish(
                scope.eventmanager.eventList.setActiveContent,
                uuid
            );

            if (load) {

                /**
                 * Define widget
                 * @type {Widget}
                 */
                var widget = this.getPage().model.getItemByUUID(uuid);

                return this.scope.activeContent.view.renderRules(
                    widget.eventmanager.getEvents(),
                    widget.controller.getContent().eventmanager.getEvents()
                );

            }
        },

        /**
         * Set active content
         * @memberOf WidgetRulesController
         * @param {string} uuid
         */
        setActiveContent: function setActiveContent(uuid) {

            /**
             * Get current page
             * @type {Page}
             */
            var page = this.controller.getPage();

            /**
             * Get widget
             * @type {Widget}
             */
            var widget = page.model.getItemByUUID(uuid);

            if (!widget) {
                this.logger.warn('Undefined widget', uuid, page);
            }

            /**
             * Set active content
             * @type {WidgetContent}
             */
            this.activeContent = widget.controller.getContent();

            /**
             * Define referrer
             * @type {WidgetRules}
             */
            this.activeContent.referrer = this;

            this.logger.debug('Active content', this.activeContent);
        },

        /**
         * Load rules
         * @memberOf WidgetRulesController
         * @param config
         * @param load
         * @param [event]
         * @param {function} [callback]
         */
        loadRules: function loadRules(config, load, event, callback) {

            this.observer.publish(
                this.eventmanager.eventList.setActiveContent,
                config.uuid
            );

            this.view.showRules(config, load);

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
         * Load stored rules
         * @memberOf WidgetRulesController
         * @param {{publish, subscribe}} rules
         */
        loadStoredRules: function loadStoredRules(rules) {
            this.showPublishedRules(rules.publish);
        },

        /**
         * Show published rules
         * @memberOf WidgetRulesController
         * @param publish
         */
        showPublishedRules: function showPublishedRules(publish) {

            /**
             * Define active content
             * @type {*}
             */
            var scope = this.scope.activeContent;

            for (var index in publish) {

                if (publish.hasOwnProperty(index)) {

                    /**
                     * Define rules
                     * @type {Array}
                     */
                    var rules = publish[index];

                    for (var i = 0, l = rules.length; i < l; i++) {

                        scope.observer.publish(
                            scope.eventmanager.eventList.publishRule,
                            [rules[i], index]
                        );
                    }
                }
            }
        },

        /**
         * Check if content was updated
         * @memberOf WidgetRulesController
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
         * Update rules
         * @memberOf WidgetRulesController
         */
        approveUpdateRules: function approveUpdateRules() {

            /**
             * Define scope
             * @type {WidgetRules}
             */
            var scope = this.scope;

            scope.activeContent.controller.updateRules(
                scope.view.elements.$modal
            );
        },

        /**
         * Locate page data element
         * @memberOf WidgetRulesController
         * @param e
         */
        locateWidgetRules: function locateWidgetRules(e) {

            /**
             * Define $item
             * @type {WidgetElement}
             */
            var $item = this.scope.activeContent.containment.view.get$item();

            this.locateElement($item, e);
        },

        /**
         * Open prefs from rules dialog
         * @memberOf WidgetRulesController
         * @param {*} event
         */
        preferencesWidgetRules: function preferencesWidgetRules(event) {

            /**
             * Trigger click prefs
             * @private
             */
            function _triggerPrefs() {

                /**
                 * Define $item
                 * @type {PageDataContentElement}
                 */
                var $item = this.view.elements.items[[
                    widget.model.getUUID(),
                    'page-data'
                ].join('-')];

                $item.$.trigger('click.prefs');
            }

            /**
             * Define panel
             * @type {Panel}
             */
            var panel = this.getAuthorPanel();

            /**
             * Define widget rules
             * @type {PageData}
             */
            var pageData = this.getModuleByName('page-data');

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
                ['page-data', event, _triggerPrefs.bind(pageData)]
            );

            this.scope.view.elements.$modal.selfDestroy();
        }

    }, AntHill.prototype, PluginBase.prototype);
});