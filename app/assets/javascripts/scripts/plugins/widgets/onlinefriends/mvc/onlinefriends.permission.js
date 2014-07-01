/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineOnlinefriendsPermission(BasePermission) {

    /**
     * Define Permissions
     * @class OnlinefriendsPermission
     * @constructor
     * @extends BasePermission
     */
    var OnlinefriendsPermission = function OnlinefriendsPermission() {

    };

    return OnlinefriendsPermission.extend('OnlinefriendsPermission', {

    }, BasePermission.prototype);
});