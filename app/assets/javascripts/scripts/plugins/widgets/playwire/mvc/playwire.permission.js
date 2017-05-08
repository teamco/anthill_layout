/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function definePlaywirePermission(BasePermission) {

  /**
   * Define Permissions
   * @class PlaywirePermission
   * @constructor
   * @extends BasePermission
   */
  var PlaywirePermission = function PlaywirePermission() {
  };

  return PlaywirePermission.extend(
      'PlaywirePermission', {},
      BasePermission.prototype
  );
});
