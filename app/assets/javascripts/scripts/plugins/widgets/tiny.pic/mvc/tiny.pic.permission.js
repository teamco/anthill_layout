/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineTinyPicPermission(BasePermission) {

  /**
   * Define Permissions
   * @class TinyPicPermission
   * @constructor
   * @extends BasePermission
   */
  var TinyPicPermission = function TinyPicPermission() {

  };

  return TinyPicPermission.extend('TinyPicPermission', {},
      BasePermission.prototype);
});
