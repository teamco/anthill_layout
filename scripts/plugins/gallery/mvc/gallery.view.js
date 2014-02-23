/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/header.element',
    'element/footer.element',
    'plugins/gallery/element/gallery.container.element',
    'plugins/gallery/element/gallery.content.element',
    'plugins/gallery/element/gallery.tab.element',
    'plugins/gallery/element/gallery.element'
], function defineGalleryView(BaseView, Header, Footer, GalleryContainer, GalleryContent, GalleryTab, Gallery) {

    var View = function View() {
    };

    return View.extend({

        /**
         * Render container
         */
        renderGalleryContainer: function renderGalleryContainer() {

            /**
             * Define container
             * @type {plugins.gallery.element.gallery.container.element}
             */
            this.elements.$container = new GalleryContainer(this, {
                $container: 'body',
                style: 'gallery-container'
            });
        },

        /**
         * Render tab to open/close gallery
         */
        renderTab: function renderTab() {

            /**
             * Define container
             * @type {plugins.gallery.element.gallery.container.element}
             */
            this.elements.$tab = new GalleryTab(this, {
                $container: this.elements.$container.$,
                style: 'tab'
            });
        },

        /**
         * Render Gallery
         */
        renderGallery: function renderGallery() {

            this.renderGalleryContainer();

            this.header(Header, this.elements.$container);

            /**
             * Define local width
             */
            var width = this.scope.model.getConfig('html').width;

            /**
             * Define Gallery element
             * @type {element.page.page.element}
             */
            this.elements.$gallery = new Gallery(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$,
                maxWidth: width.max,
                minWidth: width.min
            });

            this.renderTab();
            this.content();
            this.footer(Footer, this.elements.$container);
        },

        /**
         * Render gallery content
         */
        content: function content() {

            /**
             * Define content
             * @type {plugins.gallery.element.gallery.element}
             */
            this.elements.$content = new GalleryContent(this, {
                style: 'content',
                $container: this.elements.$gallery.$
            });
        },

        /**
         * Render gallery
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered
            );
        }

    }, BaseView.prototype)

});