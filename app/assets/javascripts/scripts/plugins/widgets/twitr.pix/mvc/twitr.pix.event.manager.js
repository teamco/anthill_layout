/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineTwitrPixEventManager(WidgetContentEventManager) {

  /**
   * Define TwitrPix event manager
   * @class TwitrPixEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var TwitrPixEventManager = function TwitrPixEventManager() {

    this.updateEventList({});
  };

  return TwitrPixEventManager.extend('TwitrPixEventManager', {},
      WidgetContentEventManager.prototype);
});
