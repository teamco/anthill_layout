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
         *      youtubeUrl: {}
         * }}
         */
        this.preferences = {
            youtubeUrl: {
                type: 'text',
                disabled: false,
                value: undefined
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
         * Set Geolocation Url
         * @member GeolocationModel
         * @param {string} url
         */
        setGeolocationUrl: function setGeolocationUrl(url) {
            this.setPrefs('youtubeUrl', url);
        }

    }, BaseModel.prototype);
});