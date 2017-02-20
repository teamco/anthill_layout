/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineEventsCalendarPermission(BasePermission) {

  /**
   * Define Permissions
   * @class EventsCalendarPermission
   * @constructor
   * @extends BasePermission
   */
  var EventsCalendarPermission = function EventsCalendarPermission() {

  };

  return EventsCalendarPermission.extend('EventsCalendarPermission', {},
      BasePermission.prototype);
});
