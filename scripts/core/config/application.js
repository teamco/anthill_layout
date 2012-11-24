define([
    'modules/base',
    'controller/application.controller',
    'model/application.model',
    'modules/mvc',
    'event/application.event.manager'
], function defineApp(Base, Controller, Model, MVC, EventManager) {

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

        this.workspaces = {};
        this.workspace = {};

        new MVC({
            scope: this,
            config: [opts, DEFAULTS],
            components: [
                Controller,
                Model,
                EventManager
            ],
            render: false
        });

    };

    return App.extend(Base);

});
