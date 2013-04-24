/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/2/13
 * Time: 11:29 PM
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
    'controller/template.controller',
    'model/template.model',
    'view/template.view',
    'event/template.event.manager'
], function defineTemplate(Base, MVC, Controller, Model, View, EventManager) {

    "use strict";
    var Template = function Template(opts) {

        opts = this.base.define(opts, {}, true);

        /**
         * Define default config
         * @type {{}}
         */
        var DEFAULTS = {
        };

        /**
         * Define MVC
         * @type {modules.mvc}
         */
        this.mvc = new MVC({
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

        this.observer.publish(this.eventmanager.eventList.successCreated);

    };

    return Template.extend(Base);
});