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

    /**
     * Define view
     * @class View
     * @constructor
     * @extends BaseView
     */
    var View = function View() {
    };

    return View.extend({

        /**
         * Render Gallery
         * @member View
         * @returns {boolean}
         */
        renderGallery: function renderGallery() {

            if (this.isCached('$gallery', Gallery)) {
                return false;
            }

            this.header(Header, this.elements.$container);

            /**
             * Define Gallery element
             * @type {element.page.page.element}
             */
            this.elements.$gallery = new Gallery(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$
            });

            this.footer(Footer, this.elements.$container);
        },

        /**
         * Render gallery content
         * @member View
         * @param data
         * @param {Boolean} force
         * @returns {boolean}
         */
        renderContent: function renderContent(data, force) {

            if (this.isCachedItems(force)) {
                return false;
            }

            /**
             * Define content
             * @type {{}}
             */
            this.elements.items = {};

            for (var index in data) {

                if (data.hasOwnProperty(index)) {

                    /**
                     * Render item
                     * @type {*}
                     */
                    var $item = new GalleryContent(this, {
                        style: 'content',
                        $container: this.elements.$gallery.$,
                        data: data[index]
                    });

                    this.elements.items[$item.id] = $item;
                }
            }
        },

        /**
         * Render gallery
         * @member View
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderGallery.bind(this)
            );
        }

    }, BaseView.prototype)

});