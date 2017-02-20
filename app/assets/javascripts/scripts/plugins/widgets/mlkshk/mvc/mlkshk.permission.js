/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineMlkshkPermission(BasePermission) {

  /**
   * Define Permissions
   * @class MlkshkPermission
   * @constructor
   * @extends BasePermission
   */
  var MlkshkPermission = function MlkshkPermission() {

  };

  return MlkshkPermission.extend('MlkshkPermission', {},
      BasePermission.prototype);
});
