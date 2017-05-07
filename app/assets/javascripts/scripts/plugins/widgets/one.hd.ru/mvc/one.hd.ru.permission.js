/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineOneHdRuPermission(BasePermission) {

  /**
   * Define Permissions
   * @class OneHdRuPermission
   * @constructor
   * @extends BasePermission
   */
  var OneHdRuPermission = function OneHdRuPermission() {

  };

  return OneHdRuPermission.extend('OneHdRuPermission', {},
      BasePermission.prototype);
});
