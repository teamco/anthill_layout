/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineSoundCloudPermission(BasePermission) {

    /**
     * Define Permissions
     * @class SoundCloudPermission
     * @constructor
     * @extends BasePermission
     */
    var SoundCloudPermission = function SoundCloudPermission() {

    };

    return SoundCloudPermission.extend('SoundCloudPermission', {

    }, BasePermission.prototype);
});
