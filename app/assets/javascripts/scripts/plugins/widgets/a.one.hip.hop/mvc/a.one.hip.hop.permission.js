/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineAOneHipHopPermission(BasePermission) {

  /**
   * Define Permissions
   * @class AOneHipHopPermission
   * @constructor
   * @extends BasePermission
   */
  var AOneHipHopPermission = function AOneHipHopPermission() {

  };

  return AOneHipHopPermission.extend('AOneHipHopPermission', {},
      BasePermission.prototype);
});
