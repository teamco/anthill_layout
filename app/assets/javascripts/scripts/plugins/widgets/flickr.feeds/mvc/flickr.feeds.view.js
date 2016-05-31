/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/View',
    'element/header.element',
    'element/footer.element',
    'plugins/widgets/flickr.feeds/element/flickr.feeds.element',
    'plugins/widgets/flickr.feeds/element/flickr.feeds.preferences.element',
    'plugins/widgets/flickr.feeds/element/flickr.feeds.rules.element'
], function defineFlickrFeedsView(BaseView, Header, Footer, FlickrFeedsElement, FlickrFeedsPreferencesElement, FlickrFeedsRulesElement) {

    /**
     * Define view
     * @class FlickrFeedsView
     * @extends BaseView
     * @constructor
     */
    var FlickrFeedsView = function FlickrFeedsView() {
    };

    return FlickrFeedsView.extend('FlickrFeedsView', {

        /**
         * Render FlickrFeeds element
         * @memberOf FlickrFeedsView
         */
        renderFlickrFeeds: function renderFlickrFeeds() {

            this.header(Header, this.get$container());

            /**
             * Define $flickrfeeds
             * @type {FlickrFeedsElement}
             */
            this.elements.$flickrfeeds = new FlickrFeedsElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf FlickrFeedsView
         * @returns {FlickrFeedsPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define FlickrFeeds Preferences Element
             * @type {FlickrFeedsPreferencesElement}
             */
            this.elements.$preferences = new FlickrFeedsPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf FlickrFeedsView
         * @param widgetRules
         * @param contentRules
         * @returns {FlickrFeedsRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define FlickrFeeds Rules Element
             * @type {FlickrFeedsRulesElement}
             */
            this.elements.$rules = new FlickrFeedsRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render FlickrFeeds
         * @memberOf FlickrFeedsView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderFlickrFeeds.bind(this)
            );
        }

    }, BaseView.prototype)

});
