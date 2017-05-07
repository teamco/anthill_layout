/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineUrlWidgetPermission(BasePermission) {

  /**
   * Define Permissions
   * @class UrlWidgetPermission
   * @constructor
   * @extends BasePermission
   */
  var UrlWidgetPermission = function UrlWidgetPermission() {
  };

  return UrlWidgetPermission.extend(
      'UrlWidgetPermission', {},
      BasePermission.prototype
  );
});
