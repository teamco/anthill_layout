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
], function defineFlickrFeedsModel(BaseModel, WidgetContentModel) {

    /**
     * Define FlickrFeeds model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class FlickrFeedsModel
     * @constructor
     */
    var FlickrFeedsModel = function FlickrFeedsModel() {

        /**
         * Define preferences
         * @memberOf FlickrFeedsModel
         * @type {{
         *      flickrfeedsServices: {
         *          type: string,
         *          list: {
         *              type: string,
         *              value: string,
         *              tooltip: string
         *          }[],
         *          value: undefined,
         *          placeholder: string,
         *          disabled: boolean,
         *          visible: boolean
         *      }
         * }}
         */
        this.preferences = {
            flickrfeedsServices: {
                type: 'combobox',
                list: [
                    {
                        type: 'text',
                        value: 'Public feed',
                        url: 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?',
                        query: 'tags', // (Optional) A comma delimited list of tags to filter the feed by
                        tooltip: 'Returns a list of public content matching some criteria'
                    },
                    {
                        type: 'text',
                        value: 'Recent activity on your photostream feed',
                        url: 'https://api.flickr.com/services/feeds/activity.gne?jsoncallback=?',
                        query: 'user_id', // (Required) A single user ID. This specifies a user to fetch for
                        tooltip: 'Returns a list of recent comments on photostream and sets belonging to a given user'
                    },
                    {
                        type: 'text',
                        value: 'Friends\' feed',
                        url: 'https://api.flickr.com/services/feeds/photos_friends.gne?jsoncallback=?',
                        query: 'user_id', // (Required) The user ID of the user to fetch friends photos and videos for
                        tooltip: 'Returns a list of public content from the contacts, friends & family of a given person'
                    },
                    {
                        type: 'text',
                        value: 'Favorite photos feed',
                        url: 'https://api.flickr.com/services/feeds/photos_faves.gne?jsoncallback=?',
                        query: 'id', // (Required) A single user ID. This specifies a user to fetch for
                        tooltip: 'Returns a list of public favorites for a given user'
                    },
                    {
                        type: 'text',
                        value: 'Group discussions feed',
                        url: 'https://api.flickr.com/services/feeds/groups_discuss.gne?jsoncallback=?',
                        query: 'id', // (Required) A single user ID. This specifies a user to fetch for
                        tooltip: 'Returns a list of recent discussions in a given group'
                    },
                    {
                        type: 'text',
                        value: 'Group pool feed',
                        url: 'https://api.flickr.com/services/feeds/groups_pool.gne?jsoncallback=?',
                        query: 'id', // (Required) A single user ID. This specifies a user to fetch for
                        tooltip: 'Returns a list of things recently added to the pool of a given group'
                    },
                    {
                        type: 'text',
                        value: 'Forum discussion feed',
                        url: 'https://api.flickr.com/services/feeds/forums.gne?jsoncallback=?',
                        tooltip: 'Returns a list of recent topics from the forum'
                    },
                    {
                        type: 'text',
                        value: 'Recent comments you made feed',
                        url: 'https://api.flickr.com/services/feeds/photos_comments.gne?jsoncallback=?',
                        query: 'user_id', // (Required) A single user ID. This specifies a user to fetch for
                        tooltip: 'Returns a list of recent comments that have been commented on by a given person'
                    }
                ],
                value: undefined,
                placeholder: true,
                disabled: false,
                visible: true
            },
            flickrfeedsTags: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            flickrfeedsUserId: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            flickrfeedsMaxItems: {
                type: 'number',
                disabled: false,
                value: 6,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf FlickrFeedsModel
         * @type {{}}
         */
        this.rules = {};
    };

    return FlickrFeedsModel.extend('FlickrFeedsModel', {

        /**
         * Define setFlickrfeedsServices
         * @memberOf FlickrFeedsModel
         * @param {string} service
         */
        setFlickrfeedsServices: function setFlickrfeedsServices(service) {
            this.setPrefs('flickrfeedsServices', service);
        },

        /**
         * Define setFlickrfeedsTags
         * @memberOf FlickrFeedsModel
         * @param {string} tags
         */
        setFlickrfeedsTags: function setFlickrfeedsTags(tags) {
            this.setPrefs('flickrfeedsTags', tags);
        },

        /**
         * Define setFlickrfeedsUserId
         * @memberOf FlickrFeedsModel
         * @param {string} user
         */
        setFlickrfeedsUserId: function setFlickrfeedsUserId(user) {
            this.setPrefs('flickrfeedsUserId', user);
        },

        /**
         * Define setFlickrfeedsMaxItems
         * @memberOf FlickrFeedsModel
         * @param {number} max
         */
        setFlickrfeedsMaxItems: function setFlickrfeedsMaxItems(max) {
            this.setPrefs('flickrfeedsMaxItems', max);
        },

        /**
         * Get list object by selected value
         * @returns {*}
         */
        getListObjectBySelectedValue: function getListObjectBySelectedValue() {

            // Get value
            var value = this.getPrefs('flickrfeedsServices'),
                list = this.preferences.flickrfeedsServices.list;

            return (list.filter(
                function filter(item) {
                    if (item.value === value) {
                        return item;
                    }
                }
            ) || [])[0];
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
