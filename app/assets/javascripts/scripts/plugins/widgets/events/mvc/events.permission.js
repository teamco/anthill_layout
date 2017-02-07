/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineEventsPermission(BasePermission) {

  /**
   * Define Permissions
   * @class EventsPermission
   * @constructor
   * @extends BasePermission
   */
  var EventsPermission = function EventsPermission() {

  };

  return EventsPermission.extend('EventsPermission', {},
      BasePermission.prototype);
});