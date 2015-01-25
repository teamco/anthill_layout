define([
    'config/anthill',
    'api/application.api',
    'modules/MVC',
    'controller/application.controller',
    'model/application.model',
    'view/application.view',
    'event/application.event.manager',
    'permission/application.permission'
], function defineApp(AntHill, API, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define App
     * @class App
     * @extends AntHill
     * @param {{}} opts
     * @constructor
     */
    var App = function App(opts) {

        /**
         * Default config
         * Ex. logger.namespace: 'App'
         *
         * @type {{
         *      workspace: {
         *          limit: number,
         *          counter: number
         *      },
         *      appName: string,
         *      version: number,
         *      mode: string,
         *      type: string,
         *      activate: boolean,
         *      isResized: boolean,
         *      loading: boolean,
         *      logger: {
         *          show: boolean,
         *          namespaces: string|boolean,
         *          type: {
         *              debug: boolean,
         *              log: boolean,
         *              info: boolean,
         *              error: boolean,
         *              warn: boolean
         *          }
         *      },
         *      html: {
         *          style: string,
         *          header: boolean,
         *          footer: boolean,
         *          stretch: boolean,
         *          padding: {
         *              top: number,
         *              right: number,
         *              bottom: number,
         *              left: number
         *          }
         *      }
         * }}
         */
        var DEFAULTS = {
            workspace: {
                plural: false,
                limit: 1,
                counter: 0
            },
            appName: 'anthill',
            version: 1,
            mode: 'development',
            type: 'default',
            activate: false,
            isResized: true,
            loading: false,
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
            },
            html: {
                style: 'default',
                header: false,
                footer: false,
                stretch: true,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }
        };

        /**
         * Define loading data counter
         * @member App
         * @type {number|*}
         */
        this.loadingDataCounter = undefined;

        /**
         * Define panels
         * @member App
         * @type {{}}
         */
        this.panels = {};

        /**
         * Define items
         * @member App
         * @type {*}
         */
        this.items = {};

        /**
         * Define workspace
         * @member App
         * @type {Workspace}
         */
        this.workspace = {};

        /**
         * Define MVC
         * @member App
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [opts.config, DEFAULTS],
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

        /**
         * Update routes
         * @type {{updateSiteContent: string[]}}
         */
        this.config.routes = {
            updateSiteContent: [
                '/sites/',
                'put'
            ]
        };

        this.observer.batchPublish(
            this.eventmanager.eventList.defineSetting,
            this.eventmanager.eventList.setRoutes,
            this.eventmanager.eventList.initResizeWindow,
            this.eventmanager.eventList.successCreated,
            this.eventmanager.eventList.loadApplication,
            this.eventmanager.eventList.defineGlobalInstance
        );
    };

    return App.extend('App', {}, AntHill.prototype);
});
