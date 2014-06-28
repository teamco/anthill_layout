/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineIcefloePermission(BasePermission) {

    /**
     * Define Permissions
     * @class IcefloePermission
     * @constructor
     * @extends BasePermission
     */
    var IcefloePermission = function IcefloePermission() {

    };

    return IcefloePermission.extend('IcefloePermission', {

    }, BasePermission.prototype);
});