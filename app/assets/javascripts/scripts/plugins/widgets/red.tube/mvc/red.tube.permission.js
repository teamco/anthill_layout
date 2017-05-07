/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineRedTubePermission(BasePermission) {

  /**
   * Define Permissions
   * @class RedTubePermission
   * @constructor
   * @extends BasePermission
   */
  var RedTubePermission = function RedTubePermission() {

  };

  return RedTubePermission.extend('RedTubePermission', {},
      BasePermission.prototype);
});
