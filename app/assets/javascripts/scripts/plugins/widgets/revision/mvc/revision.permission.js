/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineRevisionPermission(BasePermission) {

  /**
   * Define Permissions
   * @class RevisionPermission
   * @constructor
   * @extends BasePermission
   */
  var RevisionPermission = function RevisionPermission() {

  };

  return RevisionPermission.extend('RevisionPermission', {},
      BasePermission.prototype);
});
