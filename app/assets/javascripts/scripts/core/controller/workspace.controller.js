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
        'modules/Preferences',
        'modules/Router'
    ],

    /**
     * Define WorkspaceController
     * @param {BaseController} BaseController
     * @param {BasePreferences} BasePreferences
     * @param {Router} Router
     * @returns {*}
     */
        function defineWorkspaceController(BaseController, BasePreferences, Router) {

        /**
         * Define workspace controller
         * @class WorkspaceController
         * @extends BaseController
         * @extends BasePreferences
         * @extends Router
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
                    var widget = this.controller.getWidgetByHashLocation(page);

                    var purl = page ?
                            this.controller.getItemIdentity(page) : '',

                        wurl = widget ?
                            '/' + page.controller.getItemIdentity(widget) : '';

                    this.controller.setHashLocation(
                        ''.concat(purl, wurl)
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
                            this.controller.swipeToCurrentPage(animate);
                            return false;
                        }

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

                        window.location.hash = '';
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
                    //console.log('TODO add widget implementation');
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
                },

                /**
                 * Save after page ordering
                 * @member WorkspaceController
                 * @param {Array} order
                 */
                afterPageOrder: function afterPageOrder(order) {
                    this.logger.debug('Page order', order);
                    this.controller.store();
                },

                /**
                 * Transfer preferences
                 * @member WorkspaceController
                 * @param {string} index
                 * @param value
                 */
                transferContentPreferences: function transferContentPreferences(index, value) {

                    this.observer.publish(
                        this.eventmanager.eventList.transferPreferences,
                        [index, value]
                    );
                },

                /**
                 * Load config preferences
                 * @member WorkspaceController
                 */
                loadPreferences: function loadPreferences() {

                    /**
                     * Get preferences
                     * @type {{}}
                     */
                    var prefs = this.model.getConfig('preferences');

                    $.each(prefs, function each(index, value) {

                        /**
                         * Define method name
                         * @type {string}
                         */
                        var setter = 'set' + index.toCamel().capitalize();

                        if (typeof(this.model[setter]) === 'function') {

                            this.model[setter](value);

                        } else {

                            this.logger.debug('Skip', setter);
                        }

                    }.bind(this));
                },

                /**
                 * Update site width
                 * @member WorkspaceController
                 */
                updateSiteWidth: function updateSiteWidth() {

                    /**
                     * Define element
                     * @type {WorkspaceElement}
                     */
                    var $workspace = this.view.elements.$workspace,
                        preferences = this.model.getConfig('preferences'),
                        width = 0;

                    if (preferences.staticWidth) {

                        // Get site widths
                        width = parseInt(preferences.siteWidthSlider, 10) || width;

                        $workspace.updateWidth(width);

                    } else {

                        $workspace.unsetWidth();
                    }
                },

                /**
                 * Load google analytics tracking snippet
                 * @member WorkspaceController
                 */
                loadTrackingSnippet: function loadTrackingSnippet() {

                    /**
                     * Get tracking id
                     * @type {string}
                     */
                    var trackingId = this.model.getConfig('preferences').trackingId;

                    if (typeof(trackingId) === 'string' && trackingId.length > 0) {

                        // Add tracking snippet
                        // http://stackoverflow.com/questions/6818814/issue-using-google-analytics-with-require-js
                    }
                }
            },

            BaseController.prototype,
            BasePreferences.prototype,
            Router.prototype
        );
    }
);