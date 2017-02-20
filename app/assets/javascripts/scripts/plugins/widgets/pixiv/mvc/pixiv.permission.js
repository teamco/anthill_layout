/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function definePixivPermission(BasePermission) {

  /**
   * Define Permissions
   * @class PixivPermission
   * @constructor
   * @extends BasePermission
   */
  var PixivPermission = function PixivPermission() {

  };

  return PixivPermission.extend('PixivPermission', {},
      BasePermission.prototype);
});
