/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

defineP([
  'modules/Permission'
], function defineWorkspacePermission(BasePermission) {

  /**
   * Define Permissions
   * @class WorkspacePermission
   * @extends BasePermission
   * @constructor
   */
  var WorkspacePermission = function WorkspacePermission() {

  };

  return WorkspacePermission.extend('WorkspacePermission', {},
      BasePermission.prototype);
});