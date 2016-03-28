/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'modules/Geolocation',
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineSimpleWeatherController(BaseGeolocation, PluginBase, WidgetContentController) {

    /**
     * Define SimpleWeather controller
     * @class SimpleWeatherController
     * @extends BaseGeolocation
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var SimpleWeatherController = function SimpleWeatherController() {
    };

    return SimpleWeatherController.extend(
        'SimpleWeatherController', {

            /**
             * Set embedded content
             * @memberOf SimpleWeatherController
             */
            setEmbeddedContent: function setEmbeddedContent() {

                var latitude = this.model.getPrefs('simpleweatherLatitude'),
                    longitude = this.model.getPrefs('simpleweatherLongitude');

                if (!latitude || !longitude) {

                    this.observer.publish(
                        this.eventmanager.eventList.getLocation
                    );

                    return false;
                }

                this.controller._setEmbeddedContent();
            },

            /**
             * Set embedded content
             * @memberOf SimpleWeatherController
             * @private
             */
            _setEmbeddedContent: function _setEmbeddedContent() {
                this.scope.view.elements.$simpleweather.renderEmbeddedContent({
                    latitude: this.model.getPrefs('simpleweatherLatitude'),
                    longitude: this.model.getPrefs('simpleweatherLongitude'),
                    unit: this.model.getPrefs('simpleweatherUnit')
                });
            },

            /**
             * Get location
             * @memberOf SimpleWeatherController
             */
            getLocation: function getLocation() {
                this.controller.getPosition(
                    function _setLocation(position) {
                        this.model.setSimpleweatherLatitude(position.coords.latitude);
                        this.model.setSimpleweatherLongitude(position.coords.longitude);
                        this._setEmbeddedContent();
                    }
                );
            },

            /**
             * Add SimpleWeather rule
             * @memberOf SimpleWeatherController
             * @param e
             */
            addSimpleWeatherRule: function addSimpleWeatherRule(e) {

                /**
                 * Define $button
                 * @type {*|jQuery|HTMLElement}
                 */
                var $button = $(e.target),
                    scope = this.scope;

                scope.observer.publish(
                    scope.eventmanager.eventList.publishRule,
                    [$button.attr('value'), scope.name]
                );
            }

        },
        BaseGeolocation.prototype,
        PluginBase.prototype,
        WidgetContentController.prototype
    );
});
