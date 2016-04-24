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
    'plugins/widgets/facebook.embedded.posts/element/facebook.embedded.posts.element',
    'plugins/widgets/facebook.embedded.posts/element/facebook.embedded.posts.preferences.element',
    'plugins/widgets/facebook.embedded.posts/element/facebook.embedded.posts.rules.element'
], function defineFacebookEmbeddedPostsView(BaseView, Header, Footer, FacebookEmbeddedPostsElement, FacebookEmbeddedPostsPreferencesElement, FacebookEmbeddedPostsRulesElement) {

    /**
     * Define view
     * @class FacebookEmbeddedPostsView
     * @extends BaseView
     * @constructor
     */
    var FacebookEmbeddedPostsView = function FacebookEmbeddedPostsView() {
    };

    return FacebookEmbeddedPostsView.extend('FacebookEmbeddedPostsView', {

        /**
         * Render FacebookEmbeddedPosts element
         * @memberOf FacebookEmbeddedPostsView
         */
        renderFacebookEmbeddedPosts: function renderFacebookEmbeddedPosts() {

            this.header(Header, this.get$container());

            /**
             * Define $facebookembeddedposts
             * @type {FacebookEmbeddedPostsElement}
             */
            this.elements.$facebookembeddedposts = new FacebookEmbeddedPostsElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf FacebookEmbeddedPostsView
         * @returns {FacebookEmbeddedPostsPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define FacebookEmbeddedPosts Preferences Element
             * @type {FacebookEmbeddedPostsPreferencesElement}
             */
            this.elements.$preferences = new FacebookEmbeddedPostsPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf FacebookEmbeddedPostsView
         * @param widgetRules
         * @param contentRules
         * @returns {FacebookEmbeddedPostsRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define FacebookEmbeddedPosts Rules Element
             * @type {FacebookEmbeddedPostsRulesElement}
             */
            this.elements.$rules = new FacebookEmbeddedPostsRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render FacebookEmbeddedPosts
         * @memberOf FacebookEmbeddedPostsView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderFacebookEmbeddedPosts.bind(this)
            );
        }

    }, BaseView.prototype);
});
