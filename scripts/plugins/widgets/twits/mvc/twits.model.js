/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function defineTwitsModel(BaseModel) {

    /**
     * Define Twits model
     * @extends BaseModel
     * @class TwitsModel
     * @constructor
     */
    var TwitsModel = function TwitsModel() {

        /**
         * Define preferences
         * @member TwitsModel
         * @type {{
         *      twitsUrl: {}
         * }}
         */
        this.preferences = {
            twitsUrl: {
                type: 'text',
                disabled: false,
                value: undefined
            }
        };

        /**
         * Define rules
         * @member TwitsModel
         * @type {{}}
         */
        this.rules = {};
    };

    return TwitsModel.extend('TwitsModel', {

        /**
         * Set Twits Url
         * @member TwitsModel
         * @param {string} url
         */
        setTwitsUrl: function setTwitsUrl(url) {
            this.setPrefs('twitsUrl', url);
        }

    }, BaseModel.prototype);
});