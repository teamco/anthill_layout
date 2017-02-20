/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineMapLocatorPermission(BasePermission) {

  /**
   * Define Permissions
   * @class MapLocatorPermission
   * @constructor
   * @extends BasePermission
   */
  var MapLocatorPermission = function MapLocatorPermission() {

  };

  return MapLocatorPermission.extend('MapLocatorPermission', {},
      BasePermission.prototype);
});