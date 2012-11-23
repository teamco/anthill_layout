define([
    'controller/application.controller',
    'model/application.model',
    'modules/mvc',
    'modules/base',
    'event/application.event.manager'
], function defineApp(Controller, Model, MVC, Base, EventManager) {

    var App = function App(opts) {

        opts = this.base.define(opts, {}, true);

        var DEFAULTS = {
            workspace: {
                limit: 1,
                counter: 0
            },
            logger: {
                development: true,
                debug: true,
                show: true,
                namespaces: false, //'App',
                type: {
                    debug: false,
                    log: true,
                    info: true,
                    error: true,
                    warn: true
                }
            }
        };

        // Configure workspace
        this.config = this.base.lib.hash.extendHash(opts, DEFAULTS);


        this.workspaces = {};
        this.workspace = {};

        new MVC({
            scope: this,
            config: opts,
            components: [Controller, Model]
        });

    };

    return App.extend(Base, EventManager);

});
