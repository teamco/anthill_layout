/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function defineYoutubeModel(BaseModel) {

    /**
     * Define Youtube model
     * @extends BaseModel
     * @class YoutubeModel
     * @constructor
     */
    var YoutubeModel = function YoutubeModel() {

        /**
         * Define preferences
         * @member YoutubeModel
         * @type {{url: string}}
         */
        this.preferences = {
            url: undefined
        };
    };

    return YoutubeModel.extend('YoutubeModel', {

        /**
         * Get URL
         * @member YoutubeModel
         * @returns {string}
         */
        getUrl: function getUrl() {
            return this.preferences.url;
        },

        /**
         * Set URL
         * @member YoutubeModel
         * @param {string} url
         */
        setUrl: function setUrl(url) {

            /**
             * Define URL
             * @type {string}
             */
            this.preferences.url = url;
        }

    }, BaseModel.prototype);
});