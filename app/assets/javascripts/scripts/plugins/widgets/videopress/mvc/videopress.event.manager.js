/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineVideopressEventManager(WidgetContentEventManager) {

  /**
   * Define Videopress event manager
   * @class VideopressEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var VideopressEventManager = function VideopressEventManager() {

    this.updateEventList({});
  };

  return VideopressEventManager.extend(
      'VideopressEventManager', {},
      WidgetContentEventManager.prototype
  );
});
