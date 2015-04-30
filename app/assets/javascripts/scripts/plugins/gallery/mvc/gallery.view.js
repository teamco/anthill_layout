/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/View',
    'element/header.element',
    'element/footer.element',
    'plugins/gallery/element/gallery.providers.element',
    'plugins/gallery/element/gallery.content.element',
    'plugins/gallery/element/gallery.element'
], function defineGalleryView(BaseView, Header, Footer, GalleryProvidersElement, GalleryContentElement, GalleryElement) {

    /**
     * Define view
     * @class GalleryView
     * @constructor
     * @extends BaseView
     */
    var GalleryView = function GalleryView() {
    };

    return GalleryView.extend('GalleryView', {

        /**
         * Render Gallery
         * @memberOf GalleryView
         * @returns {boolean}
         */
        renderGallery: function renderGallery() {

            this.renderHeader(Header, 'Gallery Widgets');

            this.renderFilter(
                this.updateFooterContent.bind(this)
            );

            this.renderProviders(
                this.controller.getProvidersData(),
                this.controller.getModuleData()
            );

            if (this.isCached('$gallery', GalleryElement)) {

                /**
                 * Get scope
                 * @type {Gallery}
                 */
                var scope = this.scope;

                scope.observer.publish(
                    scope.eventmanager.eventList.loadModuleContent, [
                        true, true
                    ]
                );

                return false;
            }

            /**
             * Define Gallery element
             * @type {GalleryElement}
             */
            this.elements.$gallery = new GalleryElement(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$
            });
        },

        /**
         * Render gallery providers
         * @memberOf GalleryView
         * @param providers
         * @param currentProvider
         * @returns {boolean}
         */
        renderProviders: function renderProviders(providers, currentProvider) {

            /**
             * Define Gallery element
             * @type {GalleryProvidersElement}
             */
            this.elements.$providers = new GalleryProvidersElement(this, {
                $container: this.elements.$container.$,
                style: 'gallery-providers',
                data: providers,
                current: currentProvider
            });
        },

        /**
         * Render gallery content
         * @memberOf GalleryView
         * @param provider
         * @param {Boolean} force
         * @returns {boolean}
         */
        renderContent: function renderContent(provider, force) {

            if (this.isCachedItems() && !force) {
                return false;
            }

            // clean content
            this.elements.$gallery.empty();

            /**
             * Define content
             * @type {{}}
             */
            this.elements.items = {};

            /**
             * Define provider data
             * @type {Array}
             */
            var data = (provider || {}).data || [];

            for (var i = 0, l = data.length; i < l; i++) {

                /**
                 * Render item
                 * @type {GalleryContentElement}
                 */
                var $item = new GalleryContentElement(this, {
                    style: 'content',
                    $container: this.elements.$gallery.$,
                    data: data[i]
                });

                this.elements.items[$item.id] = $item;
            }

            this.elements.$gallery.scrollCover(
                this.elements.$container.$
            );

            this.elements.$filter.updateData({
                items: this.elements.items,
                focusOn: 'input'
            });

            this.updateFooterContent();
        },

        /**
         * Update footer content
         * @memberOf GalleryView
         */
        updateFooterContent: function updateFooterContent() {
            this.renderFooter(Footer, this.elements.$gallery);
        },

        /**
         * Render gallery
         * @memberOf GalleryView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderGallery.bind(this)
            );
        }

    }, BaseView.prototype)

});