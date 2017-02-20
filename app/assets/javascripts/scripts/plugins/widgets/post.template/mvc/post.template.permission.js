/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function definePostTemplatePermission(BasePermission) {

  /**
   * Define Permissions
   * @class PostTemplatePermission
   * @constructor
   * @extends BasePermission
   */
  var PostTemplatePermission = function PostTemplatePermission() {

  };

  return PostTemplatePermission.extend('PostTemplatePermission', {},
      BasePermission.prototype);
});