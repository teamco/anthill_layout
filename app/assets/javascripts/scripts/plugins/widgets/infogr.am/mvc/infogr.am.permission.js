/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineInfogrAmPermission(BasePermission) {

  /**
   * Define Permissions
   * @class InfogrAmPermission
   * @constructor
   * @extends BasePermission
   */
  var InfogrAmPermission = function InfogrAmPermission() {
  };

  return InfogrAmPermission.extend(
      'InfogrAmPermission', {},
      BasePermission.prototype
  );
});
