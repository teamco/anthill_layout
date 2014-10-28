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
         * Set Hash location
         * @member Router
         */
        setHashLocation: function setHashLocation(hash) {
            window.location.hash = hash;
        },

        /**
         * Set page by hash location
         * @member Router
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
            var pageMatch = hash.match(/#\/([\w\d\-]*):?/i);

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
                (page.model.getItemByTitle(widgetMatch[1]) ||
                    page.model.getItemByUUID(widgetMatch[1])) :
                null;

            return widget;
        },

        /**
         * Update hash on widget maximize
         * @member Router
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
         * @member Router
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

            return item.model.getItemTitle().toClassName();
        }
    });
});