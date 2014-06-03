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
         * Get current provider
         * @member GalleryController
         * @returns {{name: string, data: *[]}[]}
         */
        getCurrentProvider: function getCurrentProvider() {
            return this.model.currentProvider;
        },

        /**
         * Set current provider
         * @member GalleryController
         * @param name
         */
        setCurrentProvider: function setCurrentProvider(name) {
            this.model.setProviderAsCurrent(name);
        },

        /**
         * Set providers
         * @member GalleryController
         */
        setProviders: function setProviders() {
            this.logger.debug('Set providers');
        },

        /**
         * Load gallery content
         * @member GalleryController
         * @param opened
         */
        loadContent: function loadContent(opened) {

            if (opened) {
                this.getView().renderContent(
                    this.getCurrentProvider()
                );
            }
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