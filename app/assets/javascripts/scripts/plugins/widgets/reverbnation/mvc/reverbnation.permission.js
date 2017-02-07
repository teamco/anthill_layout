/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineReverbnationPermission(BasePermission) {

  /**
   * Define Permissions
   * @class ReverbnationPermission
   * @constructor
   * @extends BasePermission
   */
  var ReverbnationPermission = function ReverbnationPermission() {
  };

  return ReverbnationPermission.extend(
      'ReverbnationPermission', {},
      BasePermission.prototype
  );
});
