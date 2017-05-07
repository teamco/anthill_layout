/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineMetamorphicEventManager(WidgetContentEventManager) {

  /**
   * Define Metamorphic event manager
   * @class MetamorphicEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var MetamorphicEventManager = function MetamorphicEventManager() {

    this.updateEventList({});
  };

  return MetamorphicEventManager.extend(
      'MetamorphicEventManager', {},
      WidgetContentEventManager.prototype
  );
});
