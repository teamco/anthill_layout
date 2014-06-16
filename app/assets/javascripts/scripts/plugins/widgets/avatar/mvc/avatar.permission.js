/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineAvatarPermission(BasePermission) {

    /**
     * Define Permissions
     * @class AvatarPermission
     * @constructor
     * @extends BasePermission
     */
    var AvatarPermission = function AvatarPermission() {

    };

    return AvatarPermission.extend('AvatarPermission', {

    }, BasePermission.prototype);
});