/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineTwentyThreePermission(BasePermission) {

  /**
   * Define Permissions
   * @class TwentyThreePermission
   * @constructor
   * @extends BasePermission
   */
  var TwentyThreePermission = function TwentyThreePermission() {

  };

  return TwentyThreePermission.extend('TwentyThreePermission', {},
      BasePermission.prototype);
});
