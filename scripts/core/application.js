require([
    'controller/workspace/workspace.config'
], function loadApplication() {
    var App =  function App(opts) {

        opts = opts || {};

        this.com = {
            base: new Base(this),
            lib: {
            }
        };
        this.ui = {
            workspaces: [],
            workspace: new Workspace(this, opts.workspace)
        };
    };

    window.App = new App(Routes.storage);
});
