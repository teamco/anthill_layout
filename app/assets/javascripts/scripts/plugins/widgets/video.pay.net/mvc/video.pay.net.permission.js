/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineVideoPayNetPermission(BasePermission) {

    /**
     * Define Permissions
     * @class VideoPayNetPermission
     * @constructor
     * @extends BasePermission
     */
    var VideoPayNetPermission = function VideoPayNetPermission() {

    };

    return VideoPayNetPermission.extend('VideoPayNetPermission', {

    }, BasePermission.prototype);
});
