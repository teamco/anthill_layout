/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineSwayEventManager(WidgetContentEventManager) {

  /**
   * Define Sway event manager
   * @class SwayEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var SwayEventManager = function SwayEventManager() {

    this.updateEventList({});
  };

  return SwayEventManager.extend(
      'SwayEventManager', {},
      WidgetContentEventManager.prototype
  );
});
