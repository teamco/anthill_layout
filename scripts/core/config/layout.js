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
    var Layout = function Layout(opts) {

        opts = this.base.define(opts, {}, true);

        // Default constants
        var DEFAULTS = {
            grid: {
                columns: 18,
                step: 1,
                additionalRows: 1,
                margin: 15
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

    };

    return Layout.extend(Base);
});
