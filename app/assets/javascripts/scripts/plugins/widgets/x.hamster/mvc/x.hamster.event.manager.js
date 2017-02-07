/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineXHamsterEventManager(WidgetContentEventManager) {

  /**
   * Define XHamster event manager
   * @class XHamsterEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var XHamsterEventManager = function XHamsterEventManager() {

    this.updateEventList({});
  };

  return XHamsterEventManager.extend('XHamsterEventManager', {},
      WidgetContentEventManager.prototype);
});
