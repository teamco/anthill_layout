/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineChannelTwoPermission(BasePermission) {

    /**
     * Define Permissions
     * @class ChannelTwoPermission
     * @constructor
     * @extends BasePermission
     */
    var ChannelTwoPermission = function ChannelTwoPermission() {

    };

    return ChannelTwoPermission.extend('ChannelTwoPermission', {

    }, BasePermission.prototype);
});
