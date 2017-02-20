/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineHromadskeTvPermission(BasePermission) {

  /**
   * Define Permissions
   * @class HromadskeTvPermission
   * @constructor
   * @extends BasePermission
   */
  var HromadskeTvPermission = function HromadskeTvPermission() {

  };

  return HromadskeTvPermission.extend('HromadskeTvPermission', {},
      BasePermission.prototype);
});
