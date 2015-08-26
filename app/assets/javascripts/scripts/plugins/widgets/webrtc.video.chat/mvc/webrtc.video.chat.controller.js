/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineWebrtcVideoChatController(PluginBase, WidgetContentController) {

    /**
     * Define WebrtcVideoChat controller
     * @class WebrtcVideoChatController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var WebrtcVideoChatController = function WebrtcVideoChatController() {
    };

    return WebrtcVideoChatController.extend('WebrtcVideoChatController', {

        /**
         * Set embedded content
         * @memberOf WebrtcVideoChatController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$webrtcvideochat.renderEmbeddedContent();
        },

        /**
         * Define chat login
         * @memberOf WebrtcVideoChatController
         * @param {string} user
         */
        chatLogin: function chatLogin(user) {

            var phone = window.phone = PHONE({
                number: user || "Anonymous", // listen on username line else Anonymous
                publish_key: 'your_pub_key',
                subscribe_key: 'your_sub_key'
            });

            phone.ready(function () {

                this.observer.publish(
                    this.eventmanager.eventList.chatReady
                );

            }.bind(this));

            phone.receive(function (session) {
            });
            return false; 	// So the form does not submit.
        },

        /**
         * Define chat receive
         * @memberOf WebrtcVideoChatController
         * @param session
         */
        chatReceive: function chatReceive(session) {

            session.connected(function (session) {

                this.observer.publish(
                    this.eventmanager.eventList.chatConnected,
                    session
                );
            });

            session.ended(function (session) {

                this.observer.publish(
                    this.eventmanager.eventList.chatReady,
                    session
                );

            }.bind(this));
        },

        /**
         * Define chat connected
         * @memberOf WebrtcVideoChatController
         * @param session
         */
        chatConnected: function chatConnected(session) {
            video_out.appendChild(session.video);
            this.logger.debug('Chat connected', session);
        },

        /**
         * Define chat ended
         * @memberOf WebrtcVideoChatController
         * @param session
         */
        chatEnded: function chatEnded(session) {
            video_out.innerHTML = '';
            this.logger.debug('Chat ended', session);
        },

        /**
         * Define chat ready
         * @memberOf WebrtcVideoChatController
         */
        chatReady: function chatReady() {
            this.logger.debug('Chat ready');
        },

        /**
         * Add WebrtcVideoChat rule
         * @memberOf WebrtcVideoChatController
         * @param e
         */
        addWebrtcVideoChatRule: function addWebrtcVideoChatRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
