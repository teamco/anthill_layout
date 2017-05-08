/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineClocklinkPermission(BasePermission) {

  /**
   * Define Permissions
   * @class ClocklinkPermission
   * @constructor
   * @extends BasePermission
   */
  var ClocklinkPermission = function ClocklinkPermission() {

  };

  return ClocklinkPermission.extend('ClocklinkPermission', {},
      BasePermission.prototype);
});
