/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineLaimTvEventManager(WidgetContentEventManager) {

  /**
   * Define LaimTv event manager
   * @class LaimTvEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var LaimTvEventManager = function LaimTvEventManager() {

    this.updateEventList({});
  };

  return LaimTvEventManager.extend(
      'LaimTvEventManager', {},
      WidgetContentEventManager.prototype
  );
});
