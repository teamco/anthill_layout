/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function definePinterestEventManager(WidgetContentEventManager) {

  /**
   * Define Pinterest event manager
   * @class PinterestEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var PinterestEventManager = function PinterestEventManager() {

    this.updateEventList({});
  };

  return PinterestEventManager.extend('PinterestEventManager', {},
      WidgetContentEventManager.prototype);
});
