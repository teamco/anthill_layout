/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'plugins/preferences/preferences',
    'element/header.element',
    'element/footer.element',
    'plugins/page.data/element/page.data.content.element',
    'plugins/page.data/element/page.data.element'
], function definePageDataView(BaseView, BasePreferences, Header, Footer, PageDataContent, PageData) {

    /**
     * Define view
     * @class PageDataView
     * @constructor
     * @extends BaseView
     * @extends BasePreferences
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

            this.header(Header, this.elements.$container).setText(
                'Page Widgets'
            );

            /**
             * Define PageData element
             * @type {PageDataElement}
             */
            this.elements.$pagedata = new PageData(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$
            });

            this.footer(Footer, this.elements.$container).setHtml(
                this.elements.$pagedata.getFooter()
            );
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
                     * @type {*}
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

            this.openPreferences({
                config: config,
                $html: this.controller.getPreferences(config.uuid).$,
                style: [
                    config.preferences.resource,
                    'widget-prefs preferences'
                ].join(' '),
                title: 'Widget preferences'
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

    }, BaseView.prototype, BasePreferences.prototype)

});