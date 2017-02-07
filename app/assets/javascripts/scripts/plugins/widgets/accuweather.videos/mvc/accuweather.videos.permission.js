/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineAccuweatherVideosPermission(BasePermission) {

  /**
   * Define Permissions
   * @class AccuweatherVideosPermission
   * @constructor
   * @extends BasePermission
   */
  var AccuweatherVideosPermission = function AccuweatherVideosPermission() {
  };

  return AccuweatherVideosPermission.extend(
      'AccuweatherVideosPermission', {},
      BasePermission.prototype
  );
});
