/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineCodepenIoPermission(BasePermission) {

  /**
   * Define Permissions
   * @class CodepenIoPermission
   * @constructor
   * @extends BasePermission
   */
  var CodepenIoPermission = function CodepenIoPermission() {
  };

  return CodepenIoPermission.extend(
      'CodepenIoPermission', {},
      BasePermission.prototype
  );
});
