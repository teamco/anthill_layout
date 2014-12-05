/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineChannelNineUaPermission(BasePermission) {

    /**
     * Define Permissions
     * @class ChannelNineUaPermission
     * @constructor
     * @extends BasePermission
     */
    var ChannelNineUaPermission = function ChannelNineUaPermission() {

    };

    return ChannelNineUaPermission.extend('ChannelNineUaPermission', {

    }, BasePermission.prototype);
});
