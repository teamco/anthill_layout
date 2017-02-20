/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineTedPermission(BasePermission) {

  /**
   * Define Permissions
   * @class TedPermission
   * @constructor
   * @extends BasePermission
   */
  var TedPermission = function TedPermission() {

  };

  return TedPermission.extend('TedPermission', {}, BasePermission.prototype);
});
