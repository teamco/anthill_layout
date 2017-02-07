/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineClocklinkEventManager(WidgetContentEventManager) {

  /**
   * Define Clocklink event manager
   * @class ClocklinkEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var ClocklinkEventManager = function ClocklinkEventManager() {

    this.updateEventList({});
  };

  return ClocklinkEventManager.extend('ClocklinkEventManager', {},
      WidgetContentEventManager.prototype);
});
