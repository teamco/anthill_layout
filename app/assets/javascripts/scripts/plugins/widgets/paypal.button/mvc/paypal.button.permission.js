/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function definePaypalButtonPermission(BasePermission) {

    /**
     * Define Permissions
     * @class PaypalButtonPermission
     * @constructor
     * @extends BasePermission
     */
    var PaypalButtonPermission = function PaypalButtonPermission() {
    };

    return PaypalButtonPermission.extend(
        'PaypalButtonPermission', {}, 
        BasePermission.prototype
    );
});
