define([
    'controller/application.controller',
    'model/application.model',
    'modules/mvc',
    'modules/base',
    'modules/observer',
    'event/application.event.manager'
], function defineApp(Controller, Model, MVC, Base, Observer, EventManager) {

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
            workspace: {}
        };

        new MVC({
            scope: this,
            components: [Controller, Model]
        });

    };

    return App.extend(Base, Observer, EventManager);

});
