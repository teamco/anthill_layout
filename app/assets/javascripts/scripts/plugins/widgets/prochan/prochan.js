/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/prochan/mvc/prochan.controller',
    'plugins/widgets/prochan/mvc/prochan.model',
    'plugins/widgets/prochan/mvc/prochan.view',
    'plugins/widgets/prochan/mvc/prochan.event.manager',
    'plugins/widgets/prochan/mvc/prochan.permission'
], function defineProchan(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Prochan
     * @param containment
     * @param [opts]
     * @constructor
     * @class Prochan
     * @extends AntHill
     */
    var Prochan = function Prochan(containment, opts) {

        /**
         * Define containment
         * @property Prochan
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Prochan
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
         * @property Prochan
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

    return Prochan.extend('Prochan', {}, AntHill.prototype);
});
