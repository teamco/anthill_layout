/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineLoginGooglePermission(BasePermission) {

  /**
   * Define Permissions
   * @class LoginGooglePermission
   * @constructor
   * @extends BasePermission
   */
  var LoginGooglePermission = function LoginGooglePermission() {

  };

  return LoginGooglePermission.extend('LoginGooglePermission', {},
      BasePermission.prototype);
});