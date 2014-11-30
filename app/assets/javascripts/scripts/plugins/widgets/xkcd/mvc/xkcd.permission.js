/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineXkcdPermission(BasePermission) {

    /**
     * Define Permissions
     * @class XkcdPermission
     * @constructor
     * @extends BasePermission
     */
    var XkcdPermission = function XkcdPermission() {

    };

    return XkcdPermission.extend('XkcdPermission', {

    }, BasePermission.prototype);
});
