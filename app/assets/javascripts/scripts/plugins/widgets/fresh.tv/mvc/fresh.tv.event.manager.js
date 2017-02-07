/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineFreshTvEventManager(WidgetContentEventManager) {

  /**
   * Define FreshTv event manager
   * @class FreshTvEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var FreshTvEventManager = function FreshTvEventManager() {

    this.updateEventList({});
  };

  return FreshTvEventManager.extend('FreshTvEventManager', {},
      WidgetContentEventManager.prototype);
});
