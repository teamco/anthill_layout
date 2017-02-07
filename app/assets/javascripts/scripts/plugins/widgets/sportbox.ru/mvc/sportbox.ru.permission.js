/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineSportboxRuPermission(BasePermission) {

  /**
   * Define Permissions
   * @class SportboxRuPermission
   * @constructor
   * @extends BasePermission
   */
  var SportboxRuPermission = function SportboxRuPermission() {
  };

  return SportboxRuPermission.extend(
      'SportboxRuPermission', {},
      BasePermission.prototype
  );
});
