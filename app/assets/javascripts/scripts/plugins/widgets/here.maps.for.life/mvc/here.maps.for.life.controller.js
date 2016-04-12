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

        toggleViewBounds: function toggleViewBounds() {

            /**
             * Get modal
             * @type {PageData}
             */
            var referrer = this.scope.referrer;

            if (referrer) {

                this.getView().elements.$preferences.showBoundNorthWestSouthEastCorners(referrer);
            }
        },

        toggleSpecifiedLocation: function toggleSpecifiedLocation() {

            /**
             * Get modal
             * @type {PageData}
             */
            var referrer = this.scope.referrer;

            if (referrer) {

                this.getView().elements.$preferences.showLatitudeLongitude(referrer);
            }
        },
        toggleBoundsRestrict: function toggleBoundsRestrict() {

            /**
             * Get modal
             * @type {PageData}
             */
            var referrer = this.scope.referrer;

            if (referrer) {

                this.getView().elements.$preferences.showBoundsRestrict(referrer);
            }
        },
        toggleSpecifiedLocationMarker: function toggleSpecifiedLocationMarker() {

            /**
             * Get modal
             * @type {PageData}
             */
            var referrer = this.scope.referrer;

            if (referrer) {

                this.getView().elements.$preferences.showSpecifiedLocationMarker(referrer);
            }
        },

        /**
         * Add HereMapsForLife rule
         * @memberOf HereMapsForLifeController
         * @param e
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
