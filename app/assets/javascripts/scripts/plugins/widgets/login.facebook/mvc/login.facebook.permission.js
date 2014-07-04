/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineLoginFacebookPermission(BasePermission) {

    /**
     * Define Permissions
     * @class LoginFacebookPermission
     * @constructor
     * @extends BasePermission
     */
    var LoginFacebookPermission = function LoginFacebookPermission() {

    };

    return LoginFacebookPermission.extend('LoginFacebookPermission', {

    }, BasePermission.prototype);
});