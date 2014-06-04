define(
    [
        'config/anthill',
        'modules/mvc',
        'api/workspace.api',
        'controller/workspace.controller',
        'model/workspace.model',
        'view/workspace.view',
        'event/workspace.event.manager',
        'permission/workspace.permission'
    ],

    /**
     * Define Workspace
     * @param {AntHill} AntHill
     * @param {MVC} MVC
     * @param {WorkspaceAPI} API
     * @param {WorkspaceController} Controller
     * @param {WorkspaceModel} Model
     * @param {WorkspaceView} View
     * @param {WorkspaceEventManager} EventManager
     * @param {WorkspacePermission} Permission
     * @returns {Workspace}
     */
        function defineWorkspace(AntHill, MVC, API, Controller, Model, View, EventManager, Permission) {

        /**
         * Define Workspace
         * @class Workspace
         * @param opts
         * @constructor
         * @extends AntHill
         */
        var Workspace = function Workspace(opts) {

            /**
             * Define swipe page
             * @member Workspace
             * @type {boolean}
             */
            this.swipePage = false;

            /**
             * Define default config
             * @type {{
             *      limit: boolean,
             *      isResized: boolean,
             *      type: string,
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
                isResized: true,
                type: 'default',
                order: 1,
                page: {
                    plural: false,
                    counter: 0,
                    limit: 10,
                    // Show previous page (false means Next)
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
             * Init API
             * @member Workspace
             * @type {undefined}
             */
            this.api = undefined;

            /**
             * Init config
             * @member Workspace
             * @type {*}
             */
            this.config = undefined;

            /**
             * Init observer
             * @member Workspace
             * @type {*}
             */
            this.observer = undefined;

            /**
             * Init event manager
             * @member Workspace
             * @type {*}
             */
            this.eventmanager = undefined;

            /**
             * Define controller
             * @member Workspace
             * @type {*}
             */
            this.controller = undefined;

            /**
             * Define model
             * @member Workspace
             * @type {*}
             */
            this.model = undefined;

            /**
             * Define view
             * @member Workspace
             * @type {*}
             */
            this.view = undefined;

            /**
             * Define permissions
             * @member Workspace
             * @type {*}
             */
            this.permission = undefined;

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
             * Define itemsÒ
             * @member Workspace
             * @type {*}
             */
            this.items = {};

            this.observer.publish(
                this.eventmanager.eventList.successCreated
            );

            this.observer.publish(
                this.eventmanager.eventList.bindHashChange
            );
        };

        return Workspace.extend('Workspace', {

        }, AntHill.prototype);
    }
);