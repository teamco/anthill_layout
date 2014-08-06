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
    'plugins/gallery/element/gallery.search.element',
    'plugins/gallery/element/gallery.content.element',
    'plugins/gallery/element/gallery.element'
], function defineGalleryView(BaseView, Header, Footer, GalleryProviders, GallerySearch, GalleryContent, Gallery) {

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

            if (this.isCached('$gallery', Gallery)) {
                return false;
            }

            this.header(Header, this.elements.$container).setText(
                'Gallery Widgets'
            );

            this.renderSearch();

            this.renderProviders(
                this.controller.getData(),
                this.controller.getCurrentProvider()
            );

            /**
             * Define Gallery element
             * @type {GalleryElement}
             */
            this.elements.$gallery = new Gallery(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$
            });
        },

        /**
         * Render footer
         * @memberOf GalleryView
         */
        renderFooter: function renderFooter() {
            this.footer(Footer, this.elements.$container).setHtml(
                this.elements.$gallery.getFooter()
            );
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
            this.elements.$providers = new GalleryProviders(this, {
                $container: this.elements.$container.$,
                style: 'gallery-providers',
                data: providers,
                current: currentProvider
            });
        },

        /**
         * Render gallery search
         * @memberOf GalleryView
         * @returns {boolean}
         */
        renderSearch: function renderSearch() {

            if (this.isCached('$search', GallerySearch)) {
                return false;
            }

            /**
             * Define Gallery element
             * @type {GallerySearchElement}
             */
            this.elements.$search = new GallerySearch(this, {
                $container: this.elements.$container.$,
                style: 'gallery-search'
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
             */
            var data = provider.data;

            for (var i = 0, l = data.length; i < l; i++) {

                /**
                 * Render item
                 * @type {GalleryContentElement}
                 */
                var $item = new GalleryContent(this, {
                    style: 'content',
                    $container: this.elements.$gallery.$,
                    data: data[i]
                });

                this.elements.items[$item.id] = $item;
            }

            this.elements.$gallery.scrollCover(
                this.elements.$container.$
            );

            this.renderFooter();
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