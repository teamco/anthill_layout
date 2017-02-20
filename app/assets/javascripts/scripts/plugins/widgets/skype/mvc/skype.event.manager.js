/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineSkypeEventManager(WidgetContentEventManager) {

  /**
   * Define Skype event manager
   * @class SkypeEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var SkypeEventManager = function SkypeEventManager() {

    this.updateEventList({});
  };

  return SkypeEventManager.extend(
      'SkypeEventManager', {},
      WidgetContentEventManager.prototype
  );
});
