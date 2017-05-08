/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineQrCodePermission(BasePermission) {

  /**
   * Define Permissions
   * @class QrCodePermission
   * @constructor
   * @extends BasePermission
   */
  var QrCodePermission = function QrCodePermission() {

  };

  return QrCodePermission.extend('QrCodePermission', {},
      BasePermission.prototype);
});
