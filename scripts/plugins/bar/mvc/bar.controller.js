/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin'
], function defineBarController(PluginBase) {

    /**
     * Define bar controller
     * @class Controller
     * @mixin {BaseController}
     * @constructor
     */
    var Controller = function Controller() {
    };

    return Controller.extend({

        /**
         * Get modules data
         */
        getData: function getData() {
            return this.model.getModulesList();
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
        }

    }, PluginBase.prototype);
});