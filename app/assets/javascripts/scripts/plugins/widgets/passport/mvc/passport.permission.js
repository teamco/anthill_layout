/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function definePassportPermission(BasePermission) {

    /**
     * Define Permissions
     * @class PassportPermission
     * @constructor
     * @extends BasePermission
     */
    var PassportPermission = function PassportPermission() {

    };

    return PassportPermission.extend('PassportPermission', {

    }, BasePermission.prototype);
});