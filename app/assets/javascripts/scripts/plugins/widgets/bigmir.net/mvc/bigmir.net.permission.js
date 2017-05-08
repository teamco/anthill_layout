/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineBigmirNetPermission(BasePermission) {

  /**
   * Define Permissions
   * @class BigmirNetPermission
   * @constructor
   * @extends BasePermission
   */
  var BigmirNetPermission = function BigmirNetPermission() {

  };

  return BigmirNetPermission.extend('BigmirNetPermission', {},
      BasePermission.prototype);
});
