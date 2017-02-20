/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineEbaumsWorldPermission(BasePermission) {

  /**
   * Define Permissions
   * @class EbaumsWorldPermission
   * @constructor
   * @extends BasePermission
   */
  var EbaumsWorldPermission = function EbaumsWorldPermission() {
  };

  return EbaumsWorldPermission.extend(
      'EbaumsWorldPermission', {},
      BasePermission.prototype
  );
});
