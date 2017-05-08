/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineScoffPermission(BasePermission) {

  /**
   * Define Permissions
   * @class ScoffPermission
   * @constructor
   * @extends BasePermission
   */
  var ScoffPermission = function ScoffPermission() {
  };

  return ScoffPermission.extend(
      'ScoffPermission', {},
      BasePermission.prototype
  );
});
