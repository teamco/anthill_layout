/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/2/13
 * Time: 11:29 PM
 */

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
    'config/layout',
    'controller/template.controller',
    'model/template.model',
    'view/template.view',
    'event/template.event.manager'
], function defineTemplate(Base, MVC, Layout, Controller, Model, View, EventManager) {

    "use strict";
    var Template = function Template(opts) {

        opts = this.base.define(opts, {}, true);

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
         *  layout: {
         *      behavior: {
         *          snap2grid: {overlapping: boolean, animate: boolean, magnet: boolean, float: string, organize: string, emptySpaces: string},
         *          freeStyle: {}
         *      }, mode: *},
         *      widget: {counter: number, opacity: number, allowToAdd: boolean, addNewTo: string},
         *      html: {
         *          header: boolean,
         *          footer: boolean,
         *          stretch: boolean,
         *          padding: {top: number, right: number, bottom: number, left: number}
         *      }
         * }}
         */
        var DEFAULTS = {
            order: 1,
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
            widget: {
                counter: 0,
                opacity: 0.6,
                allowToAdd: true,
                addNewTo: 'row'                 // {row|column}
            },
            html: {
                header: true,
                footer: true,
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

        /**
         * Define items
         * @type {template.items}
         */
        this.items = {};

        /**
         * Define widget
         * @type {template.widget}
         */
        this.widget = {};

        this.observer.publish(
            this.eventmanager.eventList.createLayout,
            [Layout, this.config.layout]
        );

        this.observer.publish(this.eventmanager.eventList.successCreated);

    };

    return Template.extend(Base);
});