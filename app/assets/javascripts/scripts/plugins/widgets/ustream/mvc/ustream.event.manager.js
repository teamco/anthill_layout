/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineUstreamEventManager(WidgetContentEventManager) {

  /**
   * Define Ustream event manager
   * @class UstreamEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var UstreamEventManager = function UstreamEventManager() {

    this.updateEventList({});
  };

  return UstreamEventManager.extend('UstreamEventManager', {},
      WidgetContentEventManager.prototype);
});
