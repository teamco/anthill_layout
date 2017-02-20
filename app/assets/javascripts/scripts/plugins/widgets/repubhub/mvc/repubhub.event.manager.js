/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineRepubhubEventManager(WidgetContentEventManager) {

  /**
   * Define Repubhub event manager
   * @class RepubhubEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var RepubhubEventManager = function RepubhubEventManager() {

    this.updateEventList({});
  };

  return RepubhubEventManager.extend(
      'RepubhubEventManager', {},
      WidgetContentEventManager.prototype
  );
});
