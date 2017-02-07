/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineHeaderEventManager(WidgetContentEventManager) {

  /**
   * Define Header event manager
   * @class HeaderEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var HeaderEventManager = function HeaderEventManager() {

    this.updateEventList({});
  };

  return HeaderEventManager.extend('HeaderEventManager', {},
      WidgetContentEventManager.prototype);
});