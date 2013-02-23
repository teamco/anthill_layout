/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 1:49 PM
 * To change this template use File | Settings | File Templates.
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
    'controller/widget.controller',
    'model/widget.model',
    'view/widget.view',
    'event/widget.event.manager',
    'permission/widget.permission',
    'controller/widget/widget.map',
    'controller/widget/widget.wireframe'
], function defineWidget(Base, MVC, Controller, Model, View, EventManager, Permission, Map, Wireframe) {
    /**
     * Define Widget
     * @param opts {object}
     * @constructor
     */
    var Widget = function Widget(opts) {

        var DEFAULTS = {
            order: 1,
            html: {
                header: false,
                footer: false,
                frameLess: false,
                opacity: 0.6
            },
            maximize: false,
            events: {
                draggable: {
                    animate: {
                        stop: true
                    },
                    organize: {
                        stop: true
                    },
                    snap: false,
                    iframeFix: true,
                    axis: false,
                    scroll: true,
                    connectToSortable: false,
                    cursor: 'move',
                    appendTo: 'parent'
//                    handle: '.header',
//                    cancel: '.header .icons li, .header input, .icons li, .menu'
                },
                resizable: {
                    animate: {
                        stop: true
                    },
                    organize: {
                        stop: true
                    },
                    iframeFix: true
                    //            handles: 'n, e, s, w'
                },
                droppable: {
                    activeClass: 'widget-ui-hover',
                    hoverClass: 'widget-ui-active',
                    greedy: true,
                    tolerance: 'pointer'
                }
            }
        };

        // Init MVC
        new MVC({
            scope: this,
            config: [opts, DEFAULTS],
            components: [
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
         * @type {widget.map}
         */
        this.map = new Map(this);

        /**
         * Define wireframe
         * @type {widget.wireframe}
         */
        this.wireframe = new Wireframe(this);

        /**
         * Define interactions: Drag/Resize
         * @type {{}}
         */
        this.interactions = {};

        this.observer.publish(this.eventmanager.eventList.successCreated);

    };

    return Widget.extend(Base);
});
