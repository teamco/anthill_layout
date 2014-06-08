/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineAppPermission(BasePermission) {

    /**
     * Define Permissions
     * @extends BasePermission
     * @class AppPermission
     * @constructor
     */
    var AppPermission = function AppPermission() {

    };

    return AppPermission.extend('AppPermission', {

    }, BasePermission.prototype);
});