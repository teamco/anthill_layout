/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineSportlivePermission(BasePermission) {

    /**
     * Define Permissions
     * @class SportlivePermission
     * @constructor
     * @extends BasePermission
     */
    var SportlivePermission = function SportlivePermission() {
    };

    return SportlivePermission.extend(
        'SportlivePermission', {}, 
        BasePermission.prototype
    );
});
