/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineTviEventManager(WidgetContentEventManager) {

  /**
   * Define Tvi event manager
   * @class TviEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var TviEventManager = function TviEventManager() {

    this.updateEventList({});
  };

  return TviEventManager.extend('TviEventManager', {},
      WidgetContentEventManager.prototype);
});
