/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function definePizapPhotoEditorPermission(BasePermission) {

  /**
   * Define Permissions
   * @class PizapPhotoEditorPermission
   * @constructor
   * @extends BasePermission
   */
  var PizapPhotoEditorPermission = function PizapPhotoEditorPermission() {
  };

  return PizapPhotoEditorPermission.extend(
      'PizapPhotoEditorPermission', {},
      BasePermission.prototype
  );
});
