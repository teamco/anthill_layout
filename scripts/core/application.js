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

        this.config = {
            workspace: {
                limit: 1
            },
            logger: {
                development: true,
                debug: true,
                show: true,
                namespaces: 'App',
                type: {
                    debug: true,
                    log: true,
                    info: true,
                    error: true,
                    warn: true
                }
            }
        };

        this.workspaces = {};
        this.workspace = {}

        new MVC({
            scope: this,
            config: opts,
            components: [Controller, Model]
        });

    };

    return App.extend(Base, Observer, EventManager);

});
