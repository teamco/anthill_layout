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
            maplocatorLatitude: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            maplocatorLongitude: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            maplocatorZoom: {
                type: 'text',
                disabled: false,
                value: 13,
                visible: true
            },
            maplocatorSearchRadius: {
                type: 'text',
                disabled: false,
                value: 1000,
                visible: true
            },
            maplocatorMapStyleWaterColor: {
                type: 'text',
                disabled: true,
                value: '#46bcec',
                visible: false
            },
            maplocatorMapStyleWaterVisibility: {
                type: 'text',
                disabled: true,
                value: 'on',
                visible: false
            },
            maplocatorMapStyleLandscapeColor: {
                type: 'text',
                disabled: true,
                value: '#f2f2f2',
                visible: false
            },
            maplocatorMapStyleRoadSaturation: {
                type: 'text',
                disabled: true,
                value: -100,
                visible: false
            },
            maplocatorMapStyleRoadLightness: {
                type: 'text',
                disabled: true,
                value: 45,
                visible: false
            },
            maplocatorMapStyleRoadHighwayVisibility: {
                type: 'text',
                disabled: true,
                value: 'simplified',
                visible: false
            },
            maplocatorMapStyleRoadArterialElementType: {
                type: 'text',
                disabled: true,
                value: 'labels.icon',
                visible: false
            },
            maplocatorMapStyleRoadArterialVisibility: {
                type: 'text',
                disabled: true,
                value: 'off',
                visible: false
            },
            maplocatorMapStyleAdministrativeElementType: {
                type: 'text',
                disabled: true,
                value: 'labels.text.fill',
                visible: false
            },
            maplocatorMapStyleAdministrativeColor: {
                type: 'text',
                disabled: true,
                value: '#444444',
                visible: false
            },
            maplocatorMapStyleTransitVisibility: {
                type: 'text',
                disabled: true,
                value: 'off',
                visible: false
            },
            maplocatorMapStylePoiVisibility: {
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
            this.setPrefs('maplocatorLatitude', latitude);
        },

        /**
         * Set MapLocator Longitude
         * @member MapLocatorModel
         * @param {number} longitude
         */
        setMapLocatorLongitude: function setMapLocatorLongitude(longitude) {
            this.setPrefs('maplocatorLongitude', longitude);
        },

        /**
         * Set MapLocator zoom
         * @member MapLocatorModel
         * @param {number} zoom
         */
        setMapLocatorZoom: function setMapLocatorZoom(zoom) {
            this.setPrefs('maplocatorZoom', zoom);
        },

        /**
         * Set MapLocator Search radius
         * @member MapLocatorModel
         * @param {string} radius
         */
        setMapLocatorSearchRadius: function setMapLocatorSearchRadius(radius) {
            this.setPrefs('maplocatorSearchRadius', parseInt(radius, 10));
        }

    }, BaseModel.prototype);
});