/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineElevenChannelUaPermission(BasePermission) {

    /**
     * Define Permissions
     * @class ElevenChannelUaPermission
     * @constructor
     * @extends BasePermission
     */
    var ElevenChannelUaPermission = function ElevenChannelUaPermission() {

    };

    return ElevenChannelUaPermission.extend('ElevenChannelUaPermission', {

    }, BasePermission.prototype);
});
