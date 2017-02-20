/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function definePetRadarPermission(BasePermission) {

  /**
   * Define Permissions
   * @class PetRadarPermission
   * @constructor
   * @extends BasePermission
   */
  var PetRadarPermission = function PetRadarPermission() {

  };

  return PetRadarPermission.extend('PetRadarPermission', {},
      BasePermission.prototype);
});