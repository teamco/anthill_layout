/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineLivestreamEventManager(WidgetContentEventManager) {

  /**
   * Define Livestream event manager
   * @class LivestreamEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var LivestreamEventManager = function LivestreamEventManager() {

    this.updateEventList({});
  };

  return LivestreamEventManager.extend('LivestreamEventManager', {},
      WidgetContentEventManager.prototype);
});
