/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/MVC',
    'api/page.api',
    'controller/page.controller',
    'model/page.model',
    'view/page.view',
    'event/page.event.manager',
    'permission/page.permission'
], function definePage(AntHill, MVC, API, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Page
     * @class Page
     * @param opts
     * @extends AntHill
     * @constructor
     */
    var Page = function Page(opts) {

        /**
         * Define layout modes
         * @property Page
         * @type {{
         *      snap2grid: string,
         *      jqUIGrid: string
         *      freeStyle: string
         * }}
         */
        this.LAYOUT_MODES = {
            snap2grid: 'snap2grid',
            jqUIGrid: 'jqUIGrid',
            freeStyle: 'freeStyle'
        };

        /**
         * Define organize modes
         * @property Page
         * @type {{
         *      none: string,
         *      row: string,
         *      column: string
         * }}
         */
        this.ORGANIZE_MODES = {
            none: 'none',
            row: 'row',
            column: 'column',
            right: 'right',
            left: 'left'
        };

        /**
         * Define content loaded instance
         * @property Page
         * @type {boolean}
         */
        this.contentLoaded = false;

        /**
         * Define default config
         * @type {{
         *      preferences: {},
         *      order: number,
         *      type: string,
         *      limit: boolean,
         *      isDefault: boolean,
         *      isResized: boolean,
         *      layout: {
         *          behavior: {
         *              snap2grid: {
         *                  animate: boolean,
         *                  float: string,
         *                  organize: string,
         *                  emptySpaces: string
         *              },
         *              freeStyle: {}
         *          },
         *          mode: String
         *      },
         *      widget: {
         *          counter: number,
         *          allowToAdd: boolean,
         *          addNewTo: string
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
            preferences: opts.preferences || {
                showInTabs: true
            },
            order: 1,
            type: 'default',
            limit: false,
            isResized: true,
            isDefault: false,
            layout: {
                behavior: {
                    snap2grid: {
                        animate: true,
                        float: this.ORGANIZE_MODES.none,
                        organize: this.ORGANIZE_MODES.column,
                        emptySpaces: this.ORGANIZE_MODES.none
                    },
                    jqUIGrid: {
                        animate: true,
                        float: this.ORGANIZE_MODES.none,
                        organize: this.ORGANIZE_MODES.column,
                        emptySpaces: this.ORGANIZE_MODES.none
                    },
                    freeStyle: {
                    }
                },
                mode: this.LAYOUT_MODES.snap2grid
            },
            widget: {
                // allow to resize all items
                plural: true,
                types: {
                    widget: 'widget'
                },
                // default widget relWidth/relHeight
                defaults: {
                    width: 30,
                    height: 30
                },
                counter: 0,
                overlapping: true,
                allowToAdd: true,
                addNewTo: this.ORGANIZE_MODES.row,
                preferences: {
                    draggable: true,
                    resizable: true,
                    maximizable: true
                }
            },
            html: {
                style: 'default',
                header: true,
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
         * @property Page
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

        this.init();
    };

    return Page.extend('Page', {

        /**
         * Init page
         * @memberOf Page
         */
        init: function init() {

            /**
             * Define ready
             * @property Page
             * @type {number}
             */
            this.ready = 0;

            /**
             * Define items
             * @property Page
             * @type {*}
             */
            this.items = {};

            /**
             * Define widget
             * @property Page
             * @type {Object|Widget}
             */
            this.widget = {};

            /**
             * Define maximized widget
             * @property Page
             * @type {Object|Widget}
             */
            this.maximized = {};

            /**
             * Define layout
             * @property Page
             * @type {Layout}
             */
            this.layout = {};

            this.observer.publish(
                this.eventmanager.eventList.createLayout,
                this.config.layout
            );

            this.observer.batchPublish(
                this.eventmanager.eventList.successCreated,
                this.eventmanager.eventList.loadPreferences
            );
        }

    }, AntHill.prototype);
});
