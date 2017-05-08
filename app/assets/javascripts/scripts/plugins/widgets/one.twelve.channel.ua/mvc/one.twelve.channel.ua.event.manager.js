/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineOneTwelveChannelUaEventManager(WidgetContentEventManager) {

  /**
   * Define OneTwelveChannelUa event manager
   * @class OneTwelveChannelUaEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var OneTwelveChannelUaEventManager = function OneTwelveChannelUaEventManager() {

    this.updateEventList({});
  };

  return OneTwelveChannelUaEventManager.extend('OneTwelveChannelUaEventManager',
      {}, WidgetContentEventManager.prototype);
});
