/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineSwfPermission(BasePermission) {

  /**
   * Define Permissions
   * @class SwfPermission
   * @constructor
   * @extends BasePermission
   */
  var SwfPermission = function SwfPermission() {

  };

  return SwfPermission.extend('SwfPermission', {}, BasePermission.prototype);
});