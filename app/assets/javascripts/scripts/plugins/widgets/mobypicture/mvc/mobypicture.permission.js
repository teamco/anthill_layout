/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineMobypicturePermission(BasePermission) {

  /**
   * Define Permissions
   * @class MobypicturePermission
   * @constructor
   * @extends BasePermission
   */
  var MobypicturePermission = function MobypicturePermission() {

  };

  return MobypicturePermission.extend('MobypicturePermission', {},
      BasePermission.prototype);
});
