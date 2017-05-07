/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineTubeEightPermission(BasePermission) {

  /**
   * Define Permissions
   * @class TubeEightPermission
   * @constructor
   * @extends BasePermission
   */
  var TubeEightPermission = function TubeEightPermission() {

  };

  return TubeEightPermission.extend('TubeEightPermission', {},
      BasePermission.prototype);
});
