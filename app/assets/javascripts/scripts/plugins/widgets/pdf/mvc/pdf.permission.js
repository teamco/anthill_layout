/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function definePdfPermission(BasePermission) {

  /**
   * Define Permissions
   * @class PdfPermission
   * @constructor
   * @extends BasePermission
   */
  var PdfPermission = function PdfPermission() {

  };

  return PdfPermission.extend('PdfPermission', {}, BasePermission.prototype);
});