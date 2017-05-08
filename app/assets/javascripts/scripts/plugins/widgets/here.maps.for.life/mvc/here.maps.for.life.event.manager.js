/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineHereMapsForLifeEventManager(WidgetContentEventManager) {

  /**
   * Define HereMapsForLife event manager
   * @class HereMapsForLifeEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var HereMapsForLifeEventManager = function HereMapsForLifeEventManager() {

    this.updateEventList({});
  };

  return HereMapsForLifeEventManager.extend(
      'HereMapsForLifeEventManager', {},
      WidgetContentEventManager.prototype
  );
});
