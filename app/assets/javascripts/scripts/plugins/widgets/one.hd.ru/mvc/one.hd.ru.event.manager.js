/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineOneHdRuEventManager(WidgetContentEventManager) {

  /**
   * Define OneHdRu event manager
   * @class OneHdRuEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var OneHdRuEventManager = function OneHdRuEventManager() {

    this.updateEventList({});
  };

  return OneHdRuEventManager.extend('OneHdRuEventManager', {},
      WidgetContentEventManager.prototype);
});
