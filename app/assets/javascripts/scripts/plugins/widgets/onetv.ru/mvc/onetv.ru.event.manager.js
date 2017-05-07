/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineOnetvRuEventManager(WidgetContentEventManager) {

  /**
   * Define OnetvRu event manager
   * @class OnetvRuEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var OnetvRuEventManager = function OnetvRuEventManager() {

    this.updateEventList({});
  };

  return OnetvRuEventManager.extend('OnetvRuEventManager', {},
      WidgetContentEventManager.prototype);
});
