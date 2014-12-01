/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineOnePlusOnePermission(BasePermission) {

    /**
     * Define Permissions
     * @class OnePlusOnePermission
     * @constructor
     * @extends BasePermission
     */
    var OnePlusOnePermission = function OnePlusOnePermission() {

    };

    return OnePlusOnePermission.extend('OnePlusOnePermission', {

    }, BasePermission.prototype);
});
