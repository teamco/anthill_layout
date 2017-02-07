/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineMixbookPermission(BasePermission) {

  /**
   * Define Permissions
   * @class MixbookPermission
   * @constructor
   * @extends BasePermission
   */
  var MixbookPermission = function MixbookPermission() {

  };

  return MixbookPermission.extend('MixbookPermission', {},
      BasePermission.prototype);
});
