/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineFiveChannelUaPermission(BasePermission) {

  /**
   * Define Permissions
   * @class FiveChannelUaPermission
   * @constructor
   * @extends BasePermission
   */
  var FiveChannelUaPermission = function FiveChannelUaPermission() {

  };

  return FiveChannelUaPermission.extend('FiveChannelUaPermission', {},
      BasePermission.prototype);
});
