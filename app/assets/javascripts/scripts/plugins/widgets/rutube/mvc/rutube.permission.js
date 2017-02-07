/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineRutubePermission(BasePermission) {

  /**
   * Define Permissions
   * @class RutubePermission
   * @constructor
   * @extends BasePermission
   */
  var RutubePermission = function RutubePermission() {

  };

  return RutubePermission.extend('RutubePermission', {},
      BasePermission.prototype);
});