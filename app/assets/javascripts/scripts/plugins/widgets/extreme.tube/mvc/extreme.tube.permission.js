/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineExtremeTubePermission(BasePermission) {

  /**
   * Define Permissions
   * @class ExtremeTubePermission
   * @constructor
   * @extends BasePermission
   */
  var ExtremeTubePermission = function ExtremeTubePermission() {

  };

  return ExtremeTubePermission.extend('ExtremeTubePermission', {},
      BasePermission.prototype);
});
