/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/permission'
], function defineStatisticsPermission(BasePermission) {

    /**
     * Define Permissions
     * @class StatisticsPermission
     * @constructor
     * @extends BasePermission
     */
    var StatisticsPermission = function StatisticsPermission() {

    };

    return StatisticsPermission.extend('StatisticsPermission', {

    }, BasePermission.prototype);
});