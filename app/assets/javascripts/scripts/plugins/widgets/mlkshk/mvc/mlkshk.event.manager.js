/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineMlkshkEventManager(WidgetContentEventManager) {

  /**
   * Define Mlkshk event manager
   * @class MlkshkEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var MlkshkEventManager = function MlkshkEventManager() {

    this.updateEventList({});
  };

  return MlkshkEventManager.extend('MlkshkEventManager', {},
      WidgetContentEventManager.prototype);
});
