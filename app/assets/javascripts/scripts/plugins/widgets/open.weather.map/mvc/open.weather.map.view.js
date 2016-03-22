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
    'plugins/widgets/open.weather.map/element/open.weather.map.element',
    'plugins/widgets/open.weather.map/element/open.weather.map.preferences.element',
    'plugins/widgets/open.weather.map/element/open.weather.map.rules.element'
], function defineOpenWeatherMapView(BaseView, Header, Footer, OpenWeatherMapElement, OpenWeatherMapPreferencesElement, OpenWeatherMapRulesElement) {

    /**
     * Define view
     * @class OpenWeatherMapView
     * @extends BaseView
     * @constructor
     */
    var OpenWeatherMapView = function OpenWeatherMapView() {
    };

    return OpenWeatherMapView.extend('OpenWeatherMapView', {

        /**
         * Render open.weather.map element
         * @memberOf OpenWeatherMapView
         */
        renderOpenWeatherMap: function renderOpenWeatherMap() {

            this.header(Header, this.get$container());

            /**
             * Define $open.weather.map
             * @type {OpenWeatherMapElement}
             */
            this.elements.$openweathermap = new OpenWeatherMapElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.showPosition();
        },

        /**
         * Render Prefs
         * @memberOf OpenWeatherMapView
         * @returns {OpenWeatherMapPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define OpenWeatherMap Preferences Element
             * @type {OpenWeatherMapPreferencesElement}
             */
            this.elements.$preferences = new OpenWeatherMapPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf OpenWeatherMapView
         * @param widgetRules
         * @param contentRules
         * @returns {OpenWeatherMapRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define OpenWeatherMap Rules Element
             * @type {OpenWeatherMapRulesElement}
             */
            this.elements.$rules = new OpenWeatherMapRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Show position
         * @memberOf OpenWeatherMapView
         */
        showPosition: function showPosition() {
            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render open.weather.map
         * @memberOf OpenWeatherMapView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderOpenWeatherMap.bind(this)
            );
        }

    }, BaseView.prototype)

});