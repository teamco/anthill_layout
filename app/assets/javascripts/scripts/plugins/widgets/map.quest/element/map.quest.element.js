/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineMapQuestElement(PluginElement) {

    /**
     * Define MapQuest Element
     * @param view
     * @param opts
     * @returns {MapQuestElement}
     * @constructor
     * @class MapQuestElement
     * @extends PluginElement
     */
    var MapQuestElement = function MapQuestElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('map.quest', {resource: '/widgets'});

        return this;
    };

    return MapQuestElement.extend('MapQuestElement', {

        /**
         * Render Embedded content
         * @memberOf MapQuestElement
         * @param {string} key
         * @param {number} zoom
         * @param {boolean} zoomDblClick
         * @param {string} location
         */
        renderEmbeddedContent: function renderEmbeddedContent(key, zoom, zoomDblClick, location) {

            if (!key || !location) {
                return false;
            }

            /**
             * GEt $element
             * @type {MapQuestElement}
             */
            var $element = this;

            // Get map location
            var center = location.split(',');

            require(['http://www.mapquestapi.com/sdk/js/v7.2.s/mqa.toolkit.js?key=' + key], function _loadMap() {

                // create an object for options
                var options = {
                    elt: $element.$[0],                         // ID of map element on page
                    zoom: zoom,                                 // initial zoom level of the map
                    latLng: {lat: center[0], lng: center[1]},   // center of map in latitude/longitude
                    mtype: 'map',                               // map type (map, sat, hyb); defaults to map
                    bestFitMargin: 0,                           // margin offset from map viewport when applying a bestfit on shapes
                    zoomOnDoubleClick: zoomDblClick             // enable map to be zoomed in when double-clicking
                };

                // construct an instance of MQA.TileMap with the options object
                $element.map = new MQA.TileMap(options);

                // download the modules
                MQA.withModule(
                    'largezoom',
                    'traffictoggle',
                    'viewoptions',
                    'geolocationcontrol',
                    'insetmapcontrol',
                    'mousewheel',
                    function _loadModules() {

                        // add the Large Zoom control
                        $element.map.addControl(
                            new MQA.LargeZoom(),
                            new MQA.MapCornerPlacement(MQA.MapCorner.TOP_LEFT, new MQA.Size(5, 5))
                        );

                        // add the Traffic toggle button
                        $element.map.addControl(new MQA.TrafficToggle());

                        // add the Map/Satellite toggle button
                        $element.map.addControl(new MQA.ViewOptions());

                        // add the Geolocation button
                        $element.map.addControl(
                            new MQA.GeolocationControl(),
                            new MQA.MapCornerPlacement(MQA.MapCorner.TOP_RIGHT, new MQA.Size(10, 50))
                        );

                        // add the small Inset Map with custom options
                        $element.map.addControl(
                            new MQA.InsetMapControl({
                                size: {width: 150, height: 125},
                                zoom: 3,
                                mapType: 'map',
                                minimized: true
                            }),
                            new MQA.MapCornerPlacement(MQA.MapCorner.BOTTOM_RIGHT)
                        );

                        // enable zooming with your mouse
                        $element.map.enableMouseWheelZoom();
                    }
                );
            });
        }

    }, PluginElement.prototype);
});
