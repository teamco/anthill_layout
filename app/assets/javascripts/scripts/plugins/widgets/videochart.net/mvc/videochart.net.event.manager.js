/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineVideochartNetEventManager(WidgetContentEventManager) {

  /**
   * Define VideochartNet event manager
   * @class VideochartNetEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var VideochartNetEventManager = function VideochartNetEventManager() {

    this.updateEventList({});
  };

  return VideochartNetEventManager.extend(
      'VideochartNetEventManager', {},
      WidgetContentEventManager.prototype
  );
});
