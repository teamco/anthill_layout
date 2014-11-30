/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineRdioPermission(BasePermission) {

    /**
     * Define Permissions
     * @class RdioPermission
     * @constructor
     * @extends BasePermission
     */
    var RdioPermission = function RdioPermission() {

    };

    return RdioPermission.extend('RdioPermission', {

    }, BasePermission.prototype);
});
