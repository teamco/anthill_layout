/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineIceFloePermission(BasePermission) {

    /**
     * Define Permissions
     * @class IceFloePermission
     * @constructor
     * @extends BasePermission
     */
    var IceFloePermission = function IceFloePermission() {

    };

    return IceFloePermission.extend('IceFloePermission', {

    }, BasePermission.prototype);
});