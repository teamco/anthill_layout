/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/pastery/mvc/pastery.controller',
    'plugins/widgets/pastery/mvc/pastery.model',
    'plugins/widgets/pastery/mvc/pastery.view',
    'plugins/widgets/pastery/mvc/pastery.event.manager',
    'plugins/widgets/pastery/mvc/pastery.permission'
], function definePastery(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Pastery
     * @param containment
     * @param [opts]
     * @constructor
     * @class Pastery
     * @extends AntHill
     */
    var Pastery = function Pastery(containment, opts) {

        /**
         * Define containment
         * @property Pastery
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Pastery
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
         * @property Pastery
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

    return Pastery.extend('Pastery', {}, AntHill.prototype);
});
