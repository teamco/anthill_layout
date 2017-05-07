/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineTimeToastPermission(BasePermission) {

  /**
   * Define Permissions
   * @class TimeToastPermission
   * @constructor
   * @extends BasePermission
   */
  var TimeToastPermission = function TimeToastPermission() {

  };

  return TimeToastPermission.extend('TimeToastPermission', {},
      BasePermission.prototype);
});
