/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineLifestreamEventManager(WidgetContentEventManager) {

  /**
   * Define Lifestream event manager
   * @class LifestreamEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var LifestreamEventManager = function LifestreamEventManager() {

    this.updateEventList({});
  };

  return LifestreamEventManager.extend('LifestreamEventManager', {},
      WidgetContentEventManager.prototype);
});
