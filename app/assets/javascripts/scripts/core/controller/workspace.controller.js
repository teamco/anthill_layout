/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    [
        'modules/Controller',
        'modules/Router'
    ],

    /**
     * Define WorkspaceController
     * @param BaseController
     * @returns {*}
     */
        function defineWorkspaceController(BaseController, Router) {

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

                this.observer.publish(
                    this.eventmanager.eventList.switchToPage, [
                        this.controller.getPageByHashLocation(),
                        false
                    ]
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

                /**
                 * Get widget
                 * @type {Widget|*}
                 */
                var widget= this.controller.getWidgetByHashLocation();

                var purl = page ? [
                        'page/',
                        this.controller.getItemIdentity(page)
                    ] : [],

                    wurl = widget ? [
                        '/widget/',
                        this.controller.getItemIdentity(widget)
                    ] : [];

                window.location.hash = ''.concat(
                    purl.join(''),
                    wurl.join('')
                );
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

                //this.getWidgetByHashLocation()
                console.log('TODO add widget implementation');
            },

            /**
             * Swipe to current page
             * @member WorkspaceController
             * @param {boolean} animate
             * @param {*|Widget} widget
             */
            swipeToCurrentPage: function swipeToCurrentPage(animate, widget) {

                /**
                 * Get current page
                 * @type {Page}
                 */
                var page = this.getCurrentItem();

                this.scope.view.elements.$pages.swipeTo(page, animate, widget);
            }


        }, BaseController.prototype, Router.prototype);
    }
);