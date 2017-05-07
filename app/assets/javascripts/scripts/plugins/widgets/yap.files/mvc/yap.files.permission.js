/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineYapFilesPermission(BasePermission) {

  /**
   * Define Permissions
   * @class YapFilesPermission
   * @constructor
   * @extends BasePermission
   */
  var YapFilesPermission = function YapFilesPermission() {

  };

  return YapFilesPermission.extend('YapFilesPermission', {},
      BasePermission.prototype);
});
