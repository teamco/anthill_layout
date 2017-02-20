/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineUbrPermission(BasePermission) {

  /**
   * Define Permissions
   * @class UbrPermission
   * @constructor
   * @extends BasePermission
   */
  var UbrPermission = function UbrPermission() {

  };

  return UbrPermission.extend('UbrPermission', {}, BasePermission.prototype);
});
