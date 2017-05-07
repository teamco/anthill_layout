/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineOpenWeatherMapEventManager(WidgetContentEventManager) {

  /**
   * Define OpenWeatherMap event manager
   * @class OpenWeatherMapEventManager
   * @constructor
   * @extends WidgetContentEventManager
   * @extends BaseEvent
   */
  var OpenWeatherMapEventManager = function OpenWeatherMapEventManager() {

    this.updateEventList({
      getLocation: 'get.location'
    });
  };

  return OpenWeatherMapEventManager.extend('OpenWeatherMapEventManager', {},
      WidgetContentEventManager.prototype);
});