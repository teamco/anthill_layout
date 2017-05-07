/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineScreenrEventManager(WidgetContentEventManager) {

  /**
   * Define Screenr event manager
   * @class ScreenrEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var ScreenrEventManager = function ScreenrEventManager() {

    this.updateEventList({});
  };

  return ScreenrEventManager.extend('ScreenrEventManager', {},
      WidgetContentEventManager.prototype);
});
