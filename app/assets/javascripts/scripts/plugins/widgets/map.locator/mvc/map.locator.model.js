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
         * @type {{}}
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
                value: 13,
                visible: true
            },
            mapLocatorSearchRadius: {
                type: 'text',
                disabled: false,
                value: 1000,
                visible: true
            },
            mapLocatorMapStyleWaterColor: {
                type: 'text',
                disabled: true,
                value: '#46bcec',
                visible: false
            },
            mapLocatorMapStyleWaterVisibility: {
                type: 'text',
                disabled: true,
                value: 'on',
                visible: false
            },
            mapLocatorMapStyleLandscapeColor: {
                type: 'text',
                disabled: true,
                value: '#f2f2f2',
                visible: false
            },
            mapLocatorMapStyleRoadSaturation: {
                type: 'text',
                disabled: true,
                value: -100,
                visible: false
            },
            mapLocatorMapStyleRoadLightness: {
                type: 'text',
                disabled: true,
                value: 45,
                visible: false
            },
            mapLocatorMapStyleRoadHighwayVisibility: {
                type: 'text',
                disabled: true,
                value: 'simplified',
                visible: false
            },
            mapLocatorMapStyleRoadArterialElementType: {
                type: 'text',
                disabled: true,
                value: 'labels.icon',
                visible: false
            },
            mapLocatorMapStyleRoadArterialVisibility: {
                type: 'text',
                disabled: true,
                value: 'off',
                visible: false
            },
            mapLocatorMapStyleAdministrativeElementType: {
                type: 'text',
                disabled: true,
                value: 'labels.text.fill',
                visible: false
            },
            mapLocatorMapStyleAdministrativeColor: {
                type: 'text',
                disabled: true,
                value: '#444444',
                visible: false
            },
            mapLocatorMapStyleTransitVisibility: {
                type: 'text',
                disabled: true,
                value: 'off',
                visible: false
            },
            mapLocatorMapStylePoiVisibility: {
                type: 'text',
                disabled: true,
                value: 'off',
                visible: false
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
         * Set MapLocator zoom
         * @member MapLocatorModel
         * @param {number} zoom
         */
        setMapLocatorZoom: function setMapLocatorZoom(zoom) {
            this.setPrefs('mapLocatorZoom', zoom);
        },

        /**
         * Set MapLocator Search radius
         * @member MapLocatorModel
         * @param {number} radius
         */
        setMapLocatorSearchRadius: function setMapLocatorSearchRadius(radius) {
            this.setPrefs('mapLocatorSearchRadius', radius);
        }

    }, BaseModel.prototype);
});