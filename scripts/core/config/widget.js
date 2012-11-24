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
    'event/widget.event.manager'
], function defineWidget(Base, MVC, Controller, Model, EventManager) {
    var Widget = function Widget(opts) {

        opts = this.base.define(opts, {}, true);

        var DEFAULTS = {
            order: 1,
            html: {
                header: false,
                footer: false
            }
        };

        // Init MVC
        new MVC({
            scope: this,
            config: [opts, DEFAULTS],
            components: [
                Controller,
                Model,
                EventManager
            ]
        });

    };

    return Widget.extend(Base);
});
