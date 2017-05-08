/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineShoudioPermission(BasePermission) {

  /**
   * Define Permissions
   * @class ShoudioPermission
   * @constructor
   * @extends BasePermission
   */
  var ShoudioPermission = function ShoudioPermission() {
  };

  return ShoudioPermission.extend(
      'ShoudioPermission', {},
      BasePermission.prototype
  );
});
