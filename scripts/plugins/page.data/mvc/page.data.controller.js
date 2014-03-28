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
         * Get providers data
         * @member PageDataController
         */
        getData: function getData() {
            return this.model.getPageData(
                this.getPage()
            );
        },

        /**
         * Get preferences
         * @member PageDataController
         * @param {string} uuid
         * @returns {*}
         */
        getPreferences: function getPreferences(uuid) {

            /**
             * Define widget
             * @type {*}
             */
            var widget = this.getPage().model.getItemByUUID(uuid),
                scope = this.scope;

            /**
             * Define widget content
             * @type {WidgetContent}
             */
            scope.activeContent = widget.controller.getContent();
            scope.logger.debug('Active component', scope.activeContent);

            return scope.activeContent.view.renderPreferences();
        },

        /**
         * Load prefs
         * @member PageDataController
         * @param config
         * @param load
         * @param {function} [callback]
         */
        loadPreferences: function loadPreferences(config, load, callback) {

            this.view.showPreferences(config, load);

            if (this.base.isFunction(callback)) {
                callback();
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
         */
        locatePageData: function locatePageData() {

            /**
             * Define $item
             * @type {WidgetElement}
             */
            var $item = this.scope.activeContent.containment.view.get$item();

            this.locateElement($item);
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
        }

    }, AntHill.prototype, PluginBase.prototype);
});