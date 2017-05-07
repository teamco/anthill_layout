/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineRssPermission(BasePermission) {

  /**
   * Define Permissions
   * @class RssPermission
   * @constructor
   * @extends BasePermission
   */
  var RssPermission = function RssPermission() {

  };

  return RssPermission.extend('RssPermission', {}, BasePermission.prototype);
});