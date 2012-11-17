define([
    'controller/application.controller',
    'model/application.model',
    'modules/mvc',
    'modules/base'
], function defineApp(Controller, Model, MVC, Base) {

    var App = function App(opts) {

        opts = this.base.define(opts, {}, true);

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
            }
        };

        this.ui = {
            workspaces: {},
            workspace: undefined
        };

        new MVC({
            scope: this,
            components: [Controller, Model]
        });

    };

    return App.extend(Base);

});
