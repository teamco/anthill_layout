define(
    [
        'config/anthill',
        'modules/MVC',
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
             * Define default config
             * @type {{
             *      preferences: {},
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
                preferences: opts.preferences || {},
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
             * Define MVC
             * @memberOf Workspace
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

            this.init();
        };

        return Workspace.extend('Workspace', {

            /**
             * Define init
             * @memberOf Workspace
             */
            init: function init() {

                /**
                 * Define swipe page
                 * @memberOf Workspace
                 * @type {boolean}
                 */
                this.switchPage = false;

                /**
                 * Define page
                 * @memberOf Workspace
                 * @type {*|Page}
                 */
                this.page = {};

                /**
                 * Define itemsÒ
                 * @memberOf Workspace
                 * @type {*}
                 */
                this.items = {};

                this.observer.publish(
                    this.eventmanager.eventList.successCreated
                );

                this.observer.publish(
                    this.eventmanager.eventList.bindHashChange
                );

                this.observer.publish(
                    this.eventmanager.eventList.loadPreferences
                );
            }

        }, AntHill.prototype);
    }
);