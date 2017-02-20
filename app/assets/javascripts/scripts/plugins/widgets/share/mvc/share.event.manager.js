/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineShareEventManager(WidgetContentEventManager) {

  /**
   * Define Share event manager
   * @class ShareEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var ShareEventManager = function ShareEventManager() {

    this.updateEventList({});
  };

  return ShareEventManager.extend('ShareEventManager', {},
      WidgetContentEventManager.prototype);
});