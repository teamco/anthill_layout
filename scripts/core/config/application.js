define([
    'modules/base',
    'api/application.api',
    'modules/mvc',
    'controller/application.controller',
    'model/application.model',
    'view/application.view',
    'event/application.event.manager',
    'permission/application.permission'
], function defineApp(Base, API, MVC, Controller, Model, View, EventManager, Permission) {

    var App = function App(opts) {

        /**
         * Default config
         * @type {{
         *  workspace: {
         *      limit: number,
         *      counter: number
         *  },
         *  mode: string,
         *  logger: {
         *      show: boolean,
         *      namespaces: boolean,
         *      type: {
         *          debug: boolean,
         *          log: boolean,
         *          info: boolean,
         *          error: boolean,
         *          warn: boolean
         *      }
         *  }
         * }}
         */
        var DEFAULTS = {
            workspace: {
                limit: 1,
                counter: 0
            },
            mode: 'development',
            logger: {
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

        /**
         * Define items
         * @type {app.items}
         */
        this.items = {};

        /**
         * Define workspace
         * @type {app.workspace}
         */
        this.workspace = {};

        /**
         * Define MVC
         * @type {app.mvc}
         */
        this.mvc = new MVC({
            scope: this,
            config: [opts, DEFAULTS],
            components: [
                API,
                Controller,
                Model,
                View,
                EventManager,
                Permission
            ],
            render: true
        });

        this.controller.initResizeWindow();

        this.observer.publish(this.eventmanager.eventList.successCreated);

    };

    return App.extend(Base);

});
