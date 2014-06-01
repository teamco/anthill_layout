/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    ['modules/controller'],

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
            },

            /**
             * Switch to page
             * @member WorkspaceController
             * @param {Page} page
             * @returns {boolean|*}
             */
            switchToPage: function switchToPage(page) {

                this.observer.publish(
                    this.eventmanager.eventList.beforeSwitchToPage,
                    page
                );

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
                this.controller.swipeToCurrentPage();
            },

            /**
             * Swipe to current page
             * @member WorkspaceController
             */
            swipeToCurrentPage: function swipeToCurrentPage() {

                /**
                 * Get current page
                 * @type {Page}
                 */
                var page = this.getCurrentItem();

                this.scope.view.elements.$pages.swipeTo(page);
            }


        }, BaseController.prototype);
    }
);