/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineMyWorldPermission(BasePermission) {

    /**
     * Define Permissions
     * @class MyWorldPermission
     * @constructor
     * @extends BasePermission
     */
    var MyWorldPermission = function MyWorldPermission() {

    };

    return MyWorldPermission.extend('MyWorldPermission', {

    }, BasePermission.prototype);
});
