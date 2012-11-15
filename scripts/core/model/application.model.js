/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'application',
    'modules/model'
], function(App, Model){
    App.prototype.Model = function AppModel() {
    };

    App.prototype.Model.extend({
        create: function create(workspace) {
            var ui = this.app.ui,
                base = this.app.com.base;

            workspace = base.define(workspace, {}, true);

            ui.workspace = new Workspace(this.app, base.define(workspace, {}, true));
            ui.workspaces[ui.workspace.config.uuid] = ui.workspace;
        },
        destroy: function destroy(workspace) {
    //        var workspaces = this.app.ui.workspaces;
    //        if (workspaces.hasOwnProperty(workspace.model.)) {
    //            delete workspaces[index];
    //        }
    //    }
        },
        destroyAll: function destroyAll(force) {
            var index,
                workspaces = this.app.ui.workspaces;
            for (index in workspaces) {
                if (workspaces.hasOwnProperty(index)) {
                    this.destroy(workspaces[index])
                }
            }
        }
    }, App, Model);
});