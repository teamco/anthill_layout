/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function definePreziPermission(BasePermission) {

    /**
     * Define Permissions
     * @class PreziPermission
     * @constructor
     * @extends BasePermission
     */
    var PreziPermission = function PreziPermission() {

    };

    return PreziPermission.extend('PreziPermission', {

    }, BasePermission.prototype);
});
