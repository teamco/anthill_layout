/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineRadikalFotoPermission(BasePermission) {

  /**
   * Define Permissions
   * @class RadikalFotoPermission
   * @constructor
   * @extends BasePermission
   */
  var RadikalFotoPermission = function RadikalFotoPermission() {

  };

  return RadikalFotoPermission.extend('RadikalFotoPermission', {},
      BasePermission.prototype);
});
