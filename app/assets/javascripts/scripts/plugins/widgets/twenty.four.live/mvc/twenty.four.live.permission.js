/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineTwentyFourLivePermission(BasePermission) {

  /**
   * Define Permissions
   * @class TwentyFourLivePermission
   * @constructor
   * @extends BasePermission
   */
  var TwentyFourLivePermission = function TwentyFourLivePermission() {

  };

  return TwentyFourLivePermission.extend('TwentyFourLivePermission', {},
      BasePermission.prototype);
});
