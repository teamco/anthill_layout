/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function definePortfoliumEventManager(WidgetContentEventManager) {

  /**
   * Define Portfolium event manager
   * @class PortfoliumEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var PortfoliumEventManager = function PortfoliumEventManager() {

    this.updateEventList({});
  };

  return PortfoliumEventManager.extend(
      'PortfoliumEventManager', {},
      WidgetContentEventManager.prototype
  );
});
