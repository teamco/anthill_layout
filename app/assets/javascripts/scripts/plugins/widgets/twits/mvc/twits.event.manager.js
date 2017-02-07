/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineTwitsEventManager(WidgetContentEventManager) {

  /**
   * Define Twits event manager
   * @class TwitsEventManager
   * @constructor
   * @extends WidgetContentEventManager
   * @extends BaseEvent
   */
  var TwitsEventManager = function TwitsEventManager() {

    this.updateEventList({});
  };

  return TwitsEventManager.extend('TwitsEventManager', {},
      WidgetContentEventManager.prototype);
});