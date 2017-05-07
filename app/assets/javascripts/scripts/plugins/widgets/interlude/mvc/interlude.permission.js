/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineInterludePermission(BasePermission) {

  /**
   * Define Permissions
   * @class InterludePermission
   * @constructor
   * @extends BasePermission
   */
  var InterludePermission = function InterludePermission() {
  };

  return InterludePermission.extend(
      'InterludePermission', {},
      BasePermission.prototype
  );
});
