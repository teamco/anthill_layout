/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/circuit.lab/mvc/circuit.lab.controller',
    'plugins/widgets/circuit.lab/mvc/circuit.lab.model',
    'plugins/widgets/circuit.lab/mvc/circuit.lab.view',
    'plugins/widgets/circuit.lab/mvc/circuit.lab.event.manager',
    'plugins/widgets/circuit.lab/mvc/circuit.lab.permission'
], function defineCircuitLab(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define CircuitLab
     * @param containment
     * @param [opts]
     * @constructor
     * @class CircuitLab
     * @extends AntHill
     */
    var CircuitLab = function CircuitLab(containment, opts) {

        /**
         * Define containment
         * @property CircuitLab
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property CircuitLab
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
         * @property CircuitLab
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

    return CircuitLab.extend('CircuitLab', {}, AntHill.prototype);
});
