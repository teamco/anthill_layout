/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineEmptyEventManager(WidgetContentEventManager) {

  /**
   * Define Empty event manager
   * @class EmptyEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var EmptyEventManager = function EmptyEventManager() {

    this.updateEventList({});
  };

  return EmptyEventManager.extend(
      'EmptyEventManager', {},
      WidgetContentEventManager.prototype
  );
});