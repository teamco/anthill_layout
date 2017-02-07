/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineIssuuPermission(BasePermission) {

  /**
   * Define Permissions
   * @class IssuuPermission
   * @constructor
   * @extends BasePermission
   */
  var IssuuPermission = function IssuuPermission() {

  };

  return IssuuPermission.extend('IssuuPermission', {},
      BasePermission.prototype);
});
