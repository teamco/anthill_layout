/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineTrubaEventManager(WidgetContentEventManager) {

  /**
   * Define Truba event manager
   * @class TrubaEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var TrubaEventManager = function TrubaEventManager() {

    this.updateEventList({});
  };

  return TrubaEventManager.extend('TrubaEventManager', {},
      WidgetContentEventManager.prototype);
});
