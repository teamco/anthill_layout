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
    'plugins/pages/element/pages.content.element',
    'plugins/pages/element/pages.preferences.element',
    'plugins/pages/element/pages.element'
], function definePagesView(BaseView, BasePreferences, Header, Footer, PagesContent, PagesPreferencesElement, Pages) {

    /**
     * Define view
     * @class PagesView
     * @extends BaseView
     * @constructor
     */
    var PagesView = function PagesView() {
    };

    return PagesView.extend('PagesView', {

        /**
         * Render Pages
         * @member PagesView
         * @returns {boolean}
         */
        renderPages: function renderPages() {

            if (this.isCached('$pages', Pages)) {
                return false;
            }

            this.header(Header, this.elements.$container).setText(
                'Workspace Pages'
            );

            /**
             * Define Pages element
             * @type {PagesElement}
             */
            this.elements.$pages = new Pages(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$
            });

            this.footer(Footer, this.elements.$container).setHtml(
                this.elements.$pages.getFooter()
            );
        },

        /**
         * Render pages content
         * @member PagesView
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
                     * @type {*}
                     */
                    var $item = new PagesContent(this, {
                        style: 'content',
                        id: data[index].model.getConfig('uuid') + '-pages-view',
                        $container: this.elements.$pages.$,
                        data: data[index]
                    });

                    this.elements.items[$item.id] = $item;
                }
            }
        },

        /**
         * Show preferences
         * @member PagesView
         * @param config
         */
        showPreferences: function showPreferences(config) {

            /**
             * Define scope
             * @type {Pages}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.setActiveContent,
                config.uuid
            );

            this.openPreferences({
                config: config,
                $html: this.controller.definePreferences(config.uuid).$,
                style: 'pages-prefs preferences',
                title: 'Page preferences'
            });
        },

        /**
         * Render Prefs
         * @member PagesView
         * @param {Page} page
         * @returns {PagesPreferencesElement}
         */
        renderPreferences: function renderPreferences(page) {

            /**
             * Define Pages Preferences Element
             * @type {PagesPreferencesElement}
             */
            this.elements.$preferences = new PagesPreferencesElement(this, {
                data: this.controller.getPreferences(),
                page: page
            });

            return this.elements.$preferences;
        },

        /**
         * Render pages
         * @member PagesView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPages.bind(this)
            );
        }

    }, BaseView.prototype, BasePreferences.prototype)

});