/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineOrphusPermission(BasePermission) {

  /**
   * Define Permissions
   * @class OrphusPermission
   * @constructor
   * @extends BasePermission
   */
  var OrphusPermission = function OrphusPermission() {
  };

  return OrphusPermission.extend(
      'OrphusPermission', {},
      BasePermission.prototype
  );
});
