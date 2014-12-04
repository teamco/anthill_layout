/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineUstreamPermission(BasePermission) {

    /**
     * Define Permissions
     * @class UstreamPermission
     * @constructor
     * @extends BasePermission
     */
    var UstreamPermission = function UstreamPermission() {

    };

    return UstreamPermission.extend('UstreamPermission', {

    }, BasePermission.prototype);
});
