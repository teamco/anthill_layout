/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineTubeEightEventManager(WidgetContentEventManager) {

  /**
   * Define TubeEight event manager
   * @class TubeEightEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var TubeEightEventManager = function TubeEightEventManager() {

    this.updateEventList({});
  };

  return TubeEightEventManager.extend('TubeEightEventManager', {},
      WidgetContentEventManager.prototype);
});
