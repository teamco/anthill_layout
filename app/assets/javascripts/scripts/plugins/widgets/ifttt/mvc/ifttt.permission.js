/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineIftttPermission(BasePermission) {

  /**
   * Define Permissions
   * @class IftttPermission
   * @constructor
   * @extends BasePermission
   */
  var IftttPermission = function IftttPermission() {
  };

  return IftttPermission.extend(
      'IftttPermission', {},
      BasePermission.prototype
  );
});
