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
            twitsWidgetId: {
                type: 'text',
                disabled: false,
                value: undefined
            },
            maximumNumberOfTweets: {
                type: 'text',
                disabled: false,
                value: 1
            },
            showHashAsLink: {
                type: 'checkbox',
                disabled: false,
                value: true
            },
            showPhoto: {
                type: 'checkbox',
                disabled: false,
                value: true
            },
            showTime: {
                type: 'checkbox',
                disabled: false,
                value: true
            },
            showRetweets: {
                type: 'checkbox',
                disabled: false,
                value: false
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