/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineHereMapsForLifePermission(BasePermission) {

  /**
   * Define Permissions
   * @class HereMapsForLifePermission
   * @constructor
   * @extends BasePermission
   */
  var HereMapsForLifePermission = function HereMapsForLifePermission() {
  };

  return HereMapsForLifePermission.extend(
      'HereMapsForLifePermission', {},
      BasePermission.prototype
  );
});
