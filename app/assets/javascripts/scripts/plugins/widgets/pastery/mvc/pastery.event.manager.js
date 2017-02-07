/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function definePasteryEventManager(WidgetContentEventManager) {

  /**
   * Define Pastery event manager
   * @class PasteryEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var PasteryEventManager = function PasteryEventManager() {

    this.updateEventList({});
  };

  return PasteryEventManager.extend(
      'PasteryEventManager', {},
      WidgetContentEventManager.prototype
  );
});
