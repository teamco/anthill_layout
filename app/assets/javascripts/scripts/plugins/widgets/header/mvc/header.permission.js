/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineHeaderPermission(BasePermission) {

  /**
   * Define Permissions
   * @class HeaderPermission
   * @constructor
   * @extends BasePermission
   */
  var HeaderPermission = function HeaderPermission() {

  };

  return HeaderPermission.extend('HeaderPermission', {},
      BasePermission.prototype);
});