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
         * Ex. logger.namespace: 'App'
         *
         * @type {{
         *  workspace: {
         *      limit: number,
         *      counter: number
         *  },
         *  mode: string,
         *  type: string,
         *  isResized: boolean,
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
                resize: true,
                plural: false,
                limit: 1,
                counter: 0
            },
            appName: 'anthill',
            mode: 'development',
            type: 'default',
            isResized: false,
            limit: true,
            logger: {
                show: true,
                namespaces: false,
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
         * Init observer
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @type {*}
         */
        this.config = undefined;

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

        this.observer.publish(
            this.eventmanager.eventList.defineSetting
        );

        this.observer.publish(
            this.eventmanager.eventList.initResizeWindow
        );

        this.observer.publish(
            this.eventmanager.eventList.successCreated
        );

    };

    return App.extend(Base);

});
