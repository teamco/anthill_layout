/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/View',
    'element/header.element',
    'element/footer.element',
    'plugins/widgets/portfolium/element/portfolium.element',
    'plugins/widgets/portfolium/element/portfolium.preferences.element',
    'plugins/widgets/portfolium/element/portfolium.rules.element'
], function definePortfoliumView(BaseView, Header, Footer, PortfoliumElement, PortfoliumPreferencesElement, PortfoliumRulesElement) {

    /**
     * Define view
     * @class PortfoliumView
     * @extends BaseView
     * @constructor
     */
    var PortfoliumView = function PortfoliumView() {
    };

    return PortfoliumView.extend('PortfoliumView', {

        /**
         * Render Portfolium element
         * @memberOf PortfoliumView
         */
        renderPortfolium: function renderPortfolium() {

            this.header(Header, this.get$container());

            /**
             * Define $portfolium
             * @type {PortfoliumElement}
             */
            this.elements.$portfolium = new PortfoliumElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf PortfoliumView
         * @returns {PortfoliumPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Portfolium Preferences Element
             * @type {PortfoliumPreferencesElement}
             */
            this.elements.$preferences = new PortfoliumPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf PortfoliumView
         * @param widgetRules
         * @param contentRules
         * @returns {PortfoliumRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Portfolium Rules Element
             * @type {PortfoliumRulesElement}
             */
            this.elements.$rules = new PortfoliumRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Portfolium
         * @memberOf PortfoliumView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPortfolium.bind(this)
            );
        }

    }, BaseView.prototype);
});
