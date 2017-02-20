/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineSketchfabPermission(BasePermission) {

  /**
   * Define Permissions
   * @class SketchfabPermission
   * @constructor
   * @extends BasePermission
   */
  var SketchfabPermission = function SketchfabPermission() {
  };

  return SketchfabPermission.extend(
      'SketchfabPermission', {},
      BasePermission.prototype
  );
});
