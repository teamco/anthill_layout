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
    'plugins/widgets/demo.chat/element/demo.chat.element',
    'plugins/widgets/demo.chat/element/demo.chat.preferences.element',
    'plugins/widgets/demo.chat/element/demo.chat.rules.element'
], function defineDemoChatView(BaseView, Header, Footer, DemoChatElement, DemoChatPreferencesElement, DemoChatRulesElement) {

    /**
     * Define view
     * @class DemoChatView
     * @extends BaseView
     * @constructor
     */
    var DemoChatView = function DemoChatView() {
    };

    return DemoChatView.extend('DemoChatView', {

        /**
         * Render DemoChat element
         * @memberOf DemoChatView
         */
        renderDemoChat: function renderDemoChat() {

            this.header(Header, this.get$container());

            /**
             * Define $demochat
             * @type {DemoChatElement}
             */
            this.elements.$demochat = new DemoChatElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf DemoChatView
         * @returns {DemoChatPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define DemoChat Preferences Element
             * @type {DemoChatPreferencesElement}
             */
            this.elements.$preferences = new DemoChatPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf DemoChatView
         * @param widgetRules
         * @param contentRules
         * @returns {DemoChatRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define DemoChat Rules Element
             * @type {DemoChatRulesElement}
             */
            this.elements.$rules = new DemoChatRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render DemoChat
         * @memberOf DemoChatView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderDemoChat.bind(this)
            );
        }

    }, BaseView.prototype);
});
