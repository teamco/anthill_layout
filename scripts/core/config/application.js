define([
    'modules/base',
    'controller/application.controller',
    'model/application.model',
    'view/application.view',
    'modules/mvc',
    'event/application.event.manager',
    'permission/application.permission'
], function defineApp(Base, Controller, Model, View, MVC, EventManager, Permission) {

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
         * @type {{}}
         */
        this.items = {};

        /**
         * Define workspace
         * @type {{}}
         */
        this.workspace = {};

        /**
         * Define MVC
         * @type {modules.mvc}
         */
        this.mvc = new MVC({
            scope: this,
            config: [opts, DEFAULTS],
            components: [
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
