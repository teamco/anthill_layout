/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineUbrEventManager(WidgetContentEventManager) {

  /**
   * Define Ubr event manager
   * @class UbrEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var UbrEventManager = function UbrEventManager() {

    this.updateEventList({});
  };

  return UbrEventManager.extend('UbrEventManager', {},
      WidgetContentEventManager.prototype);
});
