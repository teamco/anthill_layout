/**
 * Created by i061485 on 6/10/14.
 */

define([

], function defineRouter() {

    /**
     * Define router
     * class Router
     * @constructor
     */
    var Router = function Router() {

        /**
         * Define routes urls
         * @type {{create: string, update: string}}
         */
        this.routes = {
            create: '/author/sites',
            update: '/author/sites/{id}',
            store: '/author/history/{id}'
        };
    };

    return Router.extend('Router', {

        /**
         * Get Hash location
         * @member Router
         * @returns {string}
         */
        getHashLocation: function getHashLocation() {
            return window.location.hash;
        },

        /**
         * Get page by hash
         * @member Router
         * @returns {Page}
         */
        getPageByHashLocation: function getPageByHashLocation() {

            /**
             * Define hash
             * @type {string}
             */
            var hash = this.getHashLocation();

            /**
             * Match regex
             * @type {Array|{index: number, input: string}|*}
             */
            var pageMatch = hash.match(/#([\w\d\-]*):?/i);

            /**
             * Get current page
             * @type {Page}
             */
            var currentPage = this.getCurrentItem();

            /**
             * Get page
             * @type {Page}
             */
            var page = pageMatch ?
                (this.model.getItemByTitle(pageMatch[1]) ||
                    this.model.getItemByUUID(pageMatch[1])) :
                currentPage;

            return page || currentPage;
        },

        /**
         * Get widget by hash
         * @member Router
         * @param {Page} page
         * @returns {Widget|*}
         */
        getWidgetByHashLocation: function getWidgetByHashLocation(page) {

            /**
             * Define hash
             * @type {string}
             */
            var hash = this.getHashLocation();

            /**
             * Match regex
             * @type {Array|{index: number, input: string}}
             */
            var widgetMatch = hash.match(/\/([\w\d\-]*):?/i);

            /**
             * Get widget
             * @type {*|Widget}
             */
            var widget = widgetMatch ?
                page.model.getItemByUUID(widgetMatch[1]) :
                null;

            return widget;
        },

        /**
         * Get item identity
         * @member BaseController
         * @param {Page|Widget} item
         * @returns {*|String}
         */
        getItemIdentity: function getItemIdentity(item) {

            /**
             * Define item
             * @type {*}
             */
            item = this.scope.base.define(item, {}, true);

            if (!item.model) {
                return false;
            }

            var title = item.model.getPrefs('title');

            if (title) {
                return title.toClassName();
            }

            return item.model.getUUID();
        }
    });
});