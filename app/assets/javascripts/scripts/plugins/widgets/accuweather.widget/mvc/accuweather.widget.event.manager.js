/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineAccuweatherWidgetEventManager(WidgetContentEventManager) {

  /**
   * Define AccuweatherWidget event manager
   * @class AccuweatherWidgetEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var AccuweatherWidgetEventManager = function AccuweatherWidgetEventManager() {

    this.updateEventList({});
  };

  return AccuweatherWidgetEventManager.extend(
      'AccuweatherWidgetEventManager', {},
      WidgetContentEventManager.prototype
  );
});
