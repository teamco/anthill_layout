/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineKremPermission(BasePermission) {

    /**
     * Define Permissions
     * @class KremPermission
     * @constructor
     * @extends BasePermission
     */
    var KremPermission = function KremPermission() {

    };

    return KremPermission.extend('KremPermission', {

    }, BasePermission.prototype);
});
