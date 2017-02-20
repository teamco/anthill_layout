/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineDipityEventManager(WidgetContentEventManager) {

  /**
   * Define Dipity event manager
   * @class DipityEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var DipityEventManager = function DipityEventManager() {

    this.updateEventList({});
  };

  return DipityEventManager.extend(
      'DipityEventManager', {},
      WidgetContentEventManager.prototype
  );
});
