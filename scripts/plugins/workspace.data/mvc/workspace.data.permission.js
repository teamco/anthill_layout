/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/permission'
], function defineWorkspaceDataPermission(BasePermission) {

    /**
     * Define Permissions
     * @class WorkspaceDataPermission
     * @constructor
     * @extends BasePermission
     */
    var WorkspaceDataPermission = function WorkspaceDataPermission() {

    };

    return WorkspaceDataPermission.extend('WorkspaceDataPermission', {

    }, BasePermission.prototype);
});