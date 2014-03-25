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
     * @class GalleryController
     * @extends PluginController
     * @constructor
     */
    var GalleryController = function GalleryController() {
    };

    return GalleryController.extend('GalleryController', {

        /**
         * Get providers data
         * @member GalleryController
         */
        getData: function getData() {
            return this.model.getProvidersList();
        },

        /**
         * Load gallery content
         * @member GalleryController
         * @param opened
         */
        loadContent: function loadContent(opened) {

            if (opened && this.isDataNotExist()) {

                this.getView().renderProviders(
                    this.getData(),
                    this.model.defaultProvider
                );

//                this.getView().renderContent(
//                    this.getData()
//                );
            }
        },

        /**
         * Set providers
         * @member GalleryController
         */
        setProviders: function setProviders() {
            // TODO
        },

        /**
         * Add widget
         * @member GalleryController
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