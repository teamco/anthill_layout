/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/header.element',
    'element/footer.element',
    'plugins/widgets/page.tabs/element/page.tabs.element',
    'plugins/widgets/page.tabs/element/page.tabs.preferences.element',
    'plugins/widgets/page.tabs/element/page.tabs.rules.element'
], function definePageTabsView(BaseView, Header, Footer, PageTabsElement, PageTabsPreferencesElement, PageTabsRulesElement) {

    /**
     * Define view
     * @class PageTabsView
     * @extends BaseView
     * @constructor
     */
    var PageTabsView = function PageTabsView() {
    };

    return PageTabsView.extend('PageTabsView', {

        /**
         * Render page.tabs element
         * @member PageTabsView
         */
        renderPageTabs: function renderPageTabs() {

            this.header(Header, this.elements.$container);

            /**
             * Define $page.tabs
             * @type {PageTabsElement}
             */
            this.elements.$pagetabs = new PageTabsElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);
        },

        /**
         * Render Prefs
         * @member PageTabsView
         * @returns {PageTabsPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define PageTabs Preferences Element
             * @type {PageTabsPreferencesElement}
             */
            this.elements.$preferences = new PageTabsPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member PageTabsView
         * @param widgetRules
         * @param contentRules
         * @returns {PageTabsRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define PageTabs Rules Element
             * @type {PageTabsRulesElement}
             */
            this.elements.$rules = new PageTabsRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render page.tabs
         * @member PageTabsView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPageTabs.bind(this)
            );
        }

    }, BaseView.prototype)

});