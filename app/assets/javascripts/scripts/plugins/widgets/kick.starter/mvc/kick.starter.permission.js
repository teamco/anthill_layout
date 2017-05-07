/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineKickStarterPermission(BasePermission) {

  /**
   * Define Permissions
   * @class KickStarterPermission
   * @constructor
   * @extends BasePermission
   */
  var KickStarterPermission = function KickStarterPermission() {

  };

  return KickStarterPermission.extend('KickStarterPermission', {},
      BasePermission.prototype);
});
