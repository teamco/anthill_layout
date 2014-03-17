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
     * @class BarController
     * @extends PluginController
     * @constructor
     */
    var BarController = function BarController() {
    };

    return BarController.extend('BarController', {

        /**
         * Get modules data
         * @member BarController
         */
        getData: function getData() {
            return this.model.getModulesList();
        },

        /**
         * Load gallery content
         * @member BarController
         */
        loadContent: function loadContent() {

            if (this.isDataNotExist()) {
                this.getView().renderContent(
                    this.getData()
                );
            }
        }

    }, PluginBase.prototype);
});