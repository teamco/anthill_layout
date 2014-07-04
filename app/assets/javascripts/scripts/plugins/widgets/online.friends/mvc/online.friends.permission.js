/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineOnlineFriendsPermission(BasePermission) {

    /**
     * Define Permissions
     * @class OnlineFriendsPermission
     * @constructor
     * @extends BasePermission
     */
    var OnlineFriendsPermission = function OnlineFriendsPermission() {

    };

    return OnlineFriendsPermission.extend('OnlineFriendsPermission', {

    }, BasePermission.prototype);
});