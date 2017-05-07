/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function definePicasaPermission(BasePermission) {

  /**
   * Define Permissions
   * @class PicasaPermission
   * @constructor
   * @extends BasePermission
   */
  var PicasaPermission = function PicasaPermission() {

  };

  return PicasaPermission.extend('PicasaPermission', {},
      BasePermission.prototype);
});
