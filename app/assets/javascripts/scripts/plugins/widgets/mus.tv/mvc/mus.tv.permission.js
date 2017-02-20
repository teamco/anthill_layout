/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineMusTvPermission(BasePermission) {

  /**
   * Define Permissions
   * @class MusTvPermission
   * @constructor
   * @extends BasePermission
   */
  var MusTvPermission = function MusTvPermission() {

  };

  return MusTvPermission.extend('MusTvPermission', {},
      BasePermission.prototype);
});
