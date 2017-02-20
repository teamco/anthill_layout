/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineTimeToastEventManager(WidgetContentEventManager) {

  /**
   * Define TimeToast event manager
   * @class TimeToastEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var TimeToastEventManager = function TimeToastEventManager() {

    this.updateEventList({});
  };

  return TimeToastEventManager.extend('TimeToastEventManager', {},
      WidgetContentEventManager.prototype);
});
