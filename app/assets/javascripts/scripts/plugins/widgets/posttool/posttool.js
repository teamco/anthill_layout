/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/posttool/mvc/posttool.controller',
    'plugins/widgets/posttool/mvc/posttool.model',
    'plugins/widgets/posttool/mvc/posttool.view',
    'plugins/widgets/posttool/mvc/posttool.event.manager',
    'plugins/widgets/posttool/mvc/posttool.permission'
], function definePosttool(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Posttool
     * @param containment
     * @param [opts]
     * @constructor
     * @class Posttool
     * @extends AntHill
     */
    var Posttool = function Posttool(containment, opts) {

        /**
         * Define containment
         * @member Posttool
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member Posttool
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
         * @member Posttool
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Posttool
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Posttool
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member Posttool
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member Posttool
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

    return Posttool.extend('Posttool', {

    }, AntHill.prototype);
});