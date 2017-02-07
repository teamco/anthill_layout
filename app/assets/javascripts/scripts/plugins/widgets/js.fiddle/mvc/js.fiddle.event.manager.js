/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineJsFiddleEventManager(WidgetContentEventManager) {

  /**
   * Define JsFiddle event manager
   * @class JsFiddleEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var JsFiddleEventManager = function JsFiddleEventManager() {

    this.updateEventList({});
  };

  return JsFiddleEventManager.extend('JsFiddleEventManager', {},
      WidgetContentEventManager.prototype);
});
