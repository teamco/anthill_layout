/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineGooglePlusPermission(BasePermission) {

  /**
   * Define Permissions
   * @class GooglePlusPermission
   * @constructor
   * @extends BasePermission
   */
  var GooglePlusPermission = function GooglePlusPermission() {
  };

  return GooglePlusPermission.extend(
      'GooglePlusPermission', {},
      BasePermission.prototype
  );
});
