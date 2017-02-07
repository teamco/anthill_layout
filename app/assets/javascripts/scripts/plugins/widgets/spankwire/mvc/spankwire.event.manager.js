/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineSpankwireEventManager(WidgetContentEventManager) {

  /**
   * Define Spankwire event manager
   * @class SpankwireEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var SpankwireEventManager = function SpankwireEventManager() {

    this.updateEventList({});
  };

  return SpankwireEventManager.extend('SpankwireEventManager', {},
      WidgetContentEventManager.prototype);
});
