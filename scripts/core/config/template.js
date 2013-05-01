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
    'api/template.api',
    'config/layout',
    'controller/template.controller',
    'model/template.model',
    'view/template.view',
    'event/template.event.manager'
], function defineTemplate(Base, MVC, API, Layout, Controller, Model, View, EventManager) {

    var Template = function Template(opts, page) {

        opts = this.base.define(opts, {}, true);

        /**
         * Default config
         * @type {{parent: *}}
         */
        var DEFAULTS = {
            parent: page
        };

        /**
         * Define MVC
         * @type {template.mvc}
         */
        this.mvc = new MVC({
            scope: this,
            config: [opts, DEFAULTS],
            components: [
                API,
                Controller,
                Model,
                View,
                EventManager
            ],
            render: true
        });

        /**
         * Define page
         * @type {template.page}
         */
        this.page = {};

        /**
         * Define items
         * @type {template.items}
         */
        this.items = {};

        this.observer.publish(this.eventmanager.eventList.successCreated);

    };

    return Template.extend(Base);
});