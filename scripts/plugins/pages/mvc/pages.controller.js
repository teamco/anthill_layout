/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin'
], function definePagesController(PluginBase) {

    /**
     * Define pages controller
     * @class PagesController
     * @extends PluginController
     * @constructor
     */
    var PagesController = function PagesController() {
    };

    return PagesController.extend('PagesController', {

        /**
         * Load pages content
         * @member PagesController
         * @param opened
         */
        loadContent: function loadContent(opened) {

            if (opened && this.isDataNotExist()) {
                this.getView().renderContent(
                    this.model.getData(
                        this.getWorkspace()
                    )
                );
            }
        },

        /**
         * Get Prefs
         * @member PagesController
         * @returns {PagesModel.preferences}
         */
        getPreferences: function getPreferences() {
            return this.model.preferences;
        },

        /**
         * Define preferences
         * @member PagesController
         * @param {string} uuid
         * @returns {*}
         */
        definePreferences: function definePreferences(uuid) {

            return this.scope.view.renderPreferences(
                this.getWorkspace().model.getItemByUUID(uuid)
            );
        },

        /**
         * Check if content was updated
         * @member PagesController
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

            return hash.hashLength(data || {}) ===
                hash.hashLength(content || {})
        },

        /**
         * Update prefs
         * @member PagesController
         */
        approveUpdatePreferences: function approveUpdatePreferences() {

            /**
             * Define scope
             */
            var scope = this.scope;

            scope.activeContent.controller.updatePreferences(
                scope.view.elements.$modal
            );
        },

        /**
         * Define publisher
         * @member PagesController
         * @param page
         */
        definePublisher: function definePublisher(page) {
            this.scope.eventmanager.subscribePublishOn(
                page,
                this.updateCounter.bind(this.scope)
            );
        },

        /**
         * Update widgets counter
         * @member PagesController
         */
        updateCounter: function updateCounter() {

            var workspace = this.controller.getWorkspace(),
                pages = workspace.model.getItems(),
                index, page, $item,
                cname = '-pages-view';

            for (index in pages) {

                if (pages.hasOwnProperty(index)) {

                    /**
                     * Define page
                     * @type {Page}
                     */
                    page = pages[index];

                    /**
                     * Define pages content element
                     * @type {PagesContentElement}
                     */
                    $item = this.view.elements.items[page.model.getConfig('uuid') + cname];

                    $item.updateCounter(page);
                }
            }
        }

    }, PluginBase.prototype);
});