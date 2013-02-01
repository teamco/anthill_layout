define([
    'modules/base',
    'controller/application.controller',
    'model/application.model',
    'view/application.view',
    'modules/mvc',
    'event/application.event.manager'
], function defineApp(Base, Controller, Model, View, MVC, EventManager) {

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

        this.items = {};
        this.workspace = {};

        new MVC({
            scope: this,
            config: [opts, DEFAULTS],
            components: [
                Controller,
                Model,
                View,
                EventManager
            ],
            render: true
        });

    };

    return App.extend(Base);

});
