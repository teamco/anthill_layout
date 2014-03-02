/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin'
], function definePageDataController(PluginBase) {

    /**
     * Define page.data controller
     * @class Controller
     * @mixin {BaseController}
     * @constructor
     */
    var Controller = function Controller() {
    };

    return Controller.extend({

        /**
         * Get providers data
         */
        getData: function getData() {
            return this.model.getPageData(
                this.getPage()
            );
        },

        /**
         * Check if content was updated
         * @param data
         * @param content
         * @returns {boolean}
         */
        isUpdate: function isUpdate(data, content) {

            /**
             * Define hash
             * @type {string|*|Observer.executeEvent.options.opts.hash}
             */
            var hash = anthill.base.lib.hash;

            return hash.hashLength(data || {}) ===
                hash.hashLength(content || {})
        },

        /**
         * Load page.data content
         * @param opened
         */
        loadContent: function loadContent(opened) {

            if (opened && this.isDataNotExist()) {
                this.getView().renderContent(
                    this.getData()
                );
            }
        }

    }, PluginBase.prototype);
});