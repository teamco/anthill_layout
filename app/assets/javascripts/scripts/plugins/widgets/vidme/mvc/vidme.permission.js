/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineVidmePermission(BasePermission) {

    /**
     * Define Permissions
     * @class VidmePermission
     * @constructor
     * @extends BasePermission
     */
    var VidmePermission = function VidmePermission() {

    };

    return VidmePermission.extend('VidmePermission', {

    }, BasePermission.prototype);
});
