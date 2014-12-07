/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineOneTwelveChannelUaPermission(BasePermission) {

    /**
     * Define Permissions
     * @class OneTwelveChannelUaPermission
     * @constructor
     * @extends BasePermission
     */
    var OneTwelveChannelUaPermission = function OneTwelveChannelUaPermission() {

    };

    return OneTwelveChannelUaPermission.extend('OneTwelveChannelUaPermission', {

    }, BasePermission.prototype);
});
