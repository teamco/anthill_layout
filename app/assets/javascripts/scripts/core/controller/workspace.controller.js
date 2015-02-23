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
                 * Create authoring panel
                 * @member WorkspaceController
                 */
                createAuthorPanel: function createAuthorPanel() {
                    this.logger.debug('Create authoring panel', arguments);
                },

                /**
                 * Create tool panel
                 * @member WorkspaceController
                 */
                createToolPanel: function createToolPanel() {
                    this.logger.debug('Create tool panel', arguments);
                },

                /**
                 * Set page height
                 * @member WorkspaceController
                 */
                bindHashChange: function bindHashChange() {

                    $(window).on(
                        'hashchange',
                        this.controller.switchPageOnHashChange.bind(
                            this.controller
                        )
                    );
                },

                /**
                 * Switch page on hash change
                 * @member WorkspaceController
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
                 * Update pages width
                 * @member WorkspaceController
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
                        ''.concat('/', purl, wurl)
                    );
                },

                /**
                 * Switch to page
                 * @member WorkspaceController
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
                 * Update metadata
                 * @member WorkspaceController
                 * @param {Page} page
                 */
                updateMetaData: function updateMetaData(page) {

                    this.observer.batchPublish(
                        this.eventmanager.eventList.updateSiteTitle
                    );

                    page.observer.batchPublish(
                        page.eventmanager.eventList.updateSiteDescription,
                        page.eventmanager.eventList.updateSiteKeywords
                    );
                },

                /**
                 * Update site title
                 * @member WorkspaceController
                 */
                updateSiteTitle: function updateSiteTitle() {

                    /**
                     * Define $item
                     * @type {WorkspaceElement}
                     */
                    var $item = this.view.get$item();

                    var siteTitle = this.model.getConfig('preferences')['siteTitle'] ||
                        $item.getSiteTitle();
                    /**
                     * Get current page
                     * @type {Page}
                     */
                    var page = this.controller.getCurrentItem(),
                        title = siteTitle;

                    if (page.model) {

                        /**
                         * Get page title
                         * @type {string}
                         */
                        var pageTitle = page.model.getItemTitle();

                        /**
                         * Define SEO title
                         * @type {string}
                         */
                        title = pageTitle && (pageTitle + '').length > 0 ?
                            [pageTitle, siteTitle].join(
                                this.model.getConfig('SEOSeparator')
                            ) : siteTitle;
                    }

                    $item.setSiteTitle(title);
                },

                /**
                 * Update site author
                 * @member WorkspaceController
                 */
                updateSiteAuthor: function updateSiteAuthor() {

                    /**
                     * Define $item
                     * @type {WorkspaceElement}
                     */
                    var $item = this.view.get$item();

                    var siteAuthor = this.model.getConfig('preferences')['siteAuthor'] ||
                        $item.getSiteAuthor();

                    $item.setSiteAuthor(siteAuthor);
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

                        this.view.get$item().renderGoogleAnalytics(trackingId);
                    }
                }
            },

            BaseController.prototype,
            BasePreferences.prototype,
            Router.prototype
        );
    }
);