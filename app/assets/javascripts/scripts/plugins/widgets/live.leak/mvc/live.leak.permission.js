/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineLiveLeakPermission(BasePermission) {

    /**
     * Define Permissions
     * @class LiveLeakPermission
     * @constructor
     * @extends BasePermission
     */
    var LiveLeakPermission = function LiveLeakPermission() {

    };

    return LiveLeakPermission.extend('LiveLeakPermission', {

    }, BasePermission.prototype);
});