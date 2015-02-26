/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/26/15
 * Time: 12:41 PM
 */

define([], function defineWorkspacePage() {

    /**
     * Define WorkspacePage controller
     * @class WorkspacePage
     * @constructor
     */
    var WorkspacePage = function WorkspacePage() {
    };

    return WorkspacePage.extend(
        'WorkspacePage', {

            /**
             * Set page height
             * @member WorkspacePage
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
             * Switch page on hash change
             * @member WorkspacePage
             */
            switchPageOnHashChange: function switchPageOnHashChange() {

                /**
                 * Define scope
                 * @type {Workspace}
                 */
                var scope = this.scope;

                scope.observer.publish(
                    scope.eventmanager.eventList.switchToPage,
                    this.getPageByHashLocation(scope)
                );
            },

            /**
             * Update pages width
             * @member WorkspacePage
             */
            updatePagesWidth: function updatePagesWidth() {

                /**
                 * Get all pages
                 * @type {object}
                 */
                var pages = this.model.getItems(),
                    index, page;

                for (index in pages) {
                    if (pages.hasOwnProperty(index)) {

                        /**
                         * Get page
                         * @type {Page}
                         */
                        page = pages[index];

                        page.layout.observer.publish(
                            page.layout.eventmanager.eventList.updateMinCellWidth
                        );
                    }
                }
            },

            /**
             * Before Switch to page
             * @member WorkspacePage
             * @param {Page} page
             */
            beforeSwitchToPage: function beforeSwitchToPage(page) {

                this.logger.debug('Before switch to page', page);

                this.switchPage = true;

                /**
                 * Get widget
                 * @type {Widget|*}
                 */
                var widget = this.controller.getWidgetByHashLocation(page);

                var purl = page ?
                        this.controller.getItemIdentity(page) : '',

                    wurl = widget ?
                    '/' + page.controller.getItemIdentity(widget) : '';

                this.controller.setHashLocation(
                    ''.concat('/', purl, wurl)
                );
            },

            /**
             * Switch to page
             * @member WorkspacePage
             * @param {Page} page
             * @returns {boolean|*}
             */
            switchToPage: function switchToPage(page) {

                if (page && page.model && this.items.hasOwnProperty(page.model.getUUID())) {

                    if (this.switchPage) {

                        this.logger.debug('Page under swipe', page);
                        return false;
                    }

                    this.observer.publish(
                        this.eventmanager.eventList.beforeSwitchToPage,
                        page
                    );

                    if (page === this.controller.getCurrentItem()) {
                        this.logger.debug('Page already current', page);
                    } else {
                        this.logger.debug('Swipe to page', page);
                        this.controller.setCurrentItem(page);
                    }

                    this.controller.swipeToCurrentPage();

                } else {

                    window.location.hash = '';
                    this.logger.warn('Undefined page', page);
                    return false;
                }
            },

            /**
             * After Switch to page
             * @member WorkspacePage
             * @param {Page} page
             */
            afterSwitchToPage: function afterSwitchToPage(page) {

                this.logger.debug('After switch to page', page);

                this.switchPage = false;

                //this.getWidgetByHashLocation()
                //console.log('TODO add widget implementation');
            },

            /**
             * Swipe to current page
             * @member WorkspacePage
             */
            swipeToCurrentPage: function swipeToCurrentPage() {

                /**
                 * Get current page
                 * @type {Page}
                 */
                var page = this.getCurrentItem();

                /**
                 * Define local scope
                 * @type {Workspace}
                 */
                var scope = this.scope;

                scope.view.elements.$pages.swipeTo(page);
                scope.observer.publish(
                    scope.eventmanager.eventList.updateMetaData,
                    page
                );

                page.observer.publish(
                    page.eventmanager.eventList.loadItemsContent
                );
            },

            /**
             * Check if load page content
             * @member WorkspacePage
             * @returns {Page}
             */
            isLoadPageContent: function isLoadPageContent() {

                /**
                 * Get current page from hash
                 * @type {Page}
                 */
                var page = this.getPageByHashLocation(this.scope);

                if (page.controller.isCurrent() ||
                    page.controller.isLazyLoaded()) {
                    return page;
                }
            },

            /**
             * Save after page ordering
             * @member WorkspacePage
             * @param {Array} order
             */
            afterPageOrder: function afterPageOrder(order) {
                this.logger.debug('Page order', order);
                this.controller.store();
            }
        }
    );
});