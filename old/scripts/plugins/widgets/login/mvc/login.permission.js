/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/permission'
], function defineLoginPermission(BasePermission) {

    /**
     * Define Permissions
     * @class LoginPermission
     * @constructor
     * @extends BasePermission
     */
    var LoginPermission = function LoginPermission() {

    };

    return LoginPermission.extend('LoginPermission', {

    }, BasePermission.prototype);
});