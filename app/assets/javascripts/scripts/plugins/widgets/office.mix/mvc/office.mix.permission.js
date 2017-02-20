/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineOfficeMixPermission(BasePermission) {

  /**
   * Define Permissions
   * @class OfficeMixPermission
   * @constructor
   * @extends BasePermission
   */
  var OfficeMixPermission = function OfficeMixPermission() {
  };

  return OfficeMixPermission.extend(
      'OfficeMixPermission', {},
      BasePermission.prototype
  );
});
