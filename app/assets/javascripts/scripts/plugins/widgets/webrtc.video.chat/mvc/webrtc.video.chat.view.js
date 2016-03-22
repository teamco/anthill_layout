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
    'plugins/widgets/webrtc.video.chat/element/webrtc.video.chat.element',
    'plugins/widgets/webrtc.video.chat/element/webrtc.video.chat.preferences.element',
    'plugins/widgets/webrtc.video.chat/element/webrtc.video.chat.rules.element'
], function defineWebrtcVideoChatView(BaseView, Header, Footer, WebrtcVideoChatElement, WebrtcVideoChatPreferencesElement, WebrtcVideoChatRulesElement) {

    /**
     * Define view
     * @class WebrtcVideoChatView
     * @extends BaseView
     * @constructor
     */
    var WebrtcVideoChatView = function WebrtcVideoChatView() {
    };

    return WebrtcVideoChatView.extend('WebrtcVideoChatView', {

        /**
         * Render WebrtcVideoChat element
         * @memberOf WebrtcVideoChatView
         */
        renderWebrtcVideoChat: function renderWebrtcVideoChat() {

            this.header(Header, this.get$container());

            /**
             * Define $webrtcvideochat
             * @type {WebrtcVideoChatElement}
             */
            this.elements.$webrtcvideochat = new WebrtcVideoChatElement(this, {
                $container: this.get$container().$,
                id: this.createUUID()
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf WebrtcVideoChatView
         * @returns {WebrtcVideoChatPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define WebrtcVideoChat Preferences Element
             * @type {WebrtcVideoChatPreferencesElement}
             */
            this.elements.$preferences = new WebrtcVideoChatPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf WebrtcVideoChatView
         * @param widgetRules
         * @param contentRules
         * @returns {WebrtcVideoChatRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define WebrtcVideoChat Rules Element
             * @type {WebrtcVideoChatRulesElement}
             */
            this.elements.$rules = new WebrtcVideoChatRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render WebrtcVideoChat
         * @memberOf WebrtcVideoChatView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderWebrtcVideoChat.bind(this)
            );
        }

    }, BaseView.prototype);
});
