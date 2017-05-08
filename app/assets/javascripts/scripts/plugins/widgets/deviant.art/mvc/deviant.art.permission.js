/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineDeviantArtPermission(BasePermission) {

  /**
   * Define Permissions
   * @class DeviantArtPermission
   * @constructor
   * @extends BasePermission
   */
  var DeviantArtPermission = function DeviantArtPermission() {

  };

  return DeviantArtPermission.extend('DeviantArtPermission', {},
      BasePermission.prototype);
});
