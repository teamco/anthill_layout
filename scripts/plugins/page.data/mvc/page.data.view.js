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
    'plugins/page.data/element/page.data.content.element',
    'plugins/page.data/element/page.data.element'
], function definePageDataView(BaseView, Header, Footer, PageDataContent, PageData) {

    /**
     * Define view
     * @class View
     * @constructor
     */
    var View = function View() {
    };

    return View.extend({

        /**
         * Render PageData
         * @returns {boolean}
         */
        renderPageData: function renderPageData() {

            if (this.isCached('$pagedata', PageData)) {
                return false;
            }

            this.header(Header, this.elements.$container);

            /**
             * Define PageData element
             * @type {element.page.page.element}
             */
            this.elements.$pagedata = new PageData(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$
            });

            this.footer(Footer, this.elements.$container);
        },

        /**
         * Render page.data content
         * @param data
         * @param {Boolean} force
         * @returns {boolean}
         */
        renderContent: function renderContent(data, force) {

            if (this.isCachedItems(force) && this.controller.isUpdate(data, this.elements.items)) {
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
                     * @type {plugins.page.data.element.page.data.content.element}
                     */
                    var $item = new PageDataContent(this, {
                        style: 'content',
                        id: [
                            data[index].model.getConfig('uuid'),
                            'view'
                        ].join('-'),
                        $container: this.elements.$pagedata.$,
                        data: data[index]
                    });

                    this.elements.items[$item.id] = $item;
                }
            }
        },

        /**
         * Render page.data
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPageData.bind(this)
            );
        }

    }, BaseView.prototype)

});