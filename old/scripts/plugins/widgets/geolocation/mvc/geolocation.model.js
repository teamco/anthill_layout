/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function defineGeolocationModel(BaseModel) {

    /**
     * Define Geolocation model
     * @extends BaseModel
     * @class GeolocationModel
     * @constructor
     */
    var GeolocationModel = function GeolocationModel() {

        /**
         * Define preferences
         * @member GeolocationModel
         * @type {{
         *      geolocationLatitude: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      geolocationLongitude: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      geolocationZoom: {type: string, disabled: boolean, value: number, visible: boolean},
         *      geolocationWidth: {type: string, disabled: boolean, value: number, visible: boolean},
         *      geolocationHeight: {type: string, disabled: boolean, value: number, visible: boolean},
         *      geolocationMapType: {
         *          type: string,
         *          disabled: boolean,
         *          list: {type: string, value: string}[],
         *          value: string,
         *          visible: boolean
         *      },
         *      geolocationGpsSensor: {type: string, disabled: boolean, value: boolean, visible: boolean},
         *      geolocationScale: {type: string, disabled: boolean, value: boolean, visible: boolean},
         *      geolocationStretch: {type: string, disabled: boolean, value: boolean, visible: boolean}
         * }}
         */
        this.preferences = {
            geolocationLatitude: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            geolocationLongitude: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            geolocationZoom: {
                type: 'text',
                disabled: false,
                value: 14,
                visible: true
            },
            geolocationWidth: {
                type: 'text',
                disabled: false,
                value: 400,
                visible: true
            },
            geolocationHeight: {
                type: 'text',
                disabled: false,
                value: 300,
                visible: true
            },
            geolocationMapType: {
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
            geolocationGpsSensor: {
                type: 'checkbox',
                disabled: false,
                value: false,
                visible: true
            },
            geolocationScale: {
                type: 'checkbox',
                disabled: false,
                value: false,
                visible: true
            },
            geolocationStretch: {
                type: 'checkbox',
                disabled: false,
                value: false,
                visible: true
            }
        };

        /**
         * Define rules
         * @member GeolocationModel
         * @type {{}}
         */
        this.rules = {};
    };

    return GeolocationModel.extend('GeolocationModel', {

        /**
         * Set Geolocation Latitude
         * @member GeolocationModel
         * @param {number} latitude
         */
        setGeolocationLatitude: function setGeolocationLatitude(latitude) {
            this.setPrefs('geolocationLatitude', latitude);
        },

        /**
         * Set Geolocation Longitude
         * @member GeolocationModel
         * @param {number} longitude
         */
        setGeolocationLongitude: function setGeolocationLongitude(longitude) {
            this.setPrefs('geolocationLongitude', longitude);
        },

        /**
         * Set Geolocation Zoom
         * @member GeolocationModel
         * @param {number} zoom
         */
        setGeolocationZoom: function setGeolocationZoom(zoom) {
            this.setPrefs('geolocationZoom', zoom);
        },

        /**
         * Set Geolocation Width
         * @member GeolocationModel
         * @param {number} width
         */
        setGeolocationWidth: function setGeolocationWidth(width) {
            this.setPrefs('geolocationWidth', width);
        },

        /**
         * Set Geolocation Height
         * @member GeolocationModel
         * @param {number} height
         */
        setGeolocationHeight: function setGeolocationHeight(height) {
            this.setPrefs('geolocationHeight', height);
        },

        /**
         * Set Geolocation Height
         * @member GeolocationModel
         * @param {string} type
         */
        setGeolocationMapType: function setGeolocationMapType(type) {
            this.setPrefs('geolocationMapType', type);
        },

        /**
         * Set Geolocation Scale
         * @member GeolocationModel
         * @param {boolean} scale
         */
        setGeolocationScale: function setGeolocationScale(scale) {
            this.setPrefs('geolocationScale', scale);
        },

        /**
         * Set Geolocation Sensor
         * @member GeolocationModel
         * @param {boolean} sensor
         */
        setGeolocationGpsSensor: function setGeolocationGpsSensor(sensor) {
            this.setPrefs('geolocationGpsSensor', sensor);
        },

        /**
         * Set Geolocation Stretch
         * @member GeolocationModel
         * @param {boolean} stretch
         */
        setGeolocationStretch: function setGeolocationStretch(stretch) {
            this.setPrefs('geolocationStretch', stretch);
        }

    }, BaseModel.prototype);
});