/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineVideoPayNetEventManager(WidgetContentEventManager) {

  /**
   * Define VideoPayNet event manager
   * @class VideoPayNetEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var VideoPayNetEventManager = function VideoPayNetEventManager() {

    this.updateEventList({});
  };

  return VideoPayNetEventManager.extend('VideoPayNetEventManager', {},
      WidgetContentEventManager.prototype);
});
