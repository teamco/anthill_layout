/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineRadikalFotoEventManager(WidgetContentEventManager) {

  /**
   * Define RadikalFoto event manager
   * @class RadikalFotoEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var RadikalFotoEventManager = function RadikalFotoEventManager() {

    this.updateEventList({});
  };

  return RadikalFotoEventManager.extend('RadikalFotoEventManager', {},
      WidgetContentEventManager.prototype);
});
