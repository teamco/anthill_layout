/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineTwentyFourVideoEventManager(WidgetContentEventManager) {

  /**
   * Define TwentyFourVideo event manager
   * @class TwentyFourVideoEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var TwentyFourVideoEventManager = function TwentyFourVideoEventManager() {

    this.updateEventList({});
  };

  return TwentyFourVideoEventManager.extend('TwentyFourVideoEventManager', {},
      WidgetContentEventManager.prototype);
});
