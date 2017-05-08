/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineMetaUaPermission(BasePermission) {

  /**
   * Define Permissions
   * @class MetaUaPermission
   * @constructor
   * @extends BasePermission
   */
  var MetaUaPermission = function MetaUaPermission() {

  };

  return MetaUaPermission.extend('MetaUaPermission', {},
      BasePermission.prototype);
});
