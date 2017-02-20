/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineSlideShareEventManager(WidgetContentEventManager) {

  /**
   * Define SlideShare event manager
   * @class SlideShareEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var SlideShareEventManager = function SlideShareEventManager() {

    this.updateEventList({});
  };

  return SlideShareEventManager.extend('SlideShareEventManager', {},
      WidgetContentEventManager.prototype);
});
