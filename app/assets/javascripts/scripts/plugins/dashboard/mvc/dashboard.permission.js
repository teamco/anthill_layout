/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineDashboardPermission(BasePermission) {

    /**
     * Define Permissions
     * @class DashboardPermission
     * @constructor
     * @extends BasePermission
     */
    var DashboardPermission = function DashboardPermission() {
    };

    return DashboardPermission.extend(
        'DashboardPermission', {},
        BasePermission.prototype
    );
});