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
    'controller/layout.controller',
    'event/layout.event.manager'
], function defineLayout(Base, MVC, Controller, EventManager) {
    var Layout = function Layout(opts, page) {

        this.page = page;

        // Default constants
        var DEFAULTS = {
            grid: {
                columns: 60,
                widgetsPerRow: 3,
                additionalRows: 1,
                margin: 1,
                padding: 14
            }
        };

        // Init MVC
        new MVC({
            scope: this,
            config: [opts, DEFAULTS],
            components: [
                Controller,
                EventManager
            ],
            render: false
        });

        this.observer.publish(this.eventmanager.eventList.successCreated);
    };

    return Layout.extend(Base);
});
