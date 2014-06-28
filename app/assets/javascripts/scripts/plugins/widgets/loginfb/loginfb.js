/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/loginfb/mvc/loginfb.controller',
    'plugins/widgets/loginfb/mvc/loginfb.model',
    'plugins/widgets/loginfb/mvc/loginfb.view',
    'plugins/widgets/loginfb/mvc/loginfb.event.manager',
    'plugins/widgets/loginfb/mvc/loginfb.permission'
], function defineLoginfb(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Loginfb
     * @param containment
     * @param [opts]
     * @constructor
     * @class Loginfb
     * @extends AntHill
     */
    var Loginfb = function Loginfb(containment, opts) {

        /**
         * Define containment
         * @member Loginfb
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member Loginfb
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
         * @member Loginfb
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Loginfb
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Loginfb
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member Loginfb
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member Loginfb
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

    return Loginfb.extend('Loginfb', {

    }, AntHill.prototype);
});