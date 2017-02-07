/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineWebrtcVideoChatEventManager(WidgetContentEventManager) {

  /**
   * Define WebrtcVideoChat event manager
   * @class WebrtcVideoChatEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var WebrtcVideoChatEventManager = function WebrtcVideoChatEventManager() {

    this.updateEventList({
      chatLogin: 'chat.login',
      chatReady: 'chat.ready',
      chatReceive: 'chat.receive',
      chatCall: 'chat.call',
      chatConnected: 'chat.connected',
      chatEnded: 'chat.ended'
    });
  };

  return WebrtcVideoChatEventManager.extend('WebrtcVideoChatEventManager', {},
      WidgetContentEventManager.prototype);
});
