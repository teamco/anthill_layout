/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/ifttt/mvc/ifttt.controller',
    'plugins/widgets/ifttt/mvc/ifttt.model',
    'plugins/widgets/ifttt/mvc/ifttt.view',
    'plugins/widgets/ifttt/mvc/ifttt.event.manager',
    'plugins/widgets/ifttt/mvc/ifttt.permission'
], function defineIfttt(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Ifttt
     * @param containment
     * @param [opts]
     * @constructor
     * @class Ifttt
     * @extends AntHill
     */
    var Ifttt = function Ifttt(containment, opts) {

        /**
         * Define containment
         * @property Ifttt
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Ifttt
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
         * @property Ifttt
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

    return Ifttt.extend('Ifttt', {}, AntHill.prototype);
});
