/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineLogingglPermission(BasePermission) {

    /**
     * Define Permissions
     * @class LogingglPermission
     * @constructor
     * @extends BasePermission
     */
    var LogingglPermission = function LogingglPermission() {

    };

    return LogingglPermission.extend('LogingglPermission', {

    }, BasePermission.prototype);
});