/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function definePolldaddyPermission(BasePermission) {

  /**
   * Define Permissions
   * @class PolldaddyPermission
   * @constructor
   * @extends BasePermission
   */
  var PolldaddyPermission = function PolldaddyPermission() {

  };

  return PolldaddyPermission.extend('PolldaddyPermission', {},
      BasePermission.prototype);
});
