/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineXVideosPermission(BasePermission) {

  /**
   * Define Permissions
   * @class XVideosPermission
   * @constructor
   * @extends BasePermission
   */
  var XVideosPermission = function XVideosPermission() {

  };

  return XVideosPermission.extend('XVideosPermission', {},
      BasePermission.prototype);
});
