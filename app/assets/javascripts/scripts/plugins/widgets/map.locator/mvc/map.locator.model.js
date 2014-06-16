/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineMapLocatorModel(BaseModel) {

    /**
     * Define MapLocator model
     * @extends BaseModel
     * @class MapLocatorModel
     * @constructor
     */
    var MapLocatorModel = function MapLocatorModel() {

        /**
         * Define preferences
         * @member MapLocatorModel
         * @type {{
         *      mapLocatorLatitude: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      mapLocatorLongitude: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      mapLocatorZoom: {type: string, disabled: boolean, value: number, visible: boolean},
         *      mapLocatorWidth: {type: string, disabled: boolean, value: number, visible: boolean},
         *      mapLocatorHeight: {type: string, disabled: boolean, value: number, visible: boolean},
         *      mapLocatorMapType: {
         *          type: string,
         *          disabled: boolean,
         *          list: {type: string, value: string}[],
         *          value: string,
         *          visible: boolean
         *      },
         *      mapLocatorGpsSensor: {type: string, disabled: boolean, value: boolean, visible: boolean},
         *      mapLocatorScale: {type: string, disabled: boolean, value: boolean, visible: boolean},
         *      mapLocatorStretch: {type: string, disabled: boolean, value: boolean, visible: boolean}
         * }}
         */
        this.preferences = {
            mapLocatorLatitude: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            mapLocatorLongitude: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            mapLocatorZoom: {
                type: 'text',
                disabled: false,
                value: 14,
                visible: true
            },
            mapLocatorWidth: {
                type: 'text',
                disabled: false,
                value: 400,
                visible: true
            },
            mapLocatorHeight: {
                type: 'text',
                disabled: false,
                value: 300,
                visible: true
            },
            mapLocatorMapType: {
                type: 'combobox',
                disabled: false,
                list: [
                    {
                        type: 'text',
                        value: 'Roadmap'
                    },
                    {
                        type: 'text',
                        value: 'Satellite'
                    },
                    {
                        type: 'text',
                        value: 'Terrain'
                    },
                    {
                        type: 'text',
                        value: 'Hybrid'
                    }
                ],
                value: 'Roadmap',
                visible: true
            },
            mapLocatorGpsSensor: {
                type: 'checkbox',
                disabled: false,
                value: false,
                visible: true
            },
            mapLocatorScale: {
                type: 'checkbox',
                disabled: false,
                value: false,
                visible: true
            },
            mapLocatorStretch: {
                type: 'checkbox',
                disabled: false,
                value: false,
                visible: true
            }
        };

        /**
         * Define rules
         * @member MapLocatorModel
         * @type {{}}
         */
        this.rules = {};
    };

    return MapLocatorModel.extend('MapLocatorModel', {

        /**
         * Set MapLocator Latitude
         * @member MapLocatorModel
         * @param {number} latitude
         */
        setMapLocatorLatitude: function setMapLocatorLatitude(latitude) {
            this.setPrefs('mapLocatorLatitude', latitude);
        },

        /**
         * Set MapLocator Longitude
         * @member MapLocatorModel
         * @param {number} longitude
         */
        setMapLocatorLongitude: function setMapLocatorLongitude(longitude) {
            this.setPrefs('mapLocatorLongitude', longitude);
        },

        /**
         * Set MapLocator Zoom
         * @member MapLocatorModel
         * @param {number} zoom
         */
        setMapLocatorZoom: function setMapLocatorZoom(zoom) {
            this.setPrefs('mapLocatorZoom', zoom);
        },

        /**
         * Set MapLocator Width
         * @member MapLocatorModel
         * @param {number} width
         */
        setMapLocatorWidth: function setMapLocatorWidth(width) {
            this.setPrefs('mapLocatorWidth', width);
        },

        /**
         * Set MapLocator Height
         * @member MapLocatorModel
         * @param {number} height
         */
        setMapLocatorHeight: function setMapLocatorHeight(height) {
            this.setPrefs('mapLocatorHeight', height);
        },

        /**
         * Set MapLocator Height
         * @member MapLocatorModel
         * @param {string} type
         */
        setMapLocatorMapType: function setMapLocatorMapType(type) {
            this.setPrefs('mapLocatorMapType', type);
        },

        /**
         * Set MapLocator Scale
         * @member MapLocatorModel
         * @param {boolean} scale
         */
        setMapLocatorScale: function setMapLocatorScale(scale) {
            this.setPrefs('mapLocatorScale', scale);
        },

        /**
         * Set MapLocator Sensor
         * @member MapLocatorModel
         * @param {boolean} sensor
         */
        setMapLocatorGpsSensor: function setMapLocatorGpsSensor(sensor) {
            this.setPrefs('mapLocatorGpsSensor', sensor);
        },

        /**
         * Set MapLocator Stretch
         * @member MapLocatorModel
         * @param {boolean} stretch
         */
        setMapLocatorStretch: function setMapLocatorStretch(stretch) {
            this.setPrefs('mapLocatorStretch', stretch);
        }

    }, BaseModel.prototype);
});