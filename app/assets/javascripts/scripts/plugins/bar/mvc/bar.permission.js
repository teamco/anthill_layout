/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

defineP([
  'modules/Permission'
], function defineBarPermission(BasePermission) {

  /**
   * Define Permissions
   * @class BarPermission
   * @constructor
   * @extends BasePermission
   */
  var BarPermission = function BarPermission() {

  };

  return BarPermission.extend('BarPermission', {}, BasePermission.prototype);
});