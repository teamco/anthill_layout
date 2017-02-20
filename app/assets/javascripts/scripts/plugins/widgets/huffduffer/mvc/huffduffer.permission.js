/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineHuffdufferPermission(BasePermission) {

  /**
   * Define Permissions
   * @class HuffdufferPermission
   * @constructor
   * @extends BasePermission
   */
  var HuffdufferPermission = function HuffdufferPermission() {
  };

  return HuffdufferPermission.extend(
      'HuffdufferPermission', {},
      BasePermission.prototype
  );
});
