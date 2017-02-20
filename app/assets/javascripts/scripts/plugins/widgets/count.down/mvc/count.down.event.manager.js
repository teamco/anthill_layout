/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineCountDownEventManager(WidgetContentEventManager) {

  /**
   * Define CountDown event manager
   * @class CountDownEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var CountDownEventManager = function CountDownEventManager() {

    this.updateEventList({});
  };

  return CountDownEventManager.extend(
      'CountDownEventManager', {},
      WidgetContentEventManager.prototype
  );
});
