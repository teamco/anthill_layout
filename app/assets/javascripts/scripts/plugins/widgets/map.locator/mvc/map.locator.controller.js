/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineMapLocatorController(PluginBase, WidgetContentController) {

    /**
     * Define MapLocator controller
     * @class MapLocatorController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var MapLocatorController = function MapLocatorController() {
    };

    return MapLocatorController.extend('MapLocatorController', {

        /**
         * Set embedded content
         * @member MapLocatorController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            var latitude = this.model.getPrefs('mapLocatorLatitude'),
                longitude = this.model.getPrefs('mapLocatorLongitude');

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
         * @member MapLocatorController
         * @private
         */
        _setEmbeddedContent: function _setEmbeddedContent() {
            this.view.elements.$mapLocator.renderEmbeddedContent({
                latitude: this.model.getPrefs('mapLocatorLatitude'),
                longitude: this.model.getPrefs('mapLocatorLongitude'),
                zoom: this.model.getPrefs('mapLocatorZoom'),
                width: this.model.getPrefs('mapLocatorWidth'),
                height: this.model.getPrefs('mapLocatorHeight'),
                sensor: this.model.getPrefs('mapLocatorGpsSensor'),
                scale: this.model.getPrefs('mapLocatorScale'),
                stretch: this.model.getPrefs('mapLocatorStretch'),
                maptype: this.model.getPrefs('mapLocatorMapType')
            });
        },

        /**
         * Add MapLocator rule
         * @member MapLocatorController
         * @param e
         */
        addMapLocatorRule: function addMapLocatorRule(e) {

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
         * @member MapLocatorController
         */
        getLocation: function getLocation() {

            /**
             * Set Location callback
             * @param position
             * @returns {*}
             * @private
             */
            function _setLocation(position) {
                this.model.setMapLocatorLatitude(position.coords.latitude);
                this.model.setMapLocatorLongitude(position.coords.longitude);
                this.controller._setEmbeddedContent.bind(this)();
            }

            if (navigator.mapLocator) {
                navigator.mapLocator.getCurrentPosition(
                    _setLocation.bind(this),
                    this.controller.errorHandler.bind(this)
                );
            } else {
                this.controller.errorHandler({});
            }
        },

        /**
         * Error handler
         * @member MapLocatorController
         * @param [error]
         */
        errorHandler: function errorHandler(error) {

            /**
             * Define default message
             * @type {string}
             */
            var message = 'MapLocator is not supported by this browser';

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    message = 'User denied the request for MapLocator';
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