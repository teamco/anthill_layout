/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineFastpicEventManager(WidgetContentEventManager) {

  /**
   * Define Fastpic event manager
   * @class FastpicEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var FastpicEventManager = function FastpicEventManager() {

    this.updateEventList({});
  };

  return FastpicEventManager.extend(
      'FastpicEventManager', {},
      WidgetContentEventManager.prototype
  );
});
