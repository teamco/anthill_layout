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
    'controller/workspace/workspace'
], function(BaseModel, Base, Workspace){
    var Model = function Model() {
    };

    return Model.extend({
        createWorkspace: function createWorkspace(workspace) {
            var ui = this.app.ui;

            ui.workspace = new Workspace(this.base.define(workspace, {}, true));
            ui.workspaces[ui.workspace.config.uuid] = ui.workspace;
        },
        destroyWorkspace: function destroyWorkspace(workspace) {
    //        var workspaces = this.app.ui.workspaces;
    //        if (workspaces.hasOwnProperty(workspace.model.)) {
    //            delete workspaces[index];
    //        }
    //    }
        },
        destroyWorkspaces: function destroyWorkspace(force) {
            var index,
                workspaces = this.app.ui.workspaces;
            for (index in workspaces) {
                if (workspaces.hasOwnProperty(index)) {
                    this.destroy(workspaces[index])
                }
            }
        }
    }, BaseModel.prototype, Base);

});