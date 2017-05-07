/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineImageGalleryPermission(BasePermission) {

  /**
   * Define Permissions
   * @class ImageGalleryPermission
   * @constructor
   * @extends BasePermission
   */
  var ImageGalleryPermission = function ImageGalleryPermission() {

  };

  return ImageGalleryPermission.extend('ImageGalleryPermission', {},
      BasePermission.prototype);
});