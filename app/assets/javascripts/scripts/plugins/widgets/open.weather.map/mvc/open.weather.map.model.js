/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model',
    'plugins/widgets/widget.content.model'
], function defineOpenWeatherMapModel(BaseModel, WidgetContentModel) {

    /**
     * Define OpenWeatherMap model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class OpenWeatherMapModel
     * @constructor
     */
    var OpenWeatherMapModel = function OpenWeatherMapModel() {

        /**
         * Define preferences
         * @memberOf OpenWeatherMapModel
         */
        this.preferences = {
            openweathermapApiKey: {
                type: 'text',
                disabled: true,
                value: '259681e7bb4cfa2cd775fb127d09ca74',
                visible: true
            },
            openweathermapLatitude: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            openweathermapLongitude: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            openweathermapZoom: {
                type: 'text',
                disabled: false,
                value: 14,
                visible: true
            },
            openweathermapWidth: {
                type: 'text',
                disabled: false,
                value: 400,
                visible: true
            },
            openweathermapHeight: {
                type: 'text',
                disabled: false,
                value: 300,
                visible: true
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
                value: 'Roadmap',
                visible: true
            },
            openweathermapGpsSensor: {
                type: 'checkbox',
                disabled: false,
                value: false,
                visible: true
            },
            openweathermapScale: {
                type: 'checkbox',
                disabled: false,
                value: false,
                visible: true
            },
            openweathermapStretch: {
                type: 'checkbox',
                disabled: false,
                value: false,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf OpenWeatherMapModel
         * @type {{}}
         */
        this.rules = {};
    };

    return OpenWeatherMapModel.extend('OpenWeatherMapModel', {

        /**
         * Set OpenWeatherMap API Key
         * @memberOf OpenWeatherMapModel
         * @param {number} key
         */
        setOpenWeatherMapApiKey: function setOpenWeatherMapApiKey(key) {
            this.setPrefs('openweathermapApiKey', key);
        },

        /**
         * Set OpenWeatherMap Latitude
         * @memberOf OpenWeatherMapModel
         * @param {number} latitude
         */
        setOpenWeatherMapLatitude: function setOpenWeatherMapLatitude(latitude) {
            this.setPrefs('openweathermapLatitude', latitude);
        },

        /**
         * Set OpenWeatherMap Longitude
         * @memberOf OpenWeatherMapModel
         * @param {number} longitude
         */
        setOpenWeatherMapLongitude: function setOpenWeatherMapLongitude(longitude) {
            this.setPrefs('openweathermapLongitude', longitude);
        },

        /**
         * Set OpenWeatherMap Zoom
         * @memberOf OpenWeatherMapModel
         * @param {number} zoom
         */
        setOpenWeatherMapZoom: function setOpenWeatherMapZoom(zoom) {
            this.setPrefs('openweathermapZoom', zoom);
        },

        /**
         * Set OpenWeatherMap Width
         * @memberOf OpenWeatherMapModel
         * @param {number} width
         */
        setOpenWeatherMapWidth: function setOpenWeatherMapWidth(width) {
            this.setPrefs('openweathermapWidth', width);
        },

        /**
         * Set OpenWeatherMap Height
         * @memberOf OpenWeatherMapModel
         * @param {number} height
         */
        setOpenWeatherMapHeight: function setOpenWeatherMapHeight(height) {
            this.setPrefs('openweathermapHeight', height);
        },

        /**
         * Set OpenWeatherMap Height
         * @memberOf OpenWeatherMapModel
         * @param {string} type
         */
        setOpenWeatherMapMapType: function setOpenWeatherMapMapType(type) {
            this.setPrefs('openweathermapMapType', type);
        },

        /**
         * Set OpenWeatherMap Scale
         * @memberOf OpenWeatherMapModel
         * @param {boolean} scale
         */
        setOpenWeatherMapScale: function setOpenWeatherMapScale(scale) {
            this.setPrefs('openweathermapScale', scale);
        },

        /**
         * Set OpenWeatherMap Sensor
         * @memberOf OpenWeatherMapModel
         * @param {boolean} sensor
         */
        setOpenWeatherMapGpsSensor: function setOpenWeatherMapGpsSensor(sensor) {
            this.setPrefs('openweathermapGpsSensor', sensor);
        },

        /**
         * Set OpenWeatherMap Stretch
         * @memberOf OpenWeatherMapModel
         * @param {boolean} stretch
         */
        setOpenWeatherMapStretch: function setOpenWeatherMapStretch(stretch) {
            this.setPrefs('openweathermapStretch', stretch);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});