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
], function defineVideoPayNetModel(BaseModel, WidgetContentModel) {

    /**
     * Define VideoPayNet model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class VideoPayNetModel
     * @constructor
     */
    var VideoPayNetModel = function VideoPayNetModel() {

        /**
         * Define preferences
         * @member VideoPayNetModel
         * @type {{
         *      videopaynetBitlyUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetBloggerUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetCiteulikeUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetDailymotionUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetDeliciousUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetDeviantArtUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetDribbbleUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetFacebookPageUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetFlickrUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetFormspringUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetForrstUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetGithubUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetGimmebarUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetGooglePlusUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetGooglePlusKey: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetInstapaperUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetIusethisUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetLastFmUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetLibraryThingUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetMisoUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetMlkshkUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetPinboardUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetPosterousUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetRedditUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetRssUrl: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetSlideshareUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetSnipplrUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetStackoverflowUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetTumblrUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetTwitterUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetVimeoUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetWikipediaUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetWikipediaLanguage: {type: string, disabled: boolean, value: string, visible: boolean},
         *      videopaynetWordpressUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetYoutubeUser: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      videopaynetZoteroUser: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            videopaynetBitlyUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetBloggerUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetCiteulikeUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetDailymotionUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetDeliciousUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            // If you want to fetch your main gallery use your DeviantART nickname.
            // To fetch a gallery folder, add the id after a slash character.
            // Example:
            // Pick the gallery folder url: e.g.
            // http://giuliom.deviantart.com/gallery/30227724 .
            // Append the id, which is 30227724, to your nick obtaining
            // something like 'mgiulio/30227724'
            videopaynetDeviantArtUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetDribbbleUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetFacebookPageUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            // find your flickr id @
            // http://www.flickr.com/services/api/explore/?method=flickr.people.findByUsername
            videopaynetFlickrUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetFormspringUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetForrstUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetGithubUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetGimmebarUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            // Change the key when you're using it on your own website
            // You can create one on https://code.google.com/apis/console
            videopaynetGooglePlusUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetGooglePlusKey: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            // Go to instapaper.com, click Liked and open rss feed,
            // copy last two parts of the url including the slash
            videopaynetInstapaperUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetIusethisUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetLastFmUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetLibraryThingUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            // Go to http://www.gomiso.com/
            // e.g. <meta name="user" content="388629" />
            videopaynetMisoUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetMlkshkUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetPinboardUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetPosterousUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetRedditUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetRssUrl: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetSlideshareUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetSnipplrUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            // Run javascript:alert(userid); when you're logged in at stackoverflow
            videopaynetStackoverflowUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetTumblrUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetTwitterUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetVimeoUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetWikipediaUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetWordpressUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetYoutubeUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            videopaynetZoteroUser: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            // [language] Optional setting, defaults to 'en'.
            // Use wikipedia local site prefix (e.g. 'de' for German)
            videopaynetWikipediaLanguage: {
                type: 'text',
                disabled: false,
                value: 'en',
                visible: false
            }
        };

        /**
         * Define rules
         * @member VideoPayNetModel
         * @type {{}}
         */
        this.rules = {};

        this.initSetters();
    };

    return VideoPayNetModel.extend('VideoPayNetModel', {

        /**
         * Define init setters
         * @member VideoPayNetModel
         */
        initSetters: function initSetters() {

            var prefs = this.preferences,
                index;

            /**
             * Define function
             * @param {string} index
             * @returns {Function}
             * @private
             */
            function _defineFunction(index) {
                return (
                    new Function(
                        [
                            'return function set',
                            index.capitalize(),
                            '(user){this.setPrefs("',
                            index,
                            '",user);}'
                        ].join('')
                    )
                )();
            }

            for (index in prefs) {
                if (prefs.hasOwnProperty(index) && index.match(/User/)) {

                    /**
                     * Define setter
                     * @member VideoPayNetModel
                     * @type {Function}
                     */
                    this.constructor.prototype['set' + index.capitalize()] =
                        _defineFunction(index)
                }
            }
        },

        /**
         * Define setVideoPayNetGooglePlusKey
         * @member VideoPayNetModel
         * @param {string} user
         */
        setVideoPayNetGooglePlusKey: function setVideoPayNetGooglePlusKey(user) {
            this.setPrefs('videopaynetGooglePlusKey', user);
        },

        /**
         * Define setVideoPayNetRssUrl
         * @member VideoPayNetModel
         * @param {string} user
         */
        setVideoPayNetRssUrl: function setVideoPayNetRssUrl(user) {
            this.setPrefs('videopaynetRssUrl', user);
        },

        /**
         * Define setVideoPayNetWikipediaLanguage
         * @member VideoPayNetModel
         * @param {string} user
         */
        setVideoPayNetWikipediaLanguage: function setVideoPayNetWikipediaLanguage(user) {
            this.setPrefs('videopaynetWikipediaLanguage', user);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
