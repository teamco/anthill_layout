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
    'config/layout',
    'permission/page.permission'
], function definePage(AntHill, MVC, API, Controller, Model, View, EventManager, Layout, Permission) {

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
         * @member Page
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
         * @member Page
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
         * Define default config
         * @type {{
         *      preferences: {},
         *      order: number,
         *      type: string,
         *      isDefault: boolean,
         *      isDefault: boolean,
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
            preferences: opts.preferences || {},
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
                    width: 3,
                    height: 3
                },
                counter: 0,
                overlapping: true,
                allowToAdd: true,
                addNewTo: this.ORGANIZE_MODES.row
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
         * @member Page
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
         * @member Page
         */
        init: function init() {

            /**
             * Define items
             * @member Page
             * @type {*}
             */
            this.items = {};

            /**
             * Define widget
             * @member Page
             * @type {*|Widget}
             */
            this.widget = {};

            /**
             * Define maximized widget
             * @member Page
             * @type {*|Widget}
             */
            this.maximized = {};

            /**
             * Define layout
             * @type {Layout}
             */
            this.layout = {};

            this.observer.publish(
                this.eventmanager.eventList.createLayout,
                [Layout, this.config.layout]
            );

            this.observer.publish(
                this.eventmanager.eventList.successCreated
            );

            this.observer.publish(
                this.eventmanager.eventList.loadPreferences
            );
        }

    }, AntHill.prototype);
});
