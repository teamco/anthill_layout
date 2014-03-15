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
     * @extends PluginController
     * @constructor
     */
    var Controller = function Controller() {
    };

    return Controller.extend({

        /**
         * Get providers data
         * @member Controller
         */
        getData: function getData() {
            return this.model.getProvidersList();
        },

        /**
         * Load gallery content
         * @member Controller
         * @param opened
         */
        loadContent: function loadContent(opened) {

            if (opened && this.isDataNotExist()) {
                this.getView().renderContent(
                    this.getData()
                );
            }
        },

        /**
         * Set providers
         * @member Controller
         */
        setProviders: function setProviders() {
            this.model.setDefaultProviders();
        },

        /**
         * Add widget
         * @member Controller
         * @param $element
         */
        addWidget: function addWidget($element) {

            this.getPage().api.createItem({
                config: {
                    preferences: {
                        resource: $element.$.attr('resource')
                    }
                }
            }, true);
        }

    }, PluginBase.prototype);
});