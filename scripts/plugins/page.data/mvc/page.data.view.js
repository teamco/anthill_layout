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
     * @class PageDataView
     * @constructor
     * @extends BaseView
     */
    var PageDataView = function PageDataView() {
    };

    return PageDataView.extend('PageDataView', {

        /**
         * Render PageData
         * @member PageDataView
         * @returns {boolean}
         */
        renderPageData: function renderPageData() {

            if (this.isCached('$pagedata', PageData)) {
                return false;
            }

            this.header(Header, this.elements.$container);

            /**
             * Define PageData element
             * @type {PageDataElement}
             */
            this.elements.$pagedata = new PageData(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$
            });

            this.footer(Footer, this.elements.$container);
        },

        /**
         * Render page.data content
         * @member PageDataView
         * @param data
         * @param {Boolean} force
         * @returns {boolean}
         */
        renderContent: function renderContent(data, force) {

            /**
             * Check if content was updated
             * @type {boolean}
             */
            var update = this.controller.isUpdate(
                data,
                this.elements.items
            );

            if (this.isCachedItems(force) && update) {
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
                     * @type {PageDataContentElement}
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
         * Show preferences
         * @member PageDataView
         * @param config
         */
        showPreferences: function showPreferences(config) {

            /**
             * Define $container
             * @type {$}
             */
            var $container = this.controller.getPage().view.elements.$page.$;

            /**
             * Define $html
             * @type {$}
             */
            var $html = this.controller.getPreferences(config.uuid).$;

            this.modalDialog({
                style: [
                    config.preferences.resource,
                    'preferences'
                ].join(' '),
                $container: $container,
                type: 'info',
                title: 'Widget preferences',
                text: 'bla',
                html: $html,
                cover: true,
                autoclose: true,
                buttons: {
                    approve: {
                        text: 'OK',
                        events: {
                            click: 'approveUpdatePreferences'
                        }
                    },
                    reject: {
                        text: 'Cancel',
                        events: {
                            click: 'rejectModalEvent'
                        }
                    }
                }
            });
        },

        /**
         * Render page.data
         * @member PageDataView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPageData.bind(this)
            );
        }

    }, BaseView.prototype)

});