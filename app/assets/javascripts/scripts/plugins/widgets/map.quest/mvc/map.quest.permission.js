/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineMapQuestPermission(BasePermission) {

  /**
   * Define Permissions
   * @class MapQuestPermission
   * @constructor
   * @extends BasePermission
   */
  var MapQuestPermission = function MapQuestPermission() {
  };

  return MapQuestPermission.extend(
      'MapQuestPermission', {},
      BasePermission.prototype
  );
});
