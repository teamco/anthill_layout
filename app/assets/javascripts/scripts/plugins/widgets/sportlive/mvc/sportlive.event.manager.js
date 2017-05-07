/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineSportliveEventManager(WidgetContentEventManager) {

  /**
   * Define Sportlive event manager
   * @class SportliveEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var SportliveEventManager = function SportliveEventManager() {

    this.updateEventList({});
  };

  return SportliveEventManager.extend(
      'SportliveEventManager', {},
      WidgetContentEventManager.prototype
  );
});
