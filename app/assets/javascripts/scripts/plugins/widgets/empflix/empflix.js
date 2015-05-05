/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/empflix/mvc/empflix.controller',
    'plugins/widgets/empflix/mvc/empflix.model',
    'plugins/widgets/empflix/mvc/empflix.view',
    'plugins/widgets/empflix/mvc/empflix.event.manager',
    'plugins/widgets/empflix/mvc/empflix.permission'
], function defineEmpflix(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Empflix
     * @param containment
     * @param [opts]
     * @constructor
     * @class Empflix
     * @extends AntHill
     */
    var Empflix = function Empflix(containment, opts) {

        /**
         * Define containment
         * @memberOf Empflix
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Empflix
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
         *          padding: {
         *              top: number,
         *              right: number,
         *              bottom: number,
         *              left: number
         *          }
         *      },
         *      regex: RegExp,
         *      mask: string
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
         * @memberOf Empflix
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
            this.eventManager.eventList.initWidget,
            opts
        );
    };

    return Empflix.extend('Empflix', {

    }, AntHill.prototype);
});
