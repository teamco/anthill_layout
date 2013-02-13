define([
    'modules/base',
    'controller/application.controller',
    'model/application.model',
    'view/application.view',
    'modules/mvc',
    'event/application.event.manager'
], function defineApp(Base, Controller, Model, View, MVC, EventManager) {

    var App = function App(opts) {

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
                    log: false,
                    info: false,
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

        this.observer.publish(this.eventmanager.eventList.successCreated);

    };

    return App.extend(Base);

});
