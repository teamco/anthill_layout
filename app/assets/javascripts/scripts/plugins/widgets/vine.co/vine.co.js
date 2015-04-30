/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/vine.co/mvc/vine.co.controller',
    'plugins/widgets/vine.co/mvc/vine.co.model',
    'plugins/widgets/vine.co/mvc/vine.co.view',
    'plugins/widgets/vine.co/mvc/vine.co.event.manager',
    'plugins/widgets/vine.co/mvc/vine.co.permission'
], function defineVineCo(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define VineCo
     * @param containment
     * @param [opts]
     * @constructor
     * @class VineCo
     * @extends AntHill
     */
    var VineCo = function VineCo(containment, opts) {

        /**
         * Define containment
         * @memberOf VineCo
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf VineCo
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
         * Define MVC
         * @memberOf VineCo
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [
                {uuid: this.containment.model.getContentUUID()},
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

    return VineCo.extend('VineCo', {

    }, AntHill.prototype);
});
