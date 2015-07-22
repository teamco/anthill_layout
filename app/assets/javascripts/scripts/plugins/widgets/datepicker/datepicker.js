/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/datepicker/mvc/datepicker.controller',
    'plugins/widgets/datepicker/mvc/datepicker.model',
    'plugins/widgets/datepicker/mvc/datepicker.view',
    'plugins/widgets/datepicker/mvc/datepicker.event.manager',
    'plugins/widgets/datepicker/mvc/datepicker.permission'
], function defineDatepicker(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Datepicker
     * @param containment
     * @param [opts]
     * @constructor
     * @class Datepicker
     * @extends AntHill
     */
    var Datepicker = function Datepicker(containment, opts) {

        /**
         * Define containment
         * @memberOf Datepicker
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Datepicker
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
         * @memberOf Datepicker
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

    return Datepicker.extend('Datepicker', {

    }, AntHill.prototype);
});
