/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define(
    [
        'modules/Geolocation',
        'plugins/plugin.controller',
        'plugins/widgets/widget.content.controller'
    ],

    /**
     * Define geolocation.map controller
     * @param {BaseGeolocation} BaseGeolocation
     * @param {PluginController} PluginController
     * @param {WidgetContentController} WidgetContentController
     * @returns {*}
     */
    function defineGeolocationMapController(BaseGeolocation, PluginController, WidgetContentController) {

        /**
         * Define geolocation.map controller
         * @class GeolocationMapController
         * @extends BaseGeolocation
         * @extends PluginController
         * @extends WidgetContentController
         * @constructor
         */
        let GeolocationMapController = function GeolocationMapController() {
        };

        return GeolocationMapController.extend(
            'GeolocationMapController', {

                /**
                 * Set embedded content
                 * @memberOf GeolocationMapController
                 */
                setEmbeddedContent: function setEmbeddedContent() {

                    let latitude = this.model.getPrefs('geolocationmapLatitude'),
                        longitude = this.model.getPrefs('geolocationmapLongitude');

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
                 * @memberOf GeolocationMapController
                 * @private
                 */
                _setEmbeddedContent: function _setEmbeddedContent() {
                    this.view.elements.$geolocationmap.renderEmbeddedContent({
                        apiKey: this.model.getPrefs('geolocationmapAPIKey'),
                        latitude: this.model.getPrefs('geolocationmapLatitude'),
                        longitude: this.model.getPrefs('geolocationmapLongitude'),
                        zoom: this.model.getPrefs('geolocationmapZoom'),
                        width: this.model.getPrefs('geolocationmapWidth'),
                        height: this.model.getPrefs('geolocationmapHeight'),
                        sensor: this.model.getPrefs('geolocationmapGpsSensor'),
                        scale: this.model.getPrefs('geolocationmapScale'),
                        stretch: this.model.getPrefs('geolocationmapStretch'),
                        maptype: this.model.getPrefs('geolocationmapMapType')
                    });
                },

                /**
                 * Add GeolocationMap rule
                 * @memberOf GeolocationMapController
                 * @param {Event} e
                 */
                addGeolocationMapRule: function addGeolocationMapRule(e) {

                    /**
                     * Define $button
                     * @type {*|jQuery|GeolocationMap}
                     */
                    let $button = $(e.target),
                        scope = this.scope;

                    scope.observer.publish(
                        scope.eventmanager.eventList.publishRule,
                        [$button.attr('value'), scope.name]
                    );
                },

                /**
                 * Get location
                 * @memberOf GeolocationMapController
                 */
                getLocation: function getLocation() {
                    this.controller.getPosition(
                        function _setLocation(position) {
                            this.model.setGeolocationMapLatitude(position.coords.latitude);
                            this.model.setGeolocationMapLongitude(position.coords.longitude);
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