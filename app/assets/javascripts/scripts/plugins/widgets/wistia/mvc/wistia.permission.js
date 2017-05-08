/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineWistiaPermission(BasePermission) {

  /**
   * Define Permissions
   * @class WistiaPermission
   * @constructor
   * @extends BasePermission
   */
  var WistiaPermission = function WistiaPermission() {
  };

  return WistiaPermission.extend(
      'WistiaPermission', {},
      BasePermission.prototype
  );
});
