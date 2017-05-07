/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineClypItPermission(BasePermission) {

  /**
   * Define Permissions
   * @class ClypItPermission
   * @constructor
   * @extends BasePermission
   */
  var ClypItPermission = function ClypItPermission() {
  };

  return ClypItPermission.extend(
      'ClypItPermission', {},
      BasePermission.prototype
  );
});
