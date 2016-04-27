/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/ora.tv/mvc/ora.tv.controller',
    'plugins/widgets/ora.tv/mvc/ora.tv.model',
    'plugins/widgets/ora.tv/mvc/ora.tv.view',
    'plugins/widgets/ora.tv/mvc/ora.tv.event.manager',
    'plugins/widgets/ora.tv/mvc/ora.tv.permission'
], function defineOraTv(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define OraTv
     * @param containment
     * @param [opts]
     * @constructor
     * @class OraTv
     * @extends AntHill
     */
    var OraTv = function OraTv(containment, opts) {

        /**
         * Define containment
         * @property OraTv
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property OraTv
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
         * @property OraTv
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

    return OraTv.extend('OraTv', {}, AntHill.prototype);
});
