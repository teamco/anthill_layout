/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineWistiaEventManager(WidgetContentEventManager) {

  /**
   * Define Wistia event manager
   * @class WistiaEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var WistiaEventManager = function WistiaEventManager() {

    this.updateEventList({});
  };

  return WistiaEventManager.extend(
      'WistiaEventManager', {},
      WidgetContentEventManager.prototype
  );
});
