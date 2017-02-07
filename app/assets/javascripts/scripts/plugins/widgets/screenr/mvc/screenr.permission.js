/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineScreenrPermission(BasePermission) {

  /**
   * Define Permissions
   * @class ScreenrPermission
   * @constructor
   * @extends BasePermission
   */
  var ScreenrPermission = function ScreenrPermission() {

  };

  return ScreenrPermission.extend('ScreenrPermission', {},
      BasePermission.prototype);
});
