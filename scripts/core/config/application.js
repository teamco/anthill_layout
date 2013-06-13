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

    /**
     * Define App
     * @class App
     * @extends {Base}
     * @param {{}} opts
     * @constructor
     */
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
         *      namespaces: string|boolean,
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
            type: 'default',
            limit: true,
            logger: {
                show: true,
                namespaces: false, //'App',
                type: {
                    debug: true,
                    log: false,
                    info: false,
                    error: true,
                    warn: true
                }
            }
        };

        /**
         * Define items
         * @type {*}
         */
        this.items = {};

        /**
         * Define workspace
         * @type {Workspace}
         */
        this.workspace = {};

        /**
         * Define MVC
         * @type {MVC}
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
