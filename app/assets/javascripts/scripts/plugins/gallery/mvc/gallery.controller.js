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
         * Define init model
         * @member GalleryController
         */
        initModel: function initModel() {

            this.logger.debug('Init model');
            this.model.loadStaticData();
        },

        /**
         * Get providers data
         * @member GalleryController
         */
        getProvidersData: function getProvidersData() {
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

            /**
             * Get available providers
             * @type {*}
             */
            var data = this.model.providers,
                index, i = 0, pl;

            for (index in data) {

                if (data.hasOwnProperty(index)) {

                    pl = data[index].data.length;

                    for (; i < pl; i++) {

                        // Categorize providers data list
                        this.model.setProvider(data[index].data[i]);
                    }
                }
            }
        },

        /**
         * Change current provider
         * @member GalleryController
         * @param provider
         * @returns {boolean}
         */
        changeProvider: function changeProvider(provider) {

            if (provider === this.getCurrentProvider().key) {
                return false;
            }

            this.setCurrentProvider(provider);
            this.loadContent(true, true);
        },

        /**
         * Load gallery content
         * @member GalleryController
         * @param {boolean} opened
         * @param {boolean} [force]
         */
        loadContent: function loadContent(opened, force) {

            if (opened) {
                this.getView().renderContent(
                    this.getCurrentProvider(),
                    force
                );
            }
        },

        /**
         * Filter search results
         * @member GalleryController
         * @param e
         */
        filterResults: function filterResults(e) {

            e.preventDefault();

            if (e.which === 13) {
                return false;
            }

            if (e.which === 27) {
                e.target.value = '';
            }

            /**
             * Get item elements
             * @type {{}}
             */
            var items = this.getView().elements.items,
                index, $item,
                value = e.target.value,
                regex;

            for (index in items) {

                if (items.hasOwnProperty(index)) {

                    /**
                     * Define item
                     * @type {GalleryContentElement}
                     */
                    $item = items[index];

                    if (value.length === 0) {

                        $item.$.removeAttr('style');

                    } else {

                        /**
                         * Define regex
                         * @type {RegExp}
                         */
                        regex = new RegExp(value, 'ig');

                        ($item.data.name.match(regex) || $item.data.type.match(regex)) ?
                            $item.$.removeAttr('style') :
                            $item.hide();
                    }
                }
            }

            this.getView().updateFooterContent();
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
                        thumbnail: $element.data.thumbnail,
                        title: $element.data.name,
                        description: $element.data.description
                    },
                    html: {
                        dimensions: {
                            width: $element.data.dimensions.width,
                            height: $element.data.dimensions.height
                        }
                    }
                }
            }, true);
        }

    }, PluginBase.prototype);
});