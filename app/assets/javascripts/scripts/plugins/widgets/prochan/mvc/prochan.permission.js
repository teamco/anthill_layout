/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineProchanPermission(BasePermission) {

  /**
   * Define Permissions
   * @class ProchanPermission
   * @constructor
   * @extends BasePermission
   */
  var ProchanPermission = function ProchanPermission() {
  };

  return ProchanPermission.extend(
      'ProchanPermission', {},
      BasePermission.prototype
  );
});
