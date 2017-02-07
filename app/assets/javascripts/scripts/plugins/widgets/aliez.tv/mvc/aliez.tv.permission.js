/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineAliezTvPermission(BasePermission) {

  /**
   * Define Permissions
   * @class AliezTvPermission
   * @constructor
   * @extends BasePermission
   */
  var AliezTvPermission = function AliezTvPermission() {
  };

  return AliezTvPermission.extend(
      'AliezTvPermission', {},
      BasePermission.prototype
  );
});
