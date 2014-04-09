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
         *      geolocationLatitude: {type: string, disabled: boolean, value: undefined},
         *      geolocationLongitude: {type: string, disabled: boolean, value: undefined},
         *      geolocationZoom: {type: string, disabled: boolean, value: number},
         *      geolocationWidth: {type: string, disabled: boolean, value: number},
         *      geolocationHeight: {type: string, disabled: boolean, value: number},
         *      geolocationMapType: {
         *          type: string,
         *          disabled: boolean,
         *          list: {type: string, value: string}[],
         *          value: string
         *      },
         *      geolocationSensor: {type: string, disabled: boolean, value: boolean},
         *      geolocationScale: {type: string, disabled: boolean, value: boolean},
         *      geolocationStretch: {type: string, disabled: boolean, value: boolean}
         * }}
         */
        this.preferences = {
            geolocationLatitude: {
                type: 'text',
                disabled: false,
                value: undefined
            },
            geolocationLongitude: {
                type: 'text',
                disabled: false,
                value: undefined
            },
            geolocationZoom: {
                type: 'text',
                disabled: false,
                value: 14
            },
            geolocationWidth: {
                type: 'text',
                disabled: false,
                value: 400
            },
            geolocationHeight: {
                type: 'text',
                disabled: false,
                value: 300
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
                value: 'Roadmap'
            },
            geolocationGpsSensor: {
                type: 'checkbox',
                disabled: false,
                value: false
            },
            geolocationScale: {
                type: 'checkbox',
                disabled: false,
                value: false
            },
            geolocationStretch: {
                type: 'checkbox',
                disabled: false,
                value: false
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