/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function defineRssModel(BaseModel) {

    /**
     * Define Rss model
     * @extends BaseModel
     * @class RssModel
     * @constructor
     */
    var RssModel = function RssModel() {

        /**
         * Define preferences
         * @member RssModel
         * @type {{
         *      rssUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            rssFeedUrl: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member RssModel
         * @type {{}}
         */
        this.rules = {};
    };

    return RssModel.extend('RssModel', {

        /**
         * Set Rss Feed Url
         * @member RssModel
         * @param {string} url
         */
        setRssFeedUrl: function setRssFeedUrl(url) {
            this.setPrefs('rssFeedUrl', url);
        }

    }, BaseModel.prototype);
});