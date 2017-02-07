/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineLoginEventManager(WidgetContentEventManager) {

  /**
   * Define Login event manager
   * @class LoginEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var LoginEventManager = function LoginEventManager() {

    this.updateEventList({});
  };

  return LoginEventManager.extend('LoginEventManager', {},
      WidgetContentEventManager.prototype);
});