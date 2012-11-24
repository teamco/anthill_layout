/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/model',
    'modules/base',
    'config/workspace'
], function (BaseModel, Base, Workspace) {
    var Model = function Model() {
    };

    return Model.extend({
        createWorkspace: function createWorkspace(opts, config) {

            opts = this.base.lib.hash.extendHash(opts, config);

            var scope = this.scope,
                workspace = this.updateCollector(
                    Workspace,
                    opts,
                    scope.workspaces
                );
            if (workspace) {
                scope.workspace = workspace;
            }
            return scope.workspace;
        },
        destroyWorkspace: function destroyWorkspace(workspace) {

            var scope = this.scope;

            if (!this.base.isDefined(workspace)) {
                scope.logger.warn('Undefined workspace', workspace);
                return false;
            }

            var workspaces = scope.workspaces,
                index = workspace.model.getUUID();

            workspace.observer.fireEvent(
                workspace.eventmanager.eventList.destroyPages
            );

            if (workspaces.hasOwnProperty(index)) {
                delete workspaces[index];
            }

            this.scope.workspace = this.base.lib.hash.firstHashElement(workspaces) || {};

            return workspaces;

        },
        destroyWorkspaces: function destroyWorkspace(force) {
            var index,
                workspaces = this.scope.workspaces;
            for (index in workspaces) {
                if (workspaces.hasOwnProperty(index)) {
                    this.destroy(workspaces[index])
                }
            }
            return workspaces;
        }
    }, BaseModel.prototype, Base);

});