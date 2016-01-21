/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define(
    [
        'modules/Geolocation',
        'plugins/plugin',
        'plugins/widgets/widget.content.controller'
    ],

    /**
     * Define geolocation controller
     * @param {BaseGeolocation} BaseGeolocation
     * @param {PluginController} PluginController
     * @param {WidgetContentController} WidgetContentController
     * @returns {*}
     */
    function defineGeolocationController(BaseGeolocation, PluginController, WidgetContentController) {

        /**
         * Define geolocation controller
         * @class GeolocationController
         * @extends BaseGeolocation
         * @extends PluginController
         * @extends WidgetContentController
         * @constructor
         */
        var GeolocationController = function GeolocationController() {
        };

        return GeolocationController.extend(
            'GeolocationController', {

                /**
                 * Set embedded content
                 * @memberOf GeolocationController
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
                 * @memberOf GeolocationController
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
                 * @memberOf GeolocationController
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
                        [$button.attr('value'), scope.name]
                    );
                },

                /**
                 * Get location
                 * @memberOf GeolocationController
                 */
                getLocation: function getLocation() {
                    this.controller.getPosition(
                        function _setLocation(position) {
                            this.model.setGeolocationLatitude(position.coords.latitude);
                            this.model.setGeolocationLongitude(position.coords.longitude);
                            this._setEmbeddedContent.bind(this.scope)();
                        }
                    );
                }

            },
            BaseGeolocation.prototype,
            PluginController.prototype,
            WidgetContentController.prototype
        );
    }
);