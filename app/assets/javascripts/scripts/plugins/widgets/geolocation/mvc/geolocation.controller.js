/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineGeolocationController(PluginBase, WidgetContentController) {

    /**
     * Define geolocation controller
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

            var latitude = this.model.getPrefs('geolocationLatitude'),
                longitude = this.model.getPrefs('geolocationLongitude');

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
         * @member GeolocationController
         * @private
         */
        _setEmbeddedContent: function _setEmbeddedContent() {
            this.view.elements.$geolocation.renderEmbeddedContent({
                latitude: this.model.getPrefs('geolocationLatitude'),
                longitude: this.model.getPrefs('geolocationLongitude'),
                zoom: this.model.getPrefs('geolocationZoom'),
                width: this.model.getPrefs('geolocationWidth'),
                height: this.model.getPrefs('geolocationHeight'),
                sensor: this.model.getPrefs('geolocationGpsSensor'),
                scale: this.model.getPrefs('geolocationScale'),
                stretch: this.model.getPrefs('geolocationStretch'),
                maptype: this.model.getPrefs('geolocationMapType')
            });
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

            /**
             * Set Location callback
             * @param position
             * @returns {*}
             * @private
             */
            function _setLocation(position) {
                this.model.setGeolocationLatitude(position.coords.latitude);
                this.model.setGeolocationLongitude(position.coords.longitude);
                this.controller._setEmbeddedContent.bind(this)();
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    _setLocation.bind(this),
                    this.controller.errorHandler.bind(this)
                );
            } else {
                this.controller.errorHandler({});
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

            if (!this.scope) {
                console.warn(message, error);
                return false;
            }

            this.scope.logger.warn(message, error);
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});