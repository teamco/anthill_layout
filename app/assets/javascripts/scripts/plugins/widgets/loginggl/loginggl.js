/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/loginggl/mvc/loginggl.controller',
    'plugins/widgets/loginggl/mvc/loginggl.model',
    'plugins/widgets/loginggl/mvc/loginggl.view',
    'plugins/widgets/loginggl/mvc/loginggl.event.manager',
    'plugins/widgets/loginggl/mvc/loginggl.permission'
], function defineLoginggl(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Loginggl
     * @param containment
     * @param [opts]
     * @constructor
     * @class Loginggl
     * @extends AntHill
     */
    var Loginggl = function Loginggl(containment, opts) {

        /**
         * Define containment
         * @member Loginggl
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member Loginggl
         * @type {*}
         */
        this.referrer = undefined;

        /**
         * Define defaults
         * @type {{
         *      plugin: boolean,
         *      html: {
         *          style: string,
         *          header: boolean,
         *          footer: boolean,
         *          floating: boolean,
         *          padding: {
         *              top: number,
         *              right: number,
         *              bottom: number,
         *              left: number
         *          }
         *      }
         * }}
         */
        var DEFAULTS = {
            plugin: true,
            html: {
                style: 'default',
                header: false,
                footer: false,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }
        };

        /**
         * Init observer
         * @member Loginggl
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Loginggl
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Loginggl
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member Loginggl
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member Loginggl
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [
                {
                    uuid: [
                        this.containment.model.getUUID(),
                        this.constructor.name.toDash()
                    ].join('')
                },
                DEFAULTS
            ],
            components: [
                Controller,
                Model,
                View,
                EventManager,
                Permission
            ],
            render: true
        });

        this.observer.publish(
            this.eventmanager.eventList.initWidget,
            opts
        );
    };

    return Loginggl.extend('Loginggl', {

    }, AntHill.prototype);
});