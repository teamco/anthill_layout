/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineAliezTvEventManager(WidgetContentEventManager) {

  /**
   * Define AliezTv event manager
   * @class AliezTvEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var AliezTvEventManager = function AliezTvEventManager() {

    this.updateEventList({});
  };

  return AliezTvEventManager.extend(
      'AliezTvEventManager', {},
      WidgetContentEventManager.prototype
  );
});
