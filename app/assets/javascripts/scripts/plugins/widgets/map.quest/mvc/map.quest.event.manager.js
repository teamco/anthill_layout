/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineMapQuestEventManager(WidgetContentEventManager) {

  /**
   * Define MapQuest event manager
   * @class MapQuestEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var MapQuestEventManager = function MapQuestEventManager() {

    this.updateEventList({});
  };

  return MapQuestEventManager.extend(
      'MapQuestEventManager', {},
      WidgetContentEventManager.prototype
  );
});
