/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineSapoVideosPermission(BasePermission) {

    /**
     * Define Permissions
     * @class SapoVideosPermission
     * @constructor
     * @extends BasePermission
     */
    var SapoVideosPermission = function SapoVideosPermission() {
    };

    return SapoVideosPermission.extend(
        'SapoVideosPermission', {}, 
        BasePermission.prototype
    );
});
