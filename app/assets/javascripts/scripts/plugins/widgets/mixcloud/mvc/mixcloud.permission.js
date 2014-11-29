/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineMixcloudPermission(BasePermission) {

    /**
     * Define Permissions
     * @class MixcloudPermission
     * @constructor
     * @extends BasePermission
     */
    var MixcloudPermission = function MixcloudPermission() {

    };

    return MixcloudPermission.extend('MixcloudPermission', {

    }, BasePermission.prototype);
});
