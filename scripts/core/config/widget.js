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
    'api/widget.api',
    'controller/widget.controller',
    'model/widget.model',
    'view/widget.view',
    'event/widget.event.manager',
    'permission/widget.permission',
    'controller/widget/widget.map',
    'controller/widget/widget.wireframe'
], function defineWidget(Base, MVC, API, Controller, Model, View, EventManager, Permission, Map, Wireframe) {

    /**
     * Define Widget
     * @class Widget
     * @extends {Base}
     * @param opts {object}
     * @constructor
     */
    var Widget = function Widget(opts) {

        /**
         * Define dom
         * @type {*}
         */
        this.dom = {};

        /**
         * Default config
         * @type {{
         *  order: number,
         *  html: {
         *      header: boolean,
         *      footer: boolean,
         *      frameLess: boolean,
         *      opacity: number
         *  },
         *  attributes: {
         *      freeze: boolean,
         *      magnet: boolean,
         *      overlapping: boolean,
         *      alwaysTop: boolean
         *  },
         *  maximize: boolean,
         *  events: {
         *      draggable: {
         *          snap: boolean,
         *          iframeFix: boolean,
         *          axis: boolean,
         *          scroll: boolean,
         *          connectToSortable: boolean,
         *          cursor: string,
         *          appendTo: string
         *      },
         *      resizable: {
         *          iframeFix: boolean,
         *          handles: string
         *      },
         *      droppable: {
         *          activeClass: string,
         *          hoverClass: string,
         *          greedy: boolean,
         *          tolerance: string
         *      }
         *  }
         * }}
         */
        var DEFAULTS = {
            limit: false,
            order: 1,
            html: {
                header: false,
                footer: false,
                frameLess: false,
                opacity: 0.6,
                style: ''
            },
            type: 'default',
            maximize: false,
            attributes: {
                magnet: false,
                freeze: false,
                overlapping: false,
                alwaysTop: false
            },
            events: {
                draggable: {
                    snap: false,
                    iframeFix: true,
                    axis: false,
                    scroll: true,
                    connectToSortable: false,
                    cursor: 'move',
                    appendTo: 'parent'
                },
                resizable: {
                    iframeFix: true,
                    handles: 'all'
                },
                droppable: {
                    activeClass: 'widget-ui-hover',
                    hoverClass: 'widget-ui-active',
                    greedy: true,
                    tolerance: 'pointer'
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
            ],
            render: true
        });

        /**
         * Define map
         * @type {Map}
         */
        this.map = new Map(this);

        /**
         * Define wireframe
         * @type {Wireframe}
         */
        this.wireframe = new Wireframe(this);

        /**
         * Define interactions: Drag/Resize
         * @type {{Draggable, Resizable}}
         */
        this.interactions = {};

        this.observer.publish(this.eventmanager.eventList.successCreated);

    };

    return Widget.extend(Base);
});
