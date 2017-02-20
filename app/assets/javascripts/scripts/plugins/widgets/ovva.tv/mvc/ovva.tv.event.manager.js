/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineOvvaTvEventManager(WidgetContentEventManager) {

  /**
   * Define OvvaTv event manager
   * @class OvvaTvEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var OvvaTvEventManager = function OvvaTvEventManager() {

    this.updateEventList({});
  };

  return OvvaTvEventManager.extend(
      'OvvaTvEventManager', {},
      WidgetContentEventManager.prototype
  );
});
