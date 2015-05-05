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
    'plugins/widgets/online.friends/element/online.friends.element',
    'plugins/widgets/online.friends/element/online.friends.preferences.element',
    'plugins/widgets/online.friends/element/online.friends.rules.element'
], function defineOnlineFriendsView(BaseView, Header, Footer, OnlineFriendsElement, OnlineFriendsPreferencesElement, OnlineFriendsRulesElement) {

    /**
     * Define view
     * @class OnlineFriendsView
     * @extends BaseView
     * @constructor
     */
    var OnlineFriendsView = function OnlineFriendsView() {
    };

    return OnlineFriendsView.extend('OnlineFriendsView', {

        /**
         * Render online friends element
         * @memberOf OnlineFriendsView
         */
        renderOnlineFriends: function renderOnlineFriends() {

            this.header(Header, this.elements.$container);

            /**
             * Define $onlinefriends
             * @type {OnlineFriendsElement}
             */
            this.elements.$onlinefriends = new OnlineFriendsElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventManager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf OnlineFriendsView
         * @returns {OnlineFriendsPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define OnlineFriends Preferences Element
             * @type {OnlineFriendsPreferencesElement}
             */
            this.elements.$preferences = new OnlineFriendsPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf OnlineFriendsView
         * @param widgetRules
         * @param contentRules
         * @returns {OnlineFriendsRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define OnlineFriends Rules Element
             * @type {OnlineFriendsRulesElement}
             */
            this.elements.$rules = new OnlineFriendsRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render online friends
         * @memberOf OnlineFriendsView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventManager.eventList.successRendered,
                this.renderOnlineFriends.bind(this)
            );
        }

    }, BaseView.prototype)

});