/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineOrphusEventManager(WidgetContentEventManager) {

  /**
   * Define Orphus event manager
   * @class OrphusEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var OrphusEventManager = function OrphusEventManager() {

    this.updateEventList({});
  };

  return OrphusEventManager.extend(
      'OrphusEventManager', {},
      WidgetContentEventManager.prototype
  );
});
