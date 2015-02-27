/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineApplicationPermission(BasePermission) {

    /**
     * Define Permissions
     * @extends BasePermission
     * @class ApplicationPermission
     * @constructor
     */
    var ApplicationPermission = function ApplicationPermission() {

    };

    return ApplicationPermission.extend('ApplicationPermission', {

    }, BasePermission.prototype);
});