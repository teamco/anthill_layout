/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    ['modules/Controller'],

    /**
     * Define WorkspaceController
     * @param BaseController
     * @returns {*}
     */
        function defineWorkspaceController(BaseController) {

        /**
         * Define workspace controller
         * @class WorkspaceController
         * @extends BaseController
         * @constructor
         */
        var WorkspaceController = function WorkspaceController() {

        };

        return WorkspaceController.extend('WorkspaceController', {

            /**
             * Set page height
             * @member WorkspaceController
             */
            bindHashChange: function bindHashChange() {

                $(window).on(
                    'hashchange',
                    this.controller.switchPageOnHashChange.bind(this)
                );
            },

            /**
             * Switch page on hash change
             * @member WorkspaceController
             */
            switchPageOnHashChange: function switchPageOnHashChange() {

                var hash = window.location.hash,
                    pageMatch = hash.match(/page\/([\w\d\-]*):?/i),
                    widgetMatch = hash.match(/widget\/([\w\d\-]*):?/i);

                /**
                 * Get page
                 * @type {Page}
                 */
                var page = pageMatch ?
                    this.model.getItemByUUID(pageMatch[1]) :
                    this.controller.getCurrentItem();

                this.observer.publish(
                    this.eventmanager.eventList.switchToPage,
                    [page ? page : this.controller.getCurrentItem(), false]
                );
            },

            /**
             * Set page height
             * @member WorkspaceController
             */
            setPageContainerDimensions: function setPageContainerDimensions() {

                /**
                 * Get $pages
                 * @type {WorkspaceContentElement}
                 */
                var $pages = this.view.elements.$pages,
                    counter = this.model.getConfig('page/counter');

                $pages.defineHeight();
                $pages.defineWidth(counter);
            },

            /**
             * Adopt content width after adding new page
             * @member WorkspaceController
             */
            adoptContentWidth: function adoptContentWidth() {

                this.view.elements.$pages.adoptPagesWidth(
                    this.model.getItems(),
                    this.model.getConfig('page/counter')
                );
            },

            /**
             * Before Switch to page
             * @member WorkspaceController
             * @param {Page} page
             */
            beforeSwitchToPage: function beforeSwitchToPage(page) {
                this.logger.debug('Before switch to page', page);

                this.switchPage = true;
                window.location.hash = 'page/' + page.model.getUUID();
            },

            /**
             * Switch to page
             * @member WorkspaceController
             * @param {Page} page
             * @param {boolean} animate
             * @returns {boolean|*}
             */
            switchToPage: function switchToPage(page, animate) {

                if (this.switchPage) {
                    return false;
                }

                this.observer.publish(
                    this.eventmanager.eventList.beforeSwitchToPage,
                    page
                );

                if (page === this.controller.getCurrentItem()) {
                    this.logger.debug('Page already current', page);
                    this.controller.swipeToCurrentPage(animate);
                    return false;
                }

                if (page && this.items.hasOwnProperty(page.model.getUUID())) {

                    /**
                     * Get all items
                     * @type {*}
                     */
                    var items = this.model.getItems(),
                        index;

                    for (index in items) {

                        if (items.hasOwnProperty(index)) {

                            /**
                             * Define item
                             * @type {Page}
                             */
                            var item = items[index];

                            if (item.model.getUUID() === page.model.getUUID()) {

                                this.controller.setCurrentItem(page);
                            }
                        }
                    }

                    this.controller.swipeToCurrentPage(animate);

                } else {

                    this.logger.warn('Undefined page', page);
                    return false;
                }
            },

            /**
             * After Switch to page
             * @member WorkspaceController
             * @param {Page} page
             */
            afterSwitchToPage: function afterSwitchToPage(page) {
                this.logger.debug('After switch to page', page);
                this.switchPage = false;
            },

            /**
             * Swipe to current page
             * @member WorkspaceController
             * @param {boolean} animate
             */
            swipeToCurrentPage: function swipeToCurrentPage(animate) {

                /**
                 * Get current page
                 * @type {Page}
                 */
                var page = this.getCurrentItem();

                this.scope.view.elements.$pages.swipeTo(page, animate);
            }


        }, BaseController.prototype);
    }
);