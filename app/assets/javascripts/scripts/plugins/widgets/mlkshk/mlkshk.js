/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/mlkshk/mvc/mlkshk.controller',
    'plugins/widgets/mlkshk/mvc/mlkshk.model',
    'plugins/widgets/mlkshk/mvc/mlkshk.view',
    'plugins/widgets/mlkshk/mvc/mlkshk.event.manager',
    'plugins/widgets/mlkshk/mvc/mlkshk.permission'
], function defineMlkshk(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Mlkshk
     * @param containment
     * @param [opts]
     * @constructor
     * @class Mlkshk
     * @extends AntHill
     */
    var Mlkshk = function Mlkshk(containment, opts) {

        /**
         * Define containment
         * @member Mlkshk
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member Mlkshk
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
         * @member Mlkshk
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

    return Mlkshk.extend('Mlkshk', {

    }, AntHill.prototype);
});
