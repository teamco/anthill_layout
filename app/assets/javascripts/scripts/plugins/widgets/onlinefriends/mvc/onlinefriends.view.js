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
    'plugins/widgets/onlinefriends/element/onlinefriends.element',
    'plugins/widgets/onlinefriends/element/onlinefriends.preferences.element',
    'plugins/widgets/onlinefriends/element/onlinefriends.rules.element'
], function defineOnlinefriendsView(BaseView, Header, Footer, OnlinefriendsElement, OnlinefriendsPreferencesElement, OnlinefriendsRulesElement) {

    /**
     * Define view
     * @class OnlinefriendsView
     * @extends BaseView
     * @constructor
     */
    var OnlinefriendsView = function OnlinefriendsView() {
    };

    return OnlinefriendsView.extend('OnlinefriendsView', {

        /**
         * Render onlinefriends element
         * @member OnlinefriendsView
         */
        renderOnlinefriends: function renderOnlinefriends() {

            this.header(Header, this.elements.$container);

            /**
             * Define $onlinefriends
             * @type {OnlinefriendsElement}
             */
            this.elements.$onlinefriends = new OnlinefriendsElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @member OnlinefriendsView
         * @returns {OnlinefriendsPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Onlinefriends Preferences Element
             * @type {OnlinefriendsPreferencesElement}
             */
            this.elements.$preferences = new OnlinefriendsPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member OnlinefriendsView
         * @param widgetRules
         * @param contentRules
         * @returns {OnlinefriendsRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Onlinefriends Rules Element
             * @type {OnlinefriendsRulesElement}
             */
            this.elements.$rules = new OnlinefriendsRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render onlinefriends
         * @member OnlinefriendsView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderOnlinefriends.bind(this)
            );
        }

    }, BaseView.prototype)

});