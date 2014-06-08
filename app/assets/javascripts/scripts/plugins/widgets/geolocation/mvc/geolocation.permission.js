/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineGeolocationPermission(BasePermission) {

    /**
     * Define Permissions
     * @class GeolocationPermission
     * @constructor
     * @extends BasePermission
     */
    var GeolocationPermission = function GeolocationPermission() {

    };

    return GeolocationPermission.extend('GeolocationPermission', {

    }, BasePermission.prototype);
});