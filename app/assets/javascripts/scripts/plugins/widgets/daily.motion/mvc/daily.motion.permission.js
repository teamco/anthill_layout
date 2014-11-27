/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineDailyMotionPermission(BasePermission) {

    /**
     * Define Permissions
     * @class DailyMotionPermission
     * @constructor
     * @extends BasePermission
     */
    var DailyMotionPermission = function DailyMotionPermission() {

    };

    return DailyMotionPermission.extend('DailyMotionPermission', {

    }, BasePermission.prototype);
});
