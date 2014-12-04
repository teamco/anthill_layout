/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineTviPermission(BasePermission) {

    /**
     * Define Permissions
     * @class TviPermission
     * @constructor
     * @extends BasePermission
     */
    var TviPermission = function TviPermission() {

    };

    return TviPermission.extend('TviPermission', {

    }, BasePermission.prototype);
});
