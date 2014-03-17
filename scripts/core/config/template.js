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
    'config/anthill',
    'modules/mvc',
    'api/template.api',
    'config/layout',
    'controller/template.controller',
    'model/template.model',
    'view/template.view',
    'event/template.event.manager',
    'permission/template.permission'
], function defineTemplate(AntHill, MVC, API, Layout, Controller, Model, View, EventManager, Permission) {

    /**
     * Define template
     * @class Template
     * @param opts
     * @param containment
     * @extends AntHill
     * @constructor
     */
    var Template = function Template(opts, containment) {

        /**
         * Default config
         * @type {*}
         */
        var DEFAULTS = {
            type: 'default',
            containment: containment,
            limit: true
        };

        /**
         * Define containment
         * @member Template
         * @type {*}
         */
        this.containment = containment;

        /**
         * Init observer
         * @member Page
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Page
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Page
         * @type {*}
         */
        this.config = undefined;

        /**
         * Define MVC
         * @member Template
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
         * @member Template
         * @type {*|Page}
         */
        this.page = {};

        /**
         * Define items
         * @member Template
         * @type {*}
         */
        this.items = {};

        this.observer.publish(
            this.eventmanager.eventList.successCreated
        );

    };

    return Template.extend('Template', {

    }, AntHill.prototype);
});