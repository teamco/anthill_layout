/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineEdocrPermission(BasePermission) {

  /**
   * Define Permissions
   * @class EdocrPermission
   * @constructor
   * @extends BasePermission
   */
  var EdocrPermission = function EdocrPermission() {
  };

  return EdocrPermission.extend(
      'EdocrPermission', {},
      BasePermission.prototype
  );
});
