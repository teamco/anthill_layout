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
    'plugins/widgets/forecast.io/element/forecast.io.element',
    'plugins/widgets/forecast.io/element/forecast.io.preferences.element',
    'plugins/widgets/forecast.io/element/forecast.io.rules.element'
], function defineForecastIoView(BaseView, Header, Footer, ForecastIoElement, ForecastIoPreferencesElement, ForecastIoRulesElement) {

    /**
     * Define view
     * @class ForecastIoView
     * @extends BaseView
     * @constructor
     */
    var ForecastIoView = function ForecastIoView() {
    };

    return ForecastIoView.extend('ForecastIoView', {

        /**
         * Render ForecastIo element
         * @memberOf ForecastIoView
         */
        renderForecastIo: function renderForecastIo() {

            this.header(Header, this.get$container());

            /**
             * Define $forecastio
             * @type {ForecastIoElement}
             */
            this.elements.$forecastio = new ForecastIoElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf ForecastIoView
         * @returns {ForecastIoPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define ForecastIo Preferences Element
             * @type {ForecastIoPreferencesElement}
             */
            this.elements.$preferences = new ForecastIoPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf ForecastIoView
         * @param widgetRules
         * @param contentRules
         * @returns {ForecastIoRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define ForecastIo Rules Element
             * @type {ForecastIoRulesElement}
             */
            this.elements.$rules = new ForecastIoRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render ForecastIo
         * @memberOf ForecastIoView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderForecastIo.bind(this)
            );
        }

    }, BaseView.prototype);
});
