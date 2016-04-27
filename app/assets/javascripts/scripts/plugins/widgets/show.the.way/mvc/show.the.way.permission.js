/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineShowTheWayPermission(BasePermission) {

    /**
     * Define Permissions
     * @class ShowTheWayPermission
     * @constructor
     * @extends BasePermission
     */
    var ShowTheWayPermission = function ShowTheWayPermission() {
    };

    return ShowTheWayPermission.extend(
        'ShowTheWayPermission', {}, 
        BasePermission.prototype
    );
});
