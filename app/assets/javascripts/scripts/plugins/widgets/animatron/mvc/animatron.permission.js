/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineAnimatronPermission(BasePermission) {

  /**
   * Define Permissions
   * @class AnimatronPermission
   * @constructor
   * @extends BasePermission
   */
  var AnimatronPermission = function AnimatronPermission() {
  };

  return AnimatronPermission.extend(
      'AnimatronPermission', {},
      BasePermission.prototype
  );
});
