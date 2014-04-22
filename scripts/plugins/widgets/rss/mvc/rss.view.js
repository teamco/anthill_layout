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
    'plugins/widgets/rss/element/rss.element',
    'plugins/widgets/rss/element/rss.preferences.element',
    'plugins/widgets/rss/element/rss.rules.element'
], function defineRssView(BaseView, Header, Footer, RssElement, RssPreferencesElement, RssRulesElement) {

    /**
     * Define view
     * @class RssView
     * @extends BaseView
     * @constructor
     */
    var RssView = function RssView() {
    };

    return RssView.extend('RssView', {

        /**
         * Render rss element
         * @member RssView
         */
        renderRss: function renderRss() {

            this.header(Header, this.elements.$container);

            /**
             * Define $rss
             * @type {RssElement}
             */
            this.elements.$rss = new RssElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @member RssView
         * @returns {RssPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Rss Preferences Element
             * @type {RssPreferencesElement}
             */
            this.elements.$preferences = new RssPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member RssView
         * @param widgetRules
         * @param contentRules
         * @returns {RssRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Rss Rules Element
             * @type {RssRulesElement}
             */
            this.elements.$rules = new RssRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render rss
         * @member RssView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderRss.bind(this)
            );
        }

    }, BaseView.prototype)

});