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
    'event/template.event.manager',
    'permission/template.permission'
], function defineTemplate(Base, MVC, API, Layout, Controller, Model, View, EventManager, Permission) {

    /**
     * Define template
     * @class Template
     * @extends {Base}
     * @param opts
     * @param page
     * @constructor
     */
    var Template = function Template(opts, page) {

        opts = this.base.define(opts, {}, true);

        /**
         * Default config
         * @type {{parent: *}}
         */
        var DEFAULTS = {
            type: 'default',
            parent: page,
            limit: true
        };

        /**
         * Define MVC
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [opts, DEFAULTS],
            components: [
                API,
                Controller,
                Model,
                View,
                EventManager,
                Permission
            ],
            render: true
        });

        /**
         * Define page
         * @type {*|Page}
         */
        this.page = {};

        /**
         * Define items
         * @type {*}
         */
        this.items = {};

        this.observer.publish(this.eventmanager.eventList.successCreated);

    };

    return Template.extend(Base);
});