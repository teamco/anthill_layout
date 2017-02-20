/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineSportboxRuEventManager(WidgetContentEventManager) {

  /**
   * Define SportboxRu event manager
   * @class SportboxRuEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var SportboxRuEventManager = function SportboxRuEventManager() {

    this.updateEventList({});
  };

  return SportboxRuEventManager.extend(
      'SportboxRuEventManager', {},
      WidgetContentEventManager.prototype
  );
});
