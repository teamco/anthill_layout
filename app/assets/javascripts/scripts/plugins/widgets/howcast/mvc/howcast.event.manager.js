/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineHowcastEventManager(WidgetContentEventManager) {

  /**
   * Define Howcast event manager
   * @class HowcastEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var HowcastEventManager = function HowcastEventManager() {

    this.updateEventList({});
  };

  return HowcastEventManager.extend('HowcastEventManager', {},
      WidgetContentEventManager.prototype);
});
