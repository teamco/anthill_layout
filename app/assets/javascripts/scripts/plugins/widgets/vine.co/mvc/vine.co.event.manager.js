/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineVineCoEventManager(WidgetContentEventManager) {

  /**
   * Define VineCo event manager
   * @class VineCoEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var VineCoEventManager = function VineCoEventManager() {

    this.updateEventList({});
  };

  return VineCoEventManager.extend('VineCoEventManager', {},
      WidgetContentEventManager.prototype);
});
