/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineIframelyPermission(BasePermission) {

    /**
     * Define Permissions
     * @class IframelyPermission
     * @constructor
     * @extends BasePermission
     */
    var IframelyPermission = function IframelyPermission() {
    };

    return IframelyPermission.extend(
        'IframelyPermission', {}, 
        BasePermission.prototype
    );
});
