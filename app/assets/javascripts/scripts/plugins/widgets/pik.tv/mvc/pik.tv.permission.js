/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function definePikTvPermission(BasePermission) {

    /**
     * Define Permissions
     * @class PikTvPermission
     * @constructor
     * @extends BasePermission
     */
    var PikTvPermission = function PikTvPermission() {

    };

    return PikTvPermission.extend('PikTvPermission', {

    }, BasePermission.prototype);
});
