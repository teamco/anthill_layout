/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function definePasteryPermission(BasePermission) {

  /**
   * Define Permissions
   * @class PasteryPermission
   * @constructor
   * @extends BasePermission
   */
  var PasteryPermission = function PasteryPermission() {
  };

  return PasteryPermission.extend(
      'PasteryPermission', {},
      BasePermission.prototype
  );
});
