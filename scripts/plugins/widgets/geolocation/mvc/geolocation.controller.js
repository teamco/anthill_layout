/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget'
], function defineGeolocationController(PluginBase, WidgetContentController) {

    /**
     * Define youtube controller
     * @class GeolocationController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var GeolocationController = function GeolocationController() {
    };

    return GeolocationController.extend('GeolocationController', {

        /**
         * Set embedded content
         * @member GeolocationController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$geolocation.renderEmbeddedContent({
                    latitude: this.model.getPrefs('geolocationLatitude'),
                    longitude: this.model.getPrefs('geolocationLongitude'),
                    zoom: this.model.getPrefs('geolocationZoom'),
                    width: this.model.getPrefs('geolocationWidth'),
                    height: this.model.getPrefs('geolocationHeight'),
                    sensor: this.model.getPrefs('geolocationSensor'),
                    stretch: this.model.getPrefs('geolocationStretch')
                }
            );
        },

        /**
         * Add Geolocation rule
         * @member GeolocationController
         * @param e
         */
        addGeolocationRule: function addGeolocationRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.name]
            );
        },

        /**
         * Get location
         * @member GeolocationController
         */
        getLocation: function getLocation() {
            if (navigator.geolocation) {
                return navigator.geolocation.getCurrentPosition(
                    this.getView().showPosition,
                    this.errorHandler
                );
            } else {
                this.errorHandler();
            }
        },

        /**
         * Error handler
         * @member GeolocationController
         * @param [error]
         */
        errorHandler: function errorHandler(error) {

            /**
             * Define default message
             * @type {string}
             */
            var message = 'Geolocation is not supported by this browser';

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    message = 'User denied the request for Geolocation';
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