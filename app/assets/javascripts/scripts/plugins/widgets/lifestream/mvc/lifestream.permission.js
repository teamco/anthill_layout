/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineLifestreamPermission(BasePermission) {

    /**
     * Define Permissions
     * @class LifestreamPermission
     * @constructor
     * @extends BasePermission
     */
    var LifestreamPermission = function LifestreamPermission() {

    };

    return LifestreamPermission.extend('LifestreamPermission', {

    }, BasePermission.prototype);
});
