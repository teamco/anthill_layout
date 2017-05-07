/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineTwentyFourLiveEventManager(WidgetContentEventManager) {

  /**
   * Define TwentyFourLive event manager
   * @class TwentyFourLiveEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var TwentyFourLiveEventManager = function TwentyFourLiveEventManager() {

    this.updateEventList({});
  };

  return TwentyFourLiveEventManager.extend('TwentyFourLiveEventManager', {},
      WidgetContentEventManager.prototype);
});
