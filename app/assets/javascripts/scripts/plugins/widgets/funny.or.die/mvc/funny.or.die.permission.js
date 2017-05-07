/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineFunnyOrDiePermission(BasePermission) {

  /**
   * Define Permissions
   * @class FunnyOrDiePermission
   * @constructor
   * @extends BasePermission
   */
  var FunnyOrDiePermission = function FunnyOrDiePermission() {

  };

  return FunnyOrDiePermission.extend('FunnyOrDiePermission', {},
      BasePermission.prototype);
});
