/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineKickStarterEventManager(WidgetContentEventManager) {

  /**
   * Define KickStarter event manager
   * @class KickStarterEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var KickStarterEventManager = function KickStarterEventManager() {

    this.updateEventList({});
  };

  return KickStarterEventManager.extend('KickStarterEventManager', {},
      WidgetContentEventManager.prototype);
});
