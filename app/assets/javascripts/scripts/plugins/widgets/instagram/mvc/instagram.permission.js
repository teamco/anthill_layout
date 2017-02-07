/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineInstagramPermission(BasePermission) {

  /**
   * Define Permissions
   * @class InstagramPermission
   * @constructor
   * @extends BasePermission
   */
  var InstagramPermission = function InstagramPermission() {

  };

  return InstagramPermission.extend('InstagramPermission', {},
      BasePermission.prototype);
});
