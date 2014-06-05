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
         * @type {{
         *      youtubeUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            youtubeUrl: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member YoutubeModel
         * @type {{}}
         */
        this.rules = {};
    };

    return YoutubeModel.extend('YoutubeModel', {

        /**
         * Set Youtube Url
         * @member YoutubeModel
         * @param {string} url
         */
        setYoutubeUrl: function setYoutubeUrl(url) {
            this.setPrefs('youtubeUrl', url);
        }

    }, BaseModel.prototype);
});