/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineMapLocatorEventManager(WidgetContentEventManager) {

  /**
   * Define MapLocator event manager
   * @class MapLocatorEventManager
   * @constructor
   * @extends WidgetContentEventManager
   * @extends BaseEvent
   */
  var MapLocatorEventManager = function MapLocatorEventManager() {

    this.updateEventList({
      getLocation: 'get.location'
    });
  };

  return MapLocatorEventManager.extend('MapLocatorEventManager', {},
      WidgetContentEventManager.prototype);
});