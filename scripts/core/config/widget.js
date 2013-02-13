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
    'controller/widget/widget.permission',
    'controller/widget/widget.map'
], function defineWidget(Base, MVC, Controller, Model, View, EventManager, Permission, Map) {
    var Widget = function Widget(opts) {

        opts = this.base.define(opts, {}, true);

        var DEFAULTS = {
            order: 1,
            html: {
                header: false,
                footer: false,
                frameLess: false,
                opacity: 0.6 //page.layout.config.html.fading,
            },
            permission: {
                draggable: true,
                resizable: true
            },
            maximize: false,
            events: {
                draggable: {
                    animate: {
                        drag: false,
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
                        resize: false,
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
        }
        // Init MVC
        new MVC({
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

        this.permission = new Permission(this);
        this.map = new Map(this);

        this.interactions = {};

        this.observer.publish(this.eventmanager.eventList.successCreated);

    };

    return Widget.extend(Base);
});
