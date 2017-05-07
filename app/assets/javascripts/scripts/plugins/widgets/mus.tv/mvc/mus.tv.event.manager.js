/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineMusTvEventManager(WidgetContentEventManager) {

  /**
   * Define MusTv event manager
   * @class MusTvEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var MusTvEventManager = function MusTvEventManager() {

    this.updateEventList({});
  };

  return MusTvEventManager.extend('MusTvEventManager', {},
      WidgetContentEventManager.prototype);
});
