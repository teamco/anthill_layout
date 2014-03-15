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
     * @extends PluginController
     * @constructor
     */
    var Controller = function Controller() {
    };

    return Controller.extend({

        /**
         * Get modules data
         * @member Controller
         */
        getData: function getData() {
            return this.model.getModulesList();
        },

        /**
         * Load gallery content
         * @member Controller
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