/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineBlipTvPermission(BasePermission) {

    /**
     * Define Permissions
     * @class BlipTvPermission
     * @constructor
     * @extends BasePermission
     */
    var BlipTvPermission = function BlipTvPermission() {

    };

    return BlipTvPermission.extend('BlipTvPermission', {

    }, BasePermission.prototype);
});
