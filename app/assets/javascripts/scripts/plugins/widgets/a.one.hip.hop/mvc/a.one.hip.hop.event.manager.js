/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineAOneHipHopEventManager(WidgetContentEventManager) {

  /**
   * Define AOneHipHop event manager
   * @class AOneHipHopEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var AOneHipHopEventManager = function AOneHipHopEventManager() {

    this.updateEventList({});
  };

  return AOneHipHopEventManager.extend('AOneHipHopEventManager', {},
      WidgetContentEventManager.prototype);
});
