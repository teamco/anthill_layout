/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineRenTvPermission(BasePermission) {

  /**
   * Define Permissions
   * @class RenTvPermission
   * @constructor
   * @extends BasePermission
   */
  var RenTvPermission = function RenTvPermission() {
  };

  return RenTvPermission.extend(
      'RenTvPermission', {},
      BasePermission.prototype
  );
});
