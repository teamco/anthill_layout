/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineHereMapsForLifeController(PluginBase, WidgetContentController) {

    /**
     * Define HereMapsForLife controller
     * @class HereMapsForLifeController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var HereMapsForLifeController = function HereMapsForLifeController() {
    };

    return HereMapsForLifeController.extend('HereMapsForLifeController', {

        /**
         * Set embedded content
         * @memberOf HereMapsForLifeController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.get$item().renderEmbeddedContent({
                api_id: this.model.getPrefs('heremapsforlifeAppId'),
                app_code: this.model.getPrefs('heremapsforlifeAppCode'),
                location: this.model.getPrefs('heremapsforlifeSpecifiedLocation'),
                bounds: this.model.getPrefs('heremapsforlifeViewBounds'),
                venues_layers: this.model.getPrefs('heremapsforlifeVenuesLayer'),
                restrict_movement: this.model.getPrefs('heremapsforlifeRestrictMovement'),
                marker: this.model.getPrefs('heremapsforlifeMarker'),
                draggable_marker: this.model.getPrefs('heremapsforlifeDraggableMarker'),
                terrain_map: this.model.getPrefs('heremapsforlifeTerrainMap'),
                zoom: this.model.getPrefs('heremapsforlifeZoom'),
                latitude_longitude: this.model.getPrefs('heremapsforlifeLatitudeLongitude'),
                location_marker: this.model.getPrefs('heremapsforlifeLocationMarker'),
                nwse_corners: this.model.getPrefs('heremapsforlifeNWSECorners'),
                restrict_bounds: this.model.getPrefs('heremapsforlifeRestrictBounds')
            });
        },

        /**
         * Toggle view bounds
         * @memberOf HereMapsForLifeController
         * @param {Event} event
         */
        toggleViewBounds: function toggleViewBounds(event) {
            this.toggleInteraction('showBoundNorthWestSouthEastCorners', event);
        },

        /**
         * Toggle Specified Location
         * @memberOf HereMapsForLifeController
         * @param {Event} event
         */
        toggleSpecifiedLocation: function toggleSpecifiedLocation(event) {
            this.toggleInteraction('showLatitudeLongitude', event);
        },

        /**
         * Toggle Bounds Restrict
         * @memberOf HereMapsForLifeController
         * @param {Event} event
         */
        toggleBoundsRestrict: function toggleBoundsRestrict(event) {
            this.toggleInteraction('showBoundsRestrict', event);
        },

        /**
         * Toggle Specified Location Marker
         * @memberOf HereMapsForLifeController
         * @param {Event} event
         */
        toggleSpecifiedLocationMarker: function toggleSpecifiedLocationMarker(event) {
            this.toggleInteraction('showSpecifiedLocationMarker', event);
        },

        /**
         * Toggle Interaction
         * @memberOf HereMapsForLifeController
         * @param {string} fn
         * @param {Event} event
         */
        toggleInteraction: function toggleInteraction(fn, event) {

            /**
             * Get modal
             * @type {PageData}
             */
            var referrer = this.scope.referrer;

            if (referrer && fn) {
                this.getView().elements.$preferences[fn](referrer, event);
            }
        },

        /**
         * Add HereMapsForLife rule
         * @memberOf HereMapsForLifeController
         * @param {Event} e
         */
        addHereMapsForLifeRule: function addHereMapsForLifeRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {HereMapsForLife|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
