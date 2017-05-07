/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function definePhotobucketPermission(BasePermission) {

  /**
   * Define Permissions
   * @class PhotobucketPermission
   * @constructor
   * @extends BasePermission
   */
  var PhotobucketPermission = function PhotobucketPermission() {

  };

  return PhotobucketPermission.extend('PhotobucketPermission', {},
      BasePermission.prototype);
});
