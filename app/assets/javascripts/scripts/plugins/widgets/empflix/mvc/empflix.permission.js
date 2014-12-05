/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineEmpflixPermission(BasePermission) {

    /**
     * Define Permissions
     * @class EmpflixPermission
     * @constructor
     * @extends BasePermission
     */
    var EmpflixPermission = function EmpflixPermission() {

    };

    return EmpflixPermission.extend('EmpflixPermission', {

    }, BasePermission.prototype);
});
