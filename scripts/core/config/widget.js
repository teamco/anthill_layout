/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/mvc',
    'api/widget.api',
    'controller/widget.controller',
    'model/widget.model',
    'view/widget.view',
    'event/widget.event.manager',
    'permission/widget.permission',
    'controller/widget/widget.map',
    'controller/widget/widget.wireframe'
], function defineWidget(MVC, API, Controller, Model, View, EventManager, Permission, Map, Wireframe) {

    /**
     * Define Widget
     * @class Widget
     * @param opts {object}
     * @constructor
     */
    var Widget = function Widget(opts) {

        /**
         * Define dom
         * @type {*}
         */
        this.dom = anthill.base.define(opts.dom, {}, true);

        /**
         * Default config
         * @type {{
         *      preferences: {
         *          resource: string
         *      },
         *      order: number,
         *      html: {
         *          header: boolean,
         *          footer: boolean,
         *          frameLess: boolean,
         *          opacity: number
         *      },
         *      attributes: {
         *          freeze: boolean,
         *          magnet: string,
         *          overlapping: boolean,
         *          alwaysTop: boolean
         *      },
         *      maximize: boolean,
         *      events: {
         *          draggable: {
         *              snap: boolean,
         *              iframeFix: boolean,
         *              axis: boolean,
         *              scroll: boolean,
         *              connectToSortable: boolean,
         *              cursor: string,
         *              appendTo: string
         *          },
         *          resizable: {
         *              iframeFix: boolean,
         *              handles: string
         *          },
         *          droppable: {
         *              activeClass: string,
         *              hoverClass: string,
         *              greedy: boolean,
         *              tolerance: string
         *          }
         *      }
         * }}
         */
        var DEFAULTS = {
            preferences: opts.preferences || {},
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
                magnet: 'none',         // {none|+|-}
                freeze: false,
                overlapping: false,
                alwaysTop: false
            },
            events: {
                draggable: {
                    snap: false,
                    axis: false,
                    scroll: true,
                    connectToSortable: false,
                    delay: 300,
                    scrollSensitivity: 100,
                    scrollSpeed: 100,
                    opacity: 0.6,
                    zIndex: 100,
                    cursor: 'move',
                    appendTo: 'parent'
                },
                resizable: {
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
         * Init observer
         * @type {undefined}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @type {undefined}
         */
        this.eventmanager = undefined;

        /**
         * Define constants
         * @type {{magnet: Array}}
         */
        this.CONSTANTS = {
            magnet: ['none', '+', '-']
        };

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

        /**
         * Init content
         * @type {undefined}
         */
        this.content = undefined;

        this.observer.publish(
            this.eventmanager.eventList.successCreated
        );
    };

    return Widget;
});
