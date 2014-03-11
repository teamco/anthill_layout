/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/mvc',
    'api/page.api',
    'controller/page.controller',
    'model/page.model',
    'view/page.view',
    'event/page.event.manager',
    'config/layout',
    'config/template',
    'permission/page.permission'
], function definePage(AntHill, MVC, API, Controller, Model, View, EventManager, Layout, Template, Permission) {

    /**
     * Define Page
     * @class Page
     * @param opts
     * @constructor
     */
    var Page = function Page(opts) {

        /**
         * Define items
         * @type {*}
         */
        this.items = {};

        /**
         * Define widget
         * @type {*|Widget}
         */
        this.widget = {};

        /**
         * Define maximized widget
         * @type {*|Widget}
         */
        this.maximized = {};

        /**
         * Define layout modes
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
         *      order: number,
         *      type: string,
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
         *      template: {},
         *      widget: {
         *          counter: number,
         *          opacity: number,
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
            order: 1,
            type: 'default',
            limit: false,
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
                mode: this.LAYOUT_MODES.jqUIGrid
            },
            template: {
            },
            widget: {
                // allow to resize item on browser resize
                resize: true,
                // allow to resize all items
                plural: true,
                types: {
                    widget: 'widget',
                    template: 'template'
                },
                // default widget relWidth/relHeight
                defaults: {
                    width: 3,
                    height: 3
                },
                counter: 0,
                opacity: 0.6,
                allowToAdd: true,
                addNewTo: this.ORGANIZE_MODES.row
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
         * Define MVC
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

        this.observer.publish(
            this.eventmanager.eventList.createLayout,
            [Layout, this.config.layout]
        );

        this.observer.publish(
            this.eventmanager.eventList.createTemplate,
            [Template, this.config.template]
        );

        this.observer.publish(this.eventmanager.eventList.successCreated);

    };

    return Page.extend({

    }, AntHill.prototype);
});
