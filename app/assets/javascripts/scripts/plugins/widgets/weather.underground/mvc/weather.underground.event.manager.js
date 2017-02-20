/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineWeatherUndergroundEventManager(WidgetContentEventManager) {

  /**
   * Define WeatherUnderground event manager
   * @class WeatherUndergroundEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var WeatherUndergroundEventManager = function WeatherUndergroundEventManager() {

    this.updateEventList({});
  };

  return WeatherUndergroundEventManager.extend(
      'WeatherUndergroundEventManager', {},
      WidgetContentEventManager.prototype
  );
});
