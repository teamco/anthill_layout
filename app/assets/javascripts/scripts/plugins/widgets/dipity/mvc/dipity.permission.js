/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineDipityPermission(BasePermission) {

  /**
   * Define Permissions
   * @class DipityPermission
   * @constructor
   * @extends BasePermission
   */
  var DipityPermission = function DipityPermission() {
  };

  return DipityPermission.extend(
      'DipityPermission', {},
      BasePermission.prototype
  );
});
