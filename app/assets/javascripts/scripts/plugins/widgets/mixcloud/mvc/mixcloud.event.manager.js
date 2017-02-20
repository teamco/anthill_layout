/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineMixcloudEventManager(WidgetContentEventManager) {

  /**
   * Define Mixcloud event manager
   * @class MixcloudEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var MixcloudEventManager = function MixcloudEventManager() {

    this.updateEventList({});
  };

  return MixcloudEventManager.extend('MixcloudEventManager', {},
      WidgetContentEventManager.prototype);
});
