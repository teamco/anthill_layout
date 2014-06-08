/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
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
         *      twitsWidgetId: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      maximumNumberOfTweets: {type: string, disabled: boolean, value: number, visible: boolean},
         *      showHashAsLink: {type: string, disabled: boolean, value: boolean, visible: boolean},
         *      showPhoto: {type: string, disabled: boolean, value: boolean, visible: boolean},
         *      showTime: {type: string, disabled: boolean, value: boolean, visible: boolean},
         *      showRetweets: {type: string, disabled: boolean, value: boolean, visible: boolean}
         * }}
         */
        this.preferences = {
            twitsWidgetId: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            maximumNumberOfTweets: {
                type: 'text',
                disabled: false,
                value: 1,
                visible: true
            },
            showHashAsLink: {
                type: 'checkbox',
                disabled: false,
                value: true,
                visible: true
            },
            showPhoto: {
                type: 'checkbox',
                disabled: false,
                value: true,
                visible: true
            },
            showTime: {
                type: 'checkbox',
                disabled: false,
                value: true,
                visible: true
            },
            showRetweets: {
                type: 'checkbox',
                disabled: false,
                value: false,
                visible: true
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
         * Set Twits widget id
         * @member TwitsModel
         * @param {string} id
         */
        setTwitsWidgetId: function setTwitsWidgetId(id) {
            this.setPrefs('twitsWidgetId', id);
        },

        /**
         * Set max number of tweets
         * @member TwitsModel
         * @param {string} tweets
         */
        setMaximumNumberOfTweets: function setMaximumNumberOfTweets(tweets) {
            this.setPrefs('maximumNumberOfTweets', tweets);
        },

        /**
         * Set show hash as link
         * @member TwitsModel
         * @param {boolean} hash
         */
        setShowHashAsLink: function setShowHashAsLink(hash) {
            this.setPrefs('showHashAsLink', hash);
        },

        /**
         * Set show photo
         * @member TwitsModel
         * @param {boolean} photo
         */
        setShowPhoto: function setShowPhoto(photo) {
            this.setPrefs('showPhoto', photo);
        },

        /**
         * Set show time
         * @member TwitsModel
         * @param {boolean} time
         */
        setShowTime: function setShowTime(time) {
            this.setPrefs('showTime', time);
        },

        /**
         * Set show retweets
         * @member TwitsModel
         * @param {boolean} retweets
         */
        setShowRetweets: function setShowRetweets(retweets) {
            this.setPrefs('showRetweets', retweets);
        }

    }, BaseModel.prototype);
});