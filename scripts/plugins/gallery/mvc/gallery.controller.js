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
         * Get default provider
         * @member GalleryController
         * @returns {{name: string, data: *[]}[]}
         */
        getDefaultProvider: function getDefaultProvider() {
            return this.model.defaultProvider;
        },

        /**
         * Load gallery content
         * @member GalleryController
         * @param opened
         */
        loadContent: function loadContent(opened) {

            if (opened && this.isDataNotExist()) {

                this.getView().renderContent(
                    this.getDefaultProvider()
                );
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
         * Filter search results
         * @member GalleryController
         * @param e
         */
        filterResults: function filterResults(e) {
            console.log(this, e)
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
                        resource: $element.$.attr('resource'),
                        thumbnail: $element.data.thumbnail
                    }
                }
            }, true);
        }

    }, PluginBase.prototype);
});