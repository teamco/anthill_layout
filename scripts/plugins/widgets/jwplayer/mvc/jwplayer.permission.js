/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/permission'
], function defineJwplayerPermission(BasePermission) {

    /**
     * Define Permissions
     * @class JwplayerPermission
     * @constructor
     * @extends BasePermission
     */
    var JwplayerPermission = function JwplayerPermission() {

    };

    return JwplayerPermission.extend('JwplayerPermission', {

    }, BasePermission.prototype);
});