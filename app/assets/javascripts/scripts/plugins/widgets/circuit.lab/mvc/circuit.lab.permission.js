/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineCircuitLabPermission(BasePermission) {

  /**
   * Define Permissions
   * @class CircuitLabPermission
   * @constructor
   * @extends BasePermission
   */
  var CircuitLabPermission = function CircuitLabPermission() {
  };

  return CircuitLabPermission.extend(
      'CircuitLabPermission', {},
      BasePermission.prototype
  );
});
