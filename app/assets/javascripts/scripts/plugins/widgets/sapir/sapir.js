/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/sapir/mvc/sapir.controller',
    'plugins/widgets/sapir/mvc/sapir.model',
    'plugins/widgets/sapir/mvc/sapir.view',
    'plugins/widgets/sapir/mvc/sapir.event.manager',
    'plugins/widgets/sapir/mvc/sapir.permission'
], function defineSapir(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Sapir
     * @param containment
     * @param [opts]
     * @constructor
     * @class Sapir
     * @extends AntHill
     */
    var Sapir = function Sapir(containment, opts) {

        /**
         * Define containment
         * @property Sapir
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Sapir
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
         * @property Sapir
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

    return Sapir.extend('Sapir', {}, AntHill.prototype);
});
