/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/permission'
], function definePagesPermission(BasePermission) {

    /**
     * Define Permissions
     * @class Permission
     * @constructor
     * @extends BasePermission
     */
    var Permission = function Permission() {

    };

    return Permission.extend({

    }, BasePermission.prototype);
});