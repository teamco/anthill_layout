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
    'plugins/pages/element/pages.content.element',
    'plugins/pages/element/pages.element'
], function definePagesView(BaseView, Header, Footer, PagesContent, Pages) {

    /**
     * Define view
     * @class View
     * @constructor
     */
    var View = function View() {
    };

    return View.extend({

        /**
         * Render Pages
         * @returns {boolean}
         */
        renderPages: function renderPages() {

            if (this.isCached('$pages', Pages)) {
                return false;
            }

            this.header(Header, this.elements.$container);

            /**
             * Define Pages element
             * @type {element.page.page.element}
             */
            this.elements.$pages = new Pages(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$
            });

            this.footer(Footer, this.elements.$container);
        },

        /**
         * Render pages content
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

            var index;

            for (index in data) {

                if (data.hasOwnProperty(index)) {

                    /**
                     * Render item
                     * @type {plugins.pages.element.pages.content.element}
                     */
                    var $item = new PagesContent(this, {
                        style: 'content',
                        $container: this.elements.$pages.$,
                        data: data[index]
                    });

                    this.elements.items[$item.id] = $item;
                }
            }
        },

        /**
         * Render pages
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPages.bind(this)
            );
        }

    }, BaseView.prototype)

});