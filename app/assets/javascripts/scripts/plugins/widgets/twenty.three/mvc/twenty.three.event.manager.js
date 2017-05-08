/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineTwentyThreeEventManager(WidgetContentEventManager) {

  /**
   * Define TwentyThree event manager
   * @class TwentyThreeEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var TwentyThreeEventManager = function TwentyThreeEventManager() {

    this.updateEventList({});
  };

  return TwentyThreeEventManager.extend('TwentyThreeEventManager', {},
      WidgetContentEventManager.prototype);
});
