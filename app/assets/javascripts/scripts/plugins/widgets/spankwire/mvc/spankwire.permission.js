/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineSpankwirePermission(BasePermission) {

  /**
   * Define Permissions
   * @class SpankwirePermission
   * @constructor
   * @extends BasePermission
   */
  var SpankwirePermission = function SpankwirePermission() {

  };

  return SpankwirePermission.extend('SpankwirePermission', {},
      BasePermission.prototype);
});
