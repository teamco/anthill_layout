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
    'plugins/gallery/element/gallery.content.element',
    'plugins/gallery/element/gallery.element'
], function defineGalleryView(BaseView, Header, Footer, GalleryContent, Gallery) {

    var View = function View() {
    };

    return View.extend({

        /**
         * Render Gallery
         */
        renderGallery: function renderGallery() {

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

            this.footer(Footer, this.elements.$container);
        },

        /**
         * Render gallery content
         */
        renderContent: function renderContent(data) {

            /**
             * Define content
             * @type {{}}
             */
            this.elements.content = {};

            var index;

            for (index in data) {

                if (data.hasOwnProperty(index)) {

                    /**
                     * Render item
                     * @type {plugins.gallery.element.gallery.content.element}
                     */
                    var $item = new GalleryContent(this, {
                        style: 'content',
                        $container: this.elements.$gallery.$,
                        data: data[index]
                    });

                    this.elements.content[$item.id] = $item;
                }
            }
        },

        /**
         * Render gallery
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderGallery.bind(this)
            );
        }

    }, BaseView.prototype)

});