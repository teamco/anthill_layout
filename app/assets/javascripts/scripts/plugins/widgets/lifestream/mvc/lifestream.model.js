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
], function defineLifestreamModel(BaseModel, WidgetContentModel) {

  /**
   * Define Lifestream model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class LifestreamModel
   * @constructor
   */
  var LifestreamModel = function LifestreamModel() {

    /**
     * Define preferences
     * @memberOf LifestreamModel
     * @type {{
     *      lifestreamBitlyUser: {type: string, disabled: boolean, value:
     *     undefined, visible: boolean}, lifestreamBloggerUser: {type:
     *     string, disabled: boolean, value: undefined, visible: boolean},
     *     lifestreamCiteulikeUser: {type: string, disabled: boolean,
     *     value: undefined, visible: boolean}, lifestreamDailymotionUser:
     *     {type: string, disabled: boolean, value: undefined, visible:
     *     boolean}, lifestreamDeliciousUser: {type: string, disabled:
     *     boolean, value: undefined, visible: boolean},
     *     lifestreamDeviantArtUser: {type: string, disabled: boolean,
     *     value: undefined, visible: boolean}, lifestreamDribbbleUser:
     *     {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamFacebookPageUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamFlickrUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamFormspringUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamForrstUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamGithubUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamGimmebarUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamGooglePlusUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamGooglePlusKey: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamInstapaperUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamIusethisUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamLastFmUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamLibraryThingUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamMisoUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamMlkshkUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamPinboardUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamPosterousUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamRedditUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamRssUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamSlideshareUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamSnipplrUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamStackoverflowUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamTumblrUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamTwitterUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamVimeoUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamWikipediaUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamWikipediaLanguage: {type: string, disabled: boolean, value: string, visible: boolean}, lifestreamWordpressUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamYoutubeUser: {type: string, disabled: boolean, value: undefined, visible: boolean}, lifestreamZoteroUser: {type: string, disabled: boolean, value: undefined, visible: boolean}
     * }}
     */
    this.preferences = {
      lifestreamBitlyUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamBloggerUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamCiteulikeUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamDailymotionUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamDeliciousUser: {
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
      lifestreamDeviantArtUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamDribbbleUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamFacebookPageUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      // find your flickr id @
      // http://www.flickr.com/services/api/explore/?method=flickr.people.findByUsername
      lifestreamFlickrUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamFormspringUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamForrstUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamGithubUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamGimmebarUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      // Change the key when you're using it on your own website
      // You can create one on https://code.google.com/apis/console
      lifestreamGooglePlusUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamGooglePlusKey: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      // Go to instapaper.com, click Liked and open rss feed,
      // copy last two parts of the url including the slash
      lifestreamInstapaperUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamIusethisUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamLastFmUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamLibraryThingUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      // Go to http://www.gomiso.com/
      // e.g. <meta name="user" content="388629" />
      lifestreamMisoUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamMlkshkUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamPinboardUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamPosterousUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamRedditUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamRssUrl: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamSlideshareUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamSnipplrUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      // Run javascript:alert(userid); when you're logged in at stackoverflow
      lifestreamStackoverflowUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamTumblrUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamTwitterUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamVimeoUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamWikipediaUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamWordpressUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamYoutubeUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      lifestreamZoteroUser: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      // [language] Optional setting, defaults to 'en'.
      // Use wikipedia local site prefix (e.g. 'de' for German)
      lifestreamWikipediaLanguage: {
        type: 'text',
        disabled: false,
        value: 'en',
        visible: false
      }
    };

    /**
     * Define rules
     * @memberOf LifestreamModel
     * @type {{}}
     */
    this.rules = {};

    this.initSetters();
  };

  return LifestreamModel.extend('LifestreamModel', {

    /**
     * Define init setters
     * @memberOf LifestreamModel
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
           * @memberOf LifestreamModel
           * @type {Function}
           */
          this.constructor.prototype['set' + index.capitalize()] =
              _defineFunction(index)
        }
      }
    },

    /**
     * Define setLifestreamGooglePlusKey
     * @memberOf LifestreamModel
     * @param {string} user
     */
    setLifestreamGooglePlusKey: function setLifestreamGooglePlusKey(user) {
      this.setPrefs('lifestreamGooglePlusKey', user);
    },

    /**
     * Define setLifestreamRssUrl
     * @memberOf LifestreamModel
     * @param {string} user
     */
    setLifestreamRssUrl: function setLifestreamRssUrl(user) {
      this.setPrefs('lifestreamRssUrl', user);
    },

    /**
     * Define setLifestreamWikipediaLanguage
     * @memberOf LifestreamModel
     * @param {string} user
     */
    setLifestreamWikipediaLanguage: function setLifestreamWikipediaLanguage(user) {
      this.setPrefs('lifestreamWikipediaLanguage', user);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
