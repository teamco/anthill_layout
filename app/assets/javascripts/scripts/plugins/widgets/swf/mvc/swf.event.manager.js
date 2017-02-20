/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineSwfEventManager(WidgetContentEventManager) {

  /**
   * Define Swf event manager
   * @class SwfEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var SwfEventManager = function SwfEventManager() {

    this.updateEventList({});
  };

  return SwfEventManager.extend('SwfEventManager', {},
      WidgetContentEventManager.prototype);
});