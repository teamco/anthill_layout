/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineDocsComPermission(BasePermission) {

  /**
   * Define Permissions
   * @class DocsComPermission
   * @constructor
   * @extends BasePermission
   */
  var DocsComPermission = function DocsComPermission() {
  };

  return DocsComPermission.extend(
      'DocsComPermission', {},
      BasePermission.prototype
  );
});
