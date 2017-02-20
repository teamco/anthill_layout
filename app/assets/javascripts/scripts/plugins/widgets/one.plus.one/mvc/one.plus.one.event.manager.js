/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineOnePlusOneEventManager(WidgetContentEventManager) {

  /**
   * Define OnePlusOne event manager
   * @class OnePlusOneEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var OnePlusOneEventManager = function OnePlusOneEventManager() {

    this.updateEventList({});
  };

  return OnePlusOneEventManager.extend('OnePlusOneEventManager', {},
      WidgetContentEventManager.prototype);
});
