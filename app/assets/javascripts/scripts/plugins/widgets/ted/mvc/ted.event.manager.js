/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineTedEventManager(WidgetContentEventManager) {

  /**
   * Define Ted event manager
   * @class TedEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var TedEventManager = function TedEventManager() {

    this.updateEventList({});
  };

  return TedEventManager.extend('TedEventManager', {},
      WidgetContentEventManager.prototype);
});
