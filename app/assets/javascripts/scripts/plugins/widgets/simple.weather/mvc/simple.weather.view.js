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
    'plugins/widgets/simple.weather/element/simple.weather.element',
    'plugins/widgets/simple.weather/element/simple.weather.preferences.element',
    'plugins/widgets/simple.weather/element/simple.weather.rules.element'
], function defineSimpleWeatherView(BaseView, Header, Footer, SimpleWeatherElement, SimpleWeatherPreferencesElement, SimpleWeatherRulesElement) {

    /**
     * Define view
     * @class SimpleWeatherView
     * @extends BaseView
     * @constructor
     */
    var SimpleWeatherView = function SimpleWeatherView() {
    };

    return SimpleWeatherView.extend('SimpleWeatherView', {

        /**
         * Render $simpleweather element
         * @memberOf SimpleWeatherView
         */
        renderSimpleWeather: function renderSimpleWeather() {

            this.header(Header, this.get$container());

            /**
             * Define $simpleweather
             * @type {SimpleWeatherElement}
             */
            this.elements.$simpleweather = new SimpleWeatherElement(this, {
                $container: this.get$container().$,
                style: 'weather'
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf SimpleWeatherView
         * @returns {SimpleWeatherPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define SimpleWeather Preferences Element
             * @type {SimpleWeatherPreferencesElement}
             */
            this.elements.$preferences = new SimpleWeatherPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf SimpleWeatherView
         * @param widgetRules
         * @param contentRules
         * @returns {SimpleWeatherRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define SimpleWeather Rules Element
             * @type {SimpleWeatherRulesElement}
             */
            this.elements.$rules = new SimpleWeatherRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render SimpleWeather
         * @memberOf SimpleWeatherView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSimpleWeather.bind(this)
            );
        }

    }, BaseView.prototype)

});
