/**
 * Created by i061485 on 6/10/14.
 */

define(function defineRouter() {

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
         * Define hash page matcher
         * @memberOf Router
         * @returns {Array|{index: number, input: string}}
         */
        isPageMatch2Hash: function isPageMatch2Hash() {
            return this.getHashLocation().match(/#\/([^+(\/)]*):?/i);
        },

        /**
         * Define hash widget matcher
         * @memberOf Router
         * @returns {Array|{index: number, input: string}}
         */
        isWidgetMatch2Hash: function isWidgetMatch2Hash() {
            return this.getHashLocation().match(/#\/([^+]*)\/([^+]*):?/i);
        },

        /**
         * Get page by hash
         * @memberOf Router
         * @param {Workspace} workspace
         * @returns {Page}
         */
        getPageByHashLocation: function getPageByHashLocation(workspace) {

            /**
             * Match regex
             * @type {Array|{index: number, input: string}|*}
             */
            var pageMatch = this.isPageMatch2Hash();

            /**
             * Get workspace
             * @type {Workspace}
             */
            workspace = workspace || this.getWorkspace();

            /**
             * Get current page
             * @type {Page}
             */
            var currentPage = workspace.model.getCurrentItem();

            /**
             * Get page
             * @type {Page}
             */
            var page = pageMatch ?
                (workspace.model.getItemByTitle(pageMatch[1]) ||
                workspace.model.getItemByUUID(pageMatch[1])) :
                currentPage;

            if (typeof(page) === 'undefined') {

                workspace.observer.publish(
                    workspace.eventmanager.eventList.switchToPage,
                    currentPage
                );

                /**
                 * Define page as current
                 * @type {Page}
                 */
                page = currentPage;
            }

            return page;
        },

        /**
         * Get widget by hash
         * @memberOf Router
         * @param {Page} page
         * @returns {Widget|*}
         */
        getWidgetByHashLocation: function getWidgetByHashLocation(page) {

            /**
             * Match regex
             * @type {Array|{index: number, input: string}}
             */
            var widgetMatch = this.isWidgetMatch2Hash();

            /**
             * Get widget
             * @type {*|Widget}
             */
            var widget = widgetMatch ?
                (page.model.getItemByTitle(widgetMatch[2]) ||
                page.model.getItemByUUID(widgetMatch[2])) :
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
                    '/', hash, '/',
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
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this.controller.getWorkspace();

            /**
             * Get page
             * @type {Page}
             */
            var page = this.controller.getPageByHashLocation.bind(
                workspace.controller
            )(workspace);

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

            return item.model.getItemTitle().toClassName();
        }
    });
});