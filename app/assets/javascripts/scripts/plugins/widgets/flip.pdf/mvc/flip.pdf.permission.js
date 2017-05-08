/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineFlipPdfPermission(BasePermission) {

  /**
   * Define Permissions
   * @class FlipPdfPermission
   * @constructor
   * @extends BasePermission
   */
  var FlipPdfPermission = function FlipPdfPermission() {

  };

  return FlipPdfPermission.extend('FlipPdfPermission', {},
      BasePermission.prototype);
});
