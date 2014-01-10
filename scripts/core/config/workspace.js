define([
    'modules/base',
    'modules/mvc',
    'api/workspace.api',
    'controller/workspace.controller',
    'model/workspace.model',
    'view/workspace.view',
    'event/workspace.event.manager',
    'permission/workspace.permission'
], function defineWorkspace(Base, MVC, API, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Workspace
     * @class Workspace
     * @extends {Base}
     * @param opts
     * @constructor
     */
    var Workspace = function Workspace(opts) {

        /**
         * Define default config
         * @type {{
         *  order: number,
         *  page: {counter: number, limit: number, onDestroyShowPrevious: boolean},
         *  html: {header: boolean, footer: boolean, stretch: boolean, padding: {top: number, right: number, bottom: number, left: number}}
         * }}
         */
        var DEFAULTS = {
            limit: false,
            type: 'default',
            order: 1,
            page: {
                resize: true,
                counter: 0,
                limit: 10,
                // Show previous page
                onDestroyShowPrevious: true
            },
            html: {
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
            ]
        });

        /**
         * Define page
         * @type {*|Page}
         */
        this.page = {};

        /**
         * Define items
         * @type {*}
         */
        this.items = {};

        this.observer.publish(this.eventmanager.eventList.successCreated);

    };

    return Workspace.extend(Base);

});