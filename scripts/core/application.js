define([
    'modules/mvc'
], function defineApp(MVC) {

    var App = function App(opts) {

        opts = opts || {};

        this.com = {
            mode: 'development',
            config: {
                workspace: {
                    limit: 1,
                    order: []
                }
            },
            log: {
                development: true,
                debug: false,
                show: false,
                cover: false,
                namespace: false,
                type: {
                    debug: false,
                    log: false,
                    info: false,
                    error: true,
                    warn: true
                }
            },
            lib: {
            }
        };

        this.ui = {
            workspaces: {}
        };

        this.defineDependencies();

    };

    App.extend({
        defineDependencies: function defineDependencies() {
            new MVC(this);
        }
    });

    return App;
});
