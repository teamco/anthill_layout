define([
    'config/anthill',
    'modules/mvc',
    'api/workspace.api',
    'controller/workspace.controller',
    'model/workspace.model',
    'view/workspace.view',
    'event/workspace.event.manager',
    'permission/workspace.permission'
], function defineWorkspace(AntHill, MVC, API, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Workspace
     * @class Workspace
     * @param opts
     * @constructor
     * @extends AntHill
     */
    var Workspace = function Workspace(opts) {

        /**
         * Define default config
         * @type {{
         *      order: number,
         *      page: {counter: number, limit: number, onDestroyShowPrevious: boolean},
         *      html: {
         *          style: string,
         *          header: boolean,
         *          footer: boolean,
         *          stretch: boolean,
         *          padding: {top: number, right: number, bottom: number, left: number}
         *      }
         * }}
         */
        var DEFAULTS = {
            limit: false,
            type: 'default',
            order: 1,
            page: {
                resize: true,
                plural: false,
                counter: 0,
                limit: 10,

                // Show previous page (false mean Next)
                onDestroyShowPrevious: true
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
         * Init observer
         * @member Workspace
         * @type {undefined}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Workspace
         * @type {undefined}
         */
        this.eventmanager = undefined;

        /**
         * Define MVC
         * @member Workspace
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
            ]
        });

        /**
         * Define page
         * @member Workspace
         * @type {*|Page}
         */
        this.page = {};

        /**
         * Define items
         * @member Workspace
         * @type {*}
         */
        this.items = {};

        this.observer.publish(
            this.eventmanager.eventList.successCreated
        );
    };

    return Workspace.extend('Workspace', {

    }, AntHill.prototype);

});