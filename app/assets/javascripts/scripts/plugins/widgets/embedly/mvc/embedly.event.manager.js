/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineEmbedlyEventManager(WidgetContentEventManager) {

  /**
   * Define Embedly event manager
   * @class EmbedlyEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var EmbedlyEventManager = function EmbedlyEventManager() {

    this.updateEventList({});
  };

  return EmbedlyEventManager.extend('EmbedlyEventManager', {},
      WidgetContentEventManager.prototype);
});
