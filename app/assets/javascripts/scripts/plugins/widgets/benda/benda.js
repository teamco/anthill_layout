/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/benda/mvc/benda.controller',
    'plugins/widgets/benda/mvc/benda.model',
    'plugins/widgets/benda/mvc/benda.view',
    'plugins/widgets/benda/mvc/benda.event.manager',
    'plugins/widgets/benda/mvc/benda.permission'
], function defineBenda(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Benda
     * @param containment
     * @param [opts]
     * @constructor
     * @class Benda
     * @extends AntHill
     */
    var Benda = function Benda(containment, opts) {

        /**
         * Define containment
         * @property Benda
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Benda
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
         * @property Benda
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

    return Benda.extend('Benda', {}, AntHill.prototype);
});
