/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineEventsCalendarEventManager(WidgetContentEventManager) {

  /**
   * Define EventsCalendar event manager
   * @class EventsCalendarEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var EventsCalendarEventManager = function EventsCalendarEventManager() {

    this.updateEventList({});
  };

  return EventsCalendarEventManager.extend('EventsCalendarEventManager', {},
      WidgetContentEventManager.prototype);
});
