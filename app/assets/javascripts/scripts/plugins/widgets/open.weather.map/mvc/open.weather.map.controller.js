/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineOpenWeatherMapController(PluginBase, WidgetContentController) {

    /**
     * Define youtube controller
     * @class OpenWeatherMapController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var OpenWeatherMapController = function OpenWeatherMapController() {
    };

    return OpenWeatherMapController.extend('OpenWeatherMapController', {

        /**
         * Set embedded content
         * @memberOf OpenWeatherMapController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            var latitude = this.model.getPrefs('openweathermapLatitude'),
                longitude = this.model.getPrefs('openweathermapLongitude');

            if (!latitude || !longitude) {

                this.observer.publish(
                    this.eventmanager.eventList.getLocation
                );

                return false;
            }

            this.controller._setEmbeddedContent.bind(this)();
        },

        /**
         * Set embedded content
         * @memberOf OpenWeatherMapController
         * @private
         */
        _setEmbeddedContent: function _setEmbeddedContent() {
            this.view.elements.$openweathermap.renderEmbeddedContent({
                    latitude: this.model.getPrefs('openweathermapLatitude'),
                    longitude: this.model.getPrefs('openweathermapLongitude'),
                    zoom: this.model.getPrefs('openweathermapZoom'),
                    width: this.model.getPrefs('openweathermapWidth'),
                    height: this.model.getPrefs('openweathermapHeight'),
                    sensor: this.model.getPrefs('openweathermapGpsSensor'),
                    scale: this.model.getPrefs('openweathermapScale'),
                    stretch: this.model.getPrefs('openweathermapStretch'),
                    maptype: this.model.getPrefs('openweathermapMapType')
                }
            );
        },

        /**
         * Add OpenWeatherMap rule
         * @memberOf OpenWeatherMapController
         * @param e
         */
        addOpenWeatherMapRule: function addOpenWeatherMapRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.prototype.name]
            );
        },

        /**
         * Get location
         * @memberOf OpenWeatherMapController
         */
        getLocation: function getLocation() {

            /**
             * Set Location callback
             * @param position
             * @returns {*}
             * @private
             */
            function _setLocation(position) {
                this.model.setOpenWeatherMapLatitude(position.coords.latitude);
                this.model.setOpenWeatherMapLongitude(position.coords.longitude);
                this.controller._setEmbeddedContent.bind(this)();
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    _setLocation.bind(this),
                    this.controller.errorHandler
                );
            } else {
                this.controller.errorHandler({});
            }
        },

        /**
         * Error handler
         * @memberOf OpenWeatherMapController
         * @param [error]
         */
        errorHandler: function errorHandler(error) {

            /**
             * Define default message
             * @type {string}
             */
            var message = 'OpenWeatherMap is not supported by this browser';

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    message = 'User denied the request for OpenWeatherMap';
                    break;
                case error.POSITION_UNAVAILABLE:
                    message = 'Location information is unavailable';
                    break;
                case error.TIMEOUT:
                    message = 'The request to get user location timed out';
                    break;
                case error.UNKNOWN_ERROR:
                    message = 'An unknown error occurred';
                    break;
            }

            this.scope.logger.warn(message, error);
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});