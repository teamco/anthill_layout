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
    'event/widget.event.manager'
], function defineWidget(Base, MVC, Controller, Model, View, EventManager) {
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
            maximize: false,
            events: {
                draggable: {
                    animateOnDrag: false,
                    animateOnStop: true,
                    organizeOnStop: true, //page.layout.config.overlapping.autoOrganize,
                    snap: false,
                    iframeFix: false,
                    axis: false,
                    scroll: true,
                    connectToSortable: false,
                    cursor: 'move',
                    appendTo: 'parent'
//                    handle: '.header',
//                    cancel: '.header .icons li, .header input, .icons li, .menu'
                },
                resizable: {
                    animateOnResize: false,
                    animateOnStop: true,
                    organizeOnStop: true, //page.layout.config.overlapping.autoOrganize,
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

    };

    return Widget.extend(Base);
});
