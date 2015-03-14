/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define(
    [
        'config/anthill',
        'modules/Controller',
        'modules/Page',
        'modules/Preferences',
        'modules/Router',
        'controller/page/page.layer',
        'controller/page/page.layout',
        'controller/page/page.widget',
        'controller/page/page.maximize'
    ],
    function definePageController(AntHill, BaseController, BasePage, BasePreferences, Router, PageLayer, PageLayout, PageWidget, PageItemMaximize) {

        /**
         * Define page controller
         * @class PageController
         * @extends {BaseController} BaseController
         * @extends {AntHill} AntHill
         * @extends {BasePage} BasePage
         * @extends {BasePreferences} BasePreferences
         * @extends {Router} Router
         * @extends {PageLayer} PageLayer
         * @extends {PageLayout} PageLayout
         * @extends {PageWidget} PageWidget
         * @extends {PageItemMaximize} PageItemMaximize
         * @constructor
         */
        var PageController = function PageController() {
        };

        return PageController.extend(
            'PageController', {

                /**
                 * Transfer preferences
                 * @member PageController
                 * @param {string} index
                 * @param value
                 */
                transferContentPreferences: function transferContentPreferences(index, value) {
                    this.logger.debug('Preferences successfully transferred', index, value);
                },

                /**
                 * Load config preferences
                 * @member PageController
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
                 * Get content loaded
                 * @member PageController
                 * @return {boolean}
                 */
                isLoadedContent: function isLoadedContent() {
                    return this.scope.contentLoaded;
                },

                /**
                 * Define content loaded setter
                 * @member PageController
                 * @param {boolean} loaded
                 */
                setLoadedContent: function setLoadedContent(loaded) {

                    /**
                     * Define content loaded
                     * @member Page
                     * @type {boolean}
                     */
                    this.contentLoaded = !!loaded;
                    this.view.get$item().hideLoader();
                },

                /**
                 * Check if page lazy loaded
                 * @member PageController
                 * @returns {boolean}
                 */
                isLazyLoaded: function isLazyLoaded() {
                    return !!this.model.getConfig('preferences').lazyLoading;
                },

                /**
                 * Check if page is current
                 * @member PageController
                 * @returns {Page}
                 */
                isCurrent: function isCurrent() {

                    /**
                     * Define page matcher
                     * @type {Array|{index: number, input: string}}
                     */
                    var pageMatch = this.isPageMatch2Hash();

                    if (pageMatch) {
                        if (pageMatch[1] === this.model.getItemTitle()) {
                            return this.scope;
                        }
                    }
                }
            },

            AntHill.prototype,
            BaseController.prototype,
            BasePage.prototype,
            BasePreferences.prototype,
            PageLayer.prototype,
            PageLayout.prototype,
            PageWidget.prototype,
            PageItemMaximize.prototype,
            Router.prototype
        );
    }
);