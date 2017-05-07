/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineScoffEventManager(WidgetContentEventManager) {

  /**
   * Define Scoff event manager
   * @class ScoffEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var ScoffEventManager = function ScoffEventManager() {

    this.updateEventList({});
  };

  return ScoffEventManager.extend(
      'ScoffEventManager', {},
      WidgetContentEventManager.prototype
  );
});
