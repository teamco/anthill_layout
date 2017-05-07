/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineStepashkaPermission(BasePermission) {

  /**
   * Define Permissions
   * @class StepashkaPermission
   * @constructor
   * @extends BasePermission
   */
  var StepashkaPermission = function StepashkaPermission() {

  };

  return StepashkaPermission.extend('StepashkaPermission', {},
      BasePermission.prototype);
});
