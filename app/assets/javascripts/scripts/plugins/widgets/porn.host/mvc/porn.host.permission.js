/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function definePornHostPermission(BasePermission) {

  /**
   * Define Permissions
   * @class PornHostPermission
   * @constructor
   * @extends BasePermission
   */
  var PornHostPermission = function PornHostPermission() {

  };

  return PornHostPermission.extend('PornHostPermission', {},
      BasePermission.prototype);
});
