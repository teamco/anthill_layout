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
    'config/layout'
], function definePage(Base, MVC, Controller, Model, View, EventManager, Layout) {
    var Page = function Page(opts) {

        opts = this.base.define(opts, {}, true);

        this.widgets = {};
        this.widget = {};
        this.collector = {};
        this.maximized = {};

        var DEFAULTS = {
            order: 1,
            default: false,
            layout: {
                overlapping: true,
                emptySpaces: true,
                eventSpeed: 300,
                animate: true
            },
            widget: {
                counter: 0,
                opacity: 0.6,
                allowToAdd: true
            },
            html: {
                header: false,
                footer: false,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }
//            menu: {
//                capability: App.permissionManager.capabilities.page.menu,
//                items: {
//                    rename: {
//                        title: App.i18n("page.menu.rename"),
//                        separator: false,
//                        callback: 'rename',
//                        capability: App.permissionManager.capabilities.page.rename
//                    },
//                    destroy: {
//                        title: App.i18n("page.menu.destroy"),
//                        separator: true,
//                        callback: 'destroy',
//                        capability: App.permissionManager.capabilities.page.destroy
//                    }
//                }
//            }
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
    };

    return Page.extend(Base);
});
