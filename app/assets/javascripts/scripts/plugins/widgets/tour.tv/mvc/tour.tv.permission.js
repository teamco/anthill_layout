/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineTourTvPermission(BasePermission) {

  /**
   * Define Permissions
   * @class TourTvPermission
   * @constructor
   * @extends BasePermission
   */
  var TourTvPermission = function TourTvPermission() {

  };

  return TourTvPermission.extend('TourTvPermission', {},
      BasePermission.prototype);
});
