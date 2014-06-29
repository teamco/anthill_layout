/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/petradar/mvc/petradar.controller',
    'plugins/widgets/petradar/mvc/petradar.model',
    'plugins/widgets/petradar/mvc/petradar.view',
    'plugins/widgets/petradar/mvc/petradar.event.manager',
    'plugins/widgets/petradar/mvc/petradar.permission'
], function definePetradar(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Petradar
     * @param containment
     * @param [opts]
     * @constructor
     * @class Petradar
     * @extends AntHill
     */
    var Petradar = function Petradar(containment, opts) {

        /**
         * Define containment
         * @member Petradar
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member Petradar
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
         * @member Petradar
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Petradar
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Petradar
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member Petradar
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member Petradar
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

    return Petradar.extend('Petradar', {

    }, AntHill.prototype);
});