/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin'
], function defineGalleryController(PluginBase) {

    /**
     * Define gallery controller
     * @class Controller
     * @mixin {BaseController}
     * @constructor
     */
    var Controller = function Controller() {
    };

    return Controller.extend({

        /**
         * Check if opened
         * @returns {boolean|*}
         */
        isOpened: function isOpened() {
            return this.scope.opened;
        },

        /**
         * Update opened
         * @param {Boolean} opened
         */
        setBehavior: function setBehavior(opened) {

            /**
             * Update opened instance
             */
            this.scope.opened = !!opened;
        },

        /**
         * Get providers data
         */
        getData: function getData() {
            return this.model.getProvidersList();
        },

        /**
         * Check if providers data was existing
         * @returns {boolean}
         */
        isDataNotExist: function isDataNotExist() {

            return anthill.base.lib.hash.isHashEmpty(
                this.scope.view.elements.content
            );
        },

        /**
         * Load gallery content
         * @param opened
         */
        loadContent: function loadContent(opened) {

            if (opened && this.isDataNotExist()) {
                this.getView().renderContent(
                    this.getData()
                );
            }
        },

        addWidget: function addWidget($element) {
            debugger

            anthill.demo.workspace.page.api.createItem({
                resource: $element.$.attr('resource')
            }, true);
        }

    }, PluginBase.prototype);
});