/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function defineOpenWeatherMapModel(BaseModel) {

    /**
     * Define OpenWeatherMap model
     * @extends BaseModel
     * @class OpenWeatherMapModel
     * @constructor
     */
    var OpenWeatherMapModel = function OpenWeatherMapModel() {

        /**
         * Define preferences
         * @member OpenWeatherMapModel
         */
        this.preferences = {
            openweathermapLatitude: {
                type: 'text',
                disabled: false,
                value: undefined
            },
            openweathermapLongitude: {
                type: 'text',
                disabled: false,
                value: undefined
            },
            openweathermapZoom: {
                type: 'text',
                disabled: false,
                value: 14
            },
            openweathermapWidth: {
                type: 'text',
                disabled: false,
                value: 400
            },
            openweathermapHeight: {
                type: 'text',
                disabled: false,
                value: 300
            },
            openweathermapMapType: {
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
            openweathermapGpsSensor: {
                type: 'checkbox',
                disabled: false,
                value: false
            },
            openweathermapScale: {
                type: 'checkbox',
                disabled: false,
                value: false
            },
            openweathermapStretch: {
                type: 'checkbox',
                disabled: false,
                value: false
            }
        };

        /**
         * Define rules
         * @member OpenWeatherMapModel
         * @type {{}}
         */
        this.rules = {};
    };

    return OpenWeatherMapModel.extend('OpenWeatherMapModel', {

        /**
         * Set OpenWeatherMap Latitude
         * @member OpenWeatherMapModel
         * @param {number} latitude
         */
        setOpenWeatherMapLatitude: function setOpenWeatherMapLatitude(latitude) {
            this.setPrefs('openweathermapLatitude', latitude);
        },

        /**
         * Set OpenWeatherMap Longitude
         * @member OpenWeatherMapModel
         * @param {number} longitude
         */
        setOpenWeatherMapLongitude: function setOpenWeatherMapLongitude(longitude) {
            this.setPrefs('openweathermapLongitude', longitude);
        },

        /**
         * Set OpenWeatherMap Zoom
         * @member OpenWeatherMapModel
         * @param {number} zoom
         */
        setOpenWeatherMapZoom: function setOpenWeatherMapZoom(zoom) {
            this.setPrefs('openweathermapZoom', zoom);
        },

        /**
         * Set OpenWeatherMap Width
         * @member OpenWeatherMapModel
         * @param {number} width
         */
        setOpenWeatherMapWidth: function setOpenWeatherMapWidth(width) {
            this.setPrefs('openweathermapWidth', width);
        },

        /**
         * Set OpenWeatherMap Height
         * @member OpenWeatherMapModel
         * @param {number} height
         */
        setOpenWeatherMapHeight: function setOpenWeatherMapHeight(height) {
            this.setPrefs('openweathermapHeight', height);
        },

        /**
         * Set OpenWeatherMap Height
         * @member OpenWeatherMapModel
         * @param {string} type
         */
        setOpenWeatherMapMapType: function setOpenWeatherMapMapType(type) {
            this.setPrefs('openweathermapMapType', type);
        },

        /**
         * Set OpenWeatherMap Scale
         * @member OpenWeatherMapModel
         * @param {boolean} scale
         */
        setOpenWeatherMapScale: function setOpenWeatherMapScale(scale) {
            this.setPrefs('openweathermapScale', scale);
        },

        /**
         * Set OpenWeatherMap Sensor
         * @member OpenWeatherMapModel
         * @param {boolean} sensor
         */
        setOpenWeatherMapGpsSensor: function setOpenWeatherMapGpsSensor(sensor) {
            this.setPrefs('openweathermapGpsSensor', sensor);
        },

        /**
         * Set OpenWeatherMap Stretch
         * @member OpenWeatherMapModel
         * @param {boolean} stretch
         */
        setOpenWeatherMapStretch: function setOpenWeatherMapStretch(stretch) {
            this.setPrefs('openweathermapStretch', stretch);
        }

    }, BaseModel.prototype);
});