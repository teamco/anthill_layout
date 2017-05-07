/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineStepashkaEventManager(WidgetContentEventManager) {

  /**
   * Define Stepashka event manager
   * @class StepashkaEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var StepashkaEventManager = function StepashkaEventManager() {

    this.updateEventList({});
  };

  return StepashkaEventManager.extend('StepashkaEventManager', {},
      WidgetContentEventManager.prototype);
});
