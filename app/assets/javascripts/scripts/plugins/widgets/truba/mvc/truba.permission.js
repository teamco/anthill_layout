/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineTrubaPermission(BasePermission) {

  /**
   * Define Permissions
   * @class TrubaPermission
   * @constructor
   * @extends BasePermission
   */
  var TrubaPermission = function TrubaPermission() {

  };

  return TrubaPermission.extend('TrubaPermission', {},
      BasePermission.prototype);
});
