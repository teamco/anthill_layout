/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function definePaypalBtnPermission(BasePermission) {

  /**
   * Define Permissions
   * @class PaypalBtnPermission
   * @constructor
   * @extends BasePermission
   */
  var PaypalBtnPermission = function PaypalBtnPermission() {
  };

  return PaypalBtnPermission.extend(
      'PaypalBtnPermission', {},
      BasePermission.prototype
  );
});
