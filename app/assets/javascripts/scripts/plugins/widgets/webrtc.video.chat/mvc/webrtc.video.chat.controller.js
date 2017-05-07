/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineWebrtcVideoChatController(PluginBase,
    WidgetContentController) {

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
      this.view.elements.$webrtcvideochat.renderEmbeddedContent(
          this.model.getPrefs('webrtcvideochatPubNub'),
          this.model.getPrefs('webrtcvideochatWebRtc')
      );
    },

    /**
     * Define chat login
     * @memberOf WebrtcVideoChatController
     * @param {string} user
     */
    chatLogin: function chatLogin(user) {

      var phone = window.phone = PHONE({
        number: user || "Anonymous", // listen on username line else Anonymous
        publish_key: this.model.getPrefs('webrtcvideochatPublish'),
        subscribe_key: this.model.getPrefs('webrtcvideochatSubscribe')
      });

      /**
       * Get scope
       * @type {WebrtcVideoChat}
       */
      var scope = this;

      phone.ready(function () {
        scope.observer.publish(
            scope.eventmanager.eventList.chatReady
        );
      });

      phone.receive(function (session) {
        scope.observer.publish(
            scope.eventmanager.eventList.chatReceive,
            session
        );
      });
    },

    /**
     * Define chat receive
     * @memberOf WebrtcVideoChatController
     * @param session
     */
    chatReceive: function chatReceive(session) {

      /**
       * Get scope
       * @type {WebrtcVideoChat}
       */
      var scope = this;

      session.connected(function (session) {
        scope.observer.publish(
            scope.eventmanager.eventList.chatConnected,
            session
        );
      });

      session.ended(function (session) {
        scope.observer.publish(
            scope.eventmanager.eventList.chatReady,
            session
        );
      });
    },

    /**
     * Define chat connected
     * @memberOf WebrtcVideoChatController
     * @param session
     */
    chatConnected: function chatConnected(session) {
      this.view.get$item().appendVideo(session.video);
      this.logger.debug('Chat connected', session);
    },

    /**
     * Define chat ended
     * @memberOf WebrtcVideoChatController
     * @param session
     */
    chatEnded: function chatEnded(session) {
      this.logger.debug('Chat ended', session);
      this.observer.publish(
          this.eventmanager.eventList.setEmbeddedContent
      );
    },

    /**
     * Define chat ready
     * @memberOf WebrtcVideoChatController
     */
    chatReady: function chatReady() {
      this.logger.debug('Chat ready');
    },

    /**
     * Define do login
     * @memberOf WebrtcVideoChatController
     * @param {Event} e
     */
    doLogin: function doLogin(e) {

      /**
       * Get scope
       * @type {WebrtcVideoChat}
       */
      var scope = this.scope,
          login = scope.view.get$item().fetchValue('$loginField');

      scope.logger.debug('Login received', e, login);

      if (login.length) {
        scope.observer.publish(
            scope.eventmanager.eventList.chatLogin,
            login
        );
      }
    },

    /**
     * Define do call
     * @memberOf WebrtcVideoChatController
     * @param {Event} e
     */
    doCall: function doCall(e) {

      /**
       * Get scope
       * @type {WebrtcVideoChat}
       */
      var scope = this.scope,
          call = scope.view.get$item().fetchValue('$callField');

      scope.logger.debug('Call received', e, call);

      if (call.length) {
        scope.observer.publish(
            scope.eventmanager.eventList.chatCall,
            call
        );
      }
    },

    /**
     * Define chat call
     * @memberOf WebrtcVideoChatController
     * @param {string} user
     */
    chatCall: function chatCall(user) {

      if (!window.phone) {
        this.logger.warn('Login first');
        return false;
      }

      phone.dial(user);
    },

    /**
     * Add WebrtcVideoChat rule
     * @memberOf WebrtcVideoChatController
     * @param {Event} e
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
          [$button.attr('value'), this.scope.name]
      );
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
