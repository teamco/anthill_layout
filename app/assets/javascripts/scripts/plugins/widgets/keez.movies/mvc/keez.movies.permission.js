/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineKeezMoviesPermission(BasePermission) {

  /**
   * Define Permissions
   * @class KeezMoviesPermission
   * @constructor
   * @extends BasePermission
   */
  var KeezMoviesPermission = function KeezMoviesPermission() {

  };

  return KeezMoviesPermission.extend('KeezMoviesPermission', {},
      BasePermission.prototype);
});
