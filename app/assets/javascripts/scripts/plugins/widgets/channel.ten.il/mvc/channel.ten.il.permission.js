/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineChannelTenIlPermission(BasePermission) {

  /**
   * Define Permissions
   * @class ChannelTenIlPermission
   * @constructor
   * @extends BasePermission
   */
  var ChannelTenIlPermission = function ChannelTenIlPermission() {

  };

  return ChannelTenIlPermission.extend('ChannelTenIlPermission', {},
      BasePermission.prototype);
});
