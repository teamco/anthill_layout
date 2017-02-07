/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineVineCoPermission(BasePermission) {

  /**
   * Define Permissions
   * @class VineCoPermission
   * @constructor
   * @extends BasePermission
   */
  var VineCoPermission = function VineCoPermission() {

  };

  return VineCoPermission.extend('VineCoPermission', {},
      BasePermission.prototype);
});
