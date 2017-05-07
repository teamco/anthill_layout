/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineIctvEventManager(WidgetContentEventManager) {

  /**
   * Define Ictv event manager
   * @class IctvEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var IctvEventManager = function IctvEventManager() {

    this.updateEventList({});
  };

  return IctvEventManager.extend('IctvEventManager', {},
      WidgetContentEventManager.prototype);
});
