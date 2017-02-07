/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineVersePermission(BasePermission) {

  /**
   * Define Permissions
   * @class VersePermission
   * @constructor
   * @extends BasePermission
   */
  var VersePermission = function VersePermission() {
  };

  return VersePermission.extend(
      'VersePermission', {},
      BasePermission.prototype
  );
});
