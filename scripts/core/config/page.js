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
    var Page = function Page(opts) {

        this.items = {};
        this.widget = {};
        this.collector = {};
        this.maximized = {};

        var DEFAULTS = {
            order: 1,
            default: false,
            layout: {
                overlapping: true,
                emptySpaces: true,
                grid: true,
                eventSpeed: 300,
                animate: true
            },
            template: {
                // TODO
            },
            widget: {
                counter: 0,
                opacity: 0.6,
                allowToAdd: true
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

        this.observer.publish(
            this.eventmanager.eventList.createLayout,
            [Layout, this.config.layout]
        );

        this.observer.publish(
            this.eventmanager.eventList.createTemplate,
            [Template, this.config.template]
        );

    };

    return Page.extend(Base);
});
