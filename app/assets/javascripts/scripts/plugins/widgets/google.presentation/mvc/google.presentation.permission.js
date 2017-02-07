/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineGooglePresentationPermission(BasePermission) {

  /**
   * Define Permissions
   * @class GooglePresentationPermission
   * @constructor
   * @extends BasePermission
   */
  var GooglePresentationPermission = function GooglePresentationPermission() {

  };

  return GooglePresentationPermission.extend('GooglePresentationPermission', {},
      BasePermission.prototype);
});
