/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineXVideosEventManager(WidgetContentEventManager) {

  /**
   * Define XVideos event manager
   * @class XVideosEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var XVideosEventManager = function XVideosEventManager() {

    this.updateEventList({});
  };

  return XVideosEventManager.extend('XVideosEventManager', {},
      WidgetContentEventManager.prototype);
});
