/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineIceFloeEventManager(WidgetContentEventManager) {

  /**
   * Define IceFloe event manager
   * @class IceFloeEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var IceFloeEventManager = function IceFloeEventManager() {

    this.updateEventList({});
  };

  return IceFloeEventManager.extend('IceFloeEventManager', {},
      WidgetContentEventManager.prototype);
});