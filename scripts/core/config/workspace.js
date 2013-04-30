define([
    'modules/base',
    'modules/mvc',
    'controller/workspace.controller',
    'model/workspace.model',
    'view/workspace.view',
    'event/workspace.event.manager'
], function defineWorkspace(Base, MVC, Controller, Model, View, EventManager) {

    /**
     * Define Workspace
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
            order: 1,
            page: {
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
         * @type {modules.mvc}
         */
        this.mvc = new MVC({
            scope: this,
            config: [opts, DEFAULTS],
            components: [
                Controller,
                Model,
                View,
                EventManager
            ]
        });

        /**
         * Define page
         * @type {workspace.page}
         */
        this.page = {};

        /**
         * Define items
         * @type {workspace.items}
         */
        this.items = {};

        this.observer.publish(this.eventmanager.eventList.successCreated);

    };

    return Workspace.extend(Base);

});