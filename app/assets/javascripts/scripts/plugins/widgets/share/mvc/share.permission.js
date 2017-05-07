/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineSharePermission(BasePermission) {

  /**
   * Define Permissions
   * @class SharePermission
   * @constructor
   * @extends BasePermission
   */
  var SharePermission = function SharePermission() {

  };

  return SharePermission.extend('SharePermission', {},
      BasePermission.prototype);
});