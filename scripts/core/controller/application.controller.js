/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/controller'
], function defineApplicationController(BaseController) {
    var Controller = function Controller() {
    };

    return Controller.extend({
        createWorkspace: function createWorkspace() {
            var workspace = this.model.createWorkspace();
            this.logger.info(
                'createWorkspace',
                workspace.model.getUUID(),
                workspace
            );
        },
        destroyWorkspace: function destroyWorkspace(workspace) {
            var workspaces = this.model.destroyWorkspace(workspace);
            this.logger.info(
                'destroyWorkspace',
                workspace.model.getUUID(),
                workspaces
            );
        },
        destroyWorkspaces: function destroyWorkspaces() {
            var workspaces = this.model.destroyWorkspaces();
            this.logger.info(
                'destroyWorkspaces',
                workspaces
            );
        }
    }, BaseController.prototype);

});