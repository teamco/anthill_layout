/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineDatepickerEventManager(WidgetContentEventManager) {

  /**
   * Define Datepicker event manager
   * @class DatepickerEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var DatepickerEventManager = function DatepickerEventManager() {

    this.updateEventList({});
  };

  return DatepickerEventManager.extend('DatepickerEventManager', {},
      WidgetContentEventManager.prototype);
});
