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
    'api/widget.api',
    'controller/widget.controller',
    'model/widget.model',
    'view/widget.view',
    'event/widget.event.manager',
    'permission/widget.permission',
    'controller/widget/widget.map',
    'controller/widget/widget.wireframe'
], function defineWidget(AntHill, MVC, API, Controller, Model, View, EventManager, Permission, Map, Wireframe) {

    /**
     * Define Widget
     * @class Widget
     * @param opts {object}
     * @extends AntHill
     * @constructor
     */
    var Widget = function Widget(opts) {

        /**
         * Define dom
         * @member Widget
         * @type {*}
         */
        this.dom = this.base.define(opts.dom, {}, true);

        /**
         * Default config
         * @type {{
         *      preferences: {[overlapping]: boolean},
         *      rules: {},
         *      limit: boolean,
         *      order: number,
         *      html: {header: boolean, footer: boolean, frameLess: boolean, style: string, zIndex: number},
         *      type: string,
         *      maximize: boolean,
         *      attributes: {magnet: string, freeze: boolean, alwaysTop: boolean},
         *      events: {
         *          draggable: {snap: boolean, axis: boolean, scroll: boolean, connectToSortable: boolean, delay: number, scrollSensitivity: number, scrollSpeed: number, cursor: string, appendTo: string, cancel: string},
         *          resizable: {handles: string},
         *          droppable: {activeClass: string, hoverClass: string, greedy: boolean, tolerance: string}
         *      }
         * }}
         */
        var DEFAULTS = {
            preferences: opts.preferences || {},
            rules: opts.rules || {},
            limit: false,
            order: 1,
            html: {
                header: false,
                footer: false,
                frameLess: false,
                style: '',
                zIndex: 0
            },
            type: 'default',
            maximize: false,
            attributes: {
                magnet: 'none',         // {none|+|-}
                freeze: false
            },
            events: {
                draggable: {
                    snap: false,
                    axis: false,
                    scroll: true,
                    connectToSortable: false,
                    delay: 300,
                    distance: 20,
                    scrollSensitivity: 100,
                    scrollSpeed: 100,
                    cursor: 'move',
                    appendTo: 'parent',
                    cancel: '.ui-resizable-handle'
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
         * @member Widget
         * @type {*}
         */
        this.observer = undefined;

        /**
         * Init config
         * @member Widget
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init event manager
         * @member Widget
         * @type {*}
         */
        this.eventmanager = undefined;

        /**
         * Define controller
         * @member Widget
         * @type {*}
         */
        this.controller = undefined;

        /**
         * Define model
         * @member Widget
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define view
         * @member Widget
         * @type {*}
         */
        this.view = undefined;

        /**
         * Define permissions
         * @member Widget
         * @type {*}
         */
        this.permission = undefined;

        /**
         * Define constants
         * @member Widget
         * @type {{magnet: Array}}
         */
        this.CONSTANTS = {
            magnet: ['none', '+', '-']
        };

        /**
         * Transfer content events
         * @member Widget
         * @type {{}}
         */
        this.contentEvents = {};

        /**
         * Transfer content rules
         * @member Widget
         * @type {{}}
         */
        this.contentRules = {};

        /**
         * Define MVC
         * @member Widget
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
         * @member Widget
         * @type {Map}
         */
        this.map = new Map(this);

        /**
         * Define wireframe
         * @member Widget
         * @type {Wireframe}
         */
        this.wireframe = new Wireframe(this);

        /**
         * Define interactions: Drag/Resize/Drop
         * @member Widget
         * @type {{
         *      draggable: Draggable,
         *      resizable: Resizable,
         *      droppable: undefined
         * }}
         */
        this.interactions = {};

        /**
         * Define draggable interaction
         * @member Widget.interactions
         * @type {Draggable}
         */
        this.interactions.draggable = undefined;

        /**
         * Define resizable interaction
         * @member Widget.interactions
         * @type {Resizable}
         */
        this.interactions.resizable = undefined;

        /**
         * Init content
         * @member Widget
         * @type {undefined}
         */
        this.content = undefined;

        this.observer.publish(
            this.eventmanager.eventList.successCreated
        );
    };

    return Widget.extend('Widget', {

    }, AntHill.prototype);
});
