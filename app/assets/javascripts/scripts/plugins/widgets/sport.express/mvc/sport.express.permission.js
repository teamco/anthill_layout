/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineSportExpressPermission(BasePermission) {

  /**
   * Define Permissions
   * @class SportExpressPermission
   * @constructor
   * @extends BasePermission
   */
  var SportExpressPermission = function SportExpressPermission() {

  };

  return SportExpressPermission.extend('SportExpressPermission', {},
      BasePermission.prototype);
});
