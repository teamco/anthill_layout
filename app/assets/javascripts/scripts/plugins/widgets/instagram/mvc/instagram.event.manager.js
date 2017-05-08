/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineInstagramEventManager(WidgetContentEventManager) {

  /**
   * Define Instagram event manager
   * @class InstagramEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var InstagramEventManager = function InstagramEventManager() {

    this.updateEventList({});
  };

  return InstagramEventManager.extend('InstagramEventManager', {},
      WidgetContentEventManager.prototype);
});
