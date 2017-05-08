/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineLivestreamPermission(BasePermission) {

  /**
   * Define Permissions
   * @class LivestreamPermission
   * @constructor
   * @extends BasePermission
   */
  var LivestreamPermission = function LivestreamPermission() {

  };

  return LivestreamPermission.extend('LivestreamPermission', {},
      BasePermission.prototype);
});
