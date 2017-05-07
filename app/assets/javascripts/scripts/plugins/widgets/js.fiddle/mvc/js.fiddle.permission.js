/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineJsFiddlePermission(BasePermission) {

  /**
   * Define Permissions
   * @class JsFiddlePermission
   * @constructor
   * @extends BasePermission
   */
  var JsFiddlePermission = function JsFiddlePermission() {

  };

  return JsFiddlePermission.extend('JsFiddlePermission', {},
      BasePermission.prototype);
});
