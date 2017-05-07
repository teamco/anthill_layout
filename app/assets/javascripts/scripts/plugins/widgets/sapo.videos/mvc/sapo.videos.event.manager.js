/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineSapoVideosEventManager(WidgetContentEventManager) {

  /**
   * Define SapoVideos event manager
   * @class SapoVideosEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var SapoVideosEventManager = function SapoVideosEventManager() {

    this.updateEventList({});
  };

  return SapoVideosEventManager.extend(
      'SapoVideosEventManager', {},
      WidgetContentEventManager.prototype
  );
});
