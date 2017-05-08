/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineChannelTwoIlPermission(BasePermission) {

  /**
   * Define Permissions
   * @class ChannelTwoIlPermission
   * @constructor
   * @extends BasePermission
   */
  var ChannelTwoIlPermission = function ChannelTwoIlPermission() {

  };

  return ChannelTwoIlPermission.extend('ChannelTwoIlPermission', {},
      BasePermission.prototype);
});
