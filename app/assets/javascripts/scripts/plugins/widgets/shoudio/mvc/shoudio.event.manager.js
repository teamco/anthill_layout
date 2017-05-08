/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineShoudioEventManager(WidgetContentEventManager) {

  /**
   * Define Shoudio event manager
   * @class ShoudioEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var ShoudioEventManager = function ShoudioEventManager() {

    this.updateEventList({});
  };

  return ShoudioEventManager.extend(
      'ShoudioEventManager', {},
      WidgetContentEventManager.prototype
  );
});
