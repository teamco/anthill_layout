/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineXkcdEventManager(WidgetContentEventManager) {

  /**
   * Define Xkcd event manager
   * @class XkcdEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var XkcdEventManager = function XkcdEventManager() {

    this.updateEventList({});
  };

  return XkcdEventManager.extend('XkcdEventManager', {},
      WidgetContentEventManager.prototype);
});
