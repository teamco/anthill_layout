/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineTheWeatherNetworkEventManager(WidgetContentEventManager) {

  /**
   * Define TheWeatherNetwork event manager
   * @class TheWeatherNetworkEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var TheWeatherNetworkEventManager = function TheWeatherNetworkEventManager() {

    this.updateEventList({});
  };

  return TheWeatherNetworkEventManager.extend(
      'TheWeatherNetworkEventManager', {},
      WidgetContentEventManager.prototype
  );
});
