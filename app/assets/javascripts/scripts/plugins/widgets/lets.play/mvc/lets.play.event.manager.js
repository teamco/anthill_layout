/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineLetsPlayEventManager(WidgetContentEventManager) {

  /**
   * Define LetsPlay event manager
   * @class LetsPlayEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var LetsPlayEventManager = function LetsPlayEventManager() {

    this.updateEventList({});
  };

  return LetsPlayEventManager.extend(
      'LetsPlayEventManager', {},
      WidgetContentEventManager.prototype
  );
});
