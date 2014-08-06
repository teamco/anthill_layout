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
         * @memberOf Router
         * @returns {string}
         */
        getHashLocation: function getHashLocation() {
            return window.location.hash;
        },

        /**
         * Set Hash location
         * @memberOf Router
         */
        setHashLocation: function setHashLocation(hash) {
            window.location.hash = hash;
        },

        /**
         * Set page by hash location
         * @memberOf Router
         * @param {Page} page
         */
        setPageByHashLocation: function setPageByHashLocation(page) {

            /**
             * Define hash
             * @type {*|String|string}
             */
            var hash = this.getItemIdentity(page) || '';

            this.setHashLocation(hash);
        },

        /**
         * Get page by hash
         * @memberOf Router
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
         * @memberOf Router
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
                (page.model.getItemByTitle(widgetMatch[1]) ||
                    page.model.getItemByUUID(widgetMatch[1])) :
                null;

            return widget;
        },

        /**
         * Update hash on widget maximize
         * @memberOf Router
         * @param {Widget} widget
         */
        updateHashOnMaximize: function updateHashOnMaximize(widget) {

            /**
             * Get hash location
             * @type {string}
             */
            var hash = this.controller.getItemIdentity(
                widget.controller.getContainment()
            );

            this.controller.setHashLocation(
                ''.concat(
                    hash, '/',
                    this.controller.getItemIdentity(widget)
                )
            );
        },

        /**
         * Update hash on widget reduce
         * @memberOf Router
         * @param {Widget} widget
         */
        updateHashOnReduce: function updateHashOnReduce(widget) {

            /**
             * Get page
             * @type {Page}
             */
            var page = this.controller.getPageByHashLocation.bind(
                this.controller.getWorkspace().controller
            )();

            this.controller.setPageByHashLocation(page);
        },

        /**
         * Get item identity
         * @memberOf BaseController
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

            var title = item.model.getConfig('preferences').title;

            if (title) {
                return title.toClassName();
            }

            return item.model.getUUID();
        }
    });
});