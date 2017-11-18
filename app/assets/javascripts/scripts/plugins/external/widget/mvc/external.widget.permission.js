/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

defineP([
  'modules/Permission'
], function defineExternalWidgetPermission(BasePermission) {

  /**
   * Define Permissions
   * @class ExternalWidgetPermission
   * @constructor
   * @extends BasePermission
   */
  var ExternalWidgetPermission = function ExternalWidgetPermission() {
  };

  return ExternalWidgetPermission.extend('ExternalWidgetPermission', {},
      BasePermission.prototype);
});