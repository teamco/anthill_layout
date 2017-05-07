/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineIsnareEventManager(WidgetContentEventManager) {

  /**
   * Define Isnare event manager
   * @class IsnareEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var IsnareEventManager = function IsnareEventManager() {

    this.updateEventList({});
  };

  return IsnareEventManager.extend('IsnareEventManager', {},
      WidgetContentEventManager.prototype);
});
