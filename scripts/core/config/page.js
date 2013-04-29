/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/mvc',
    'controller/page.controller',
    'model/page.model',
    'view/page.view',
    'event/page.event.manager',
    'config/layout',
    'config/template'
], function definePage(Base, MVC, Controller, Model, View, EventManager, Layout, Template) {
    /**
     * Define Page
     * @param opts
     * @constructor
     */

    var Page = function Page(opts) {

        /**
         * Define items
         * @type {page.items}
         */
        this.items = {};

        /**
         * Define widget
         * @type {page.widget}
         */
        this.widget = {};

        /**
         * Define maximized widget
         * @type {page.maximized}
         */
        this.maximized = {};

        /**
         * Define layout modes
         * @type {{snap2grid: string, freeStyle: string}}
         */
        this.LAYOUT_MODES = {
            snap2grid: 'snap2grid',
            freeStyle: 'freeStyle'
        };

        /**
         * Define default config
         * @type {{
         *  order: number,
         *  isDefault: boolean,
         *  layout: {
         *      behavior: {
         *          snap2grid: {overlapping: boolean, animate: boolean, magnet: boolean, float: string, organize: string, emptySpaces: string},
         *          freeStyle: {}
         *      },
         *      mode: String
         *  },
         *  template: {},
         *  widget: {counter: number, opacity: number, allowToAdd: boolean, addNewTo: string},
         *  html: {header: boolean, footer: boolean, stretch: boolean, padding: {top: number, right: number, bottom: number, left: number}}
         * }}
         */
        var DEFAULTS = {
            order: 1,
            isDefault: false,
            layout: {
                behavior: {
                    snap2grid: {
                        overlapping: true,
                        animate: true,
                        magnet: false,
                        float: 'none',
                        organize: 'column',     // {row|column}
                        emptySpaces: 'row'      // {row|column}
                    },
                    freeStyle: {

                    }
                },
                mode: this.LAYOUT_MODES.snap2grid
            },
            template: {
            },
            widget: {
                counter: 0,
                opacity: 0.6,
                allowToAdd: true,
                addNewTo: 'row'                 // {row|column}
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

    return Page.extend(Base);
});
