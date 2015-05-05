/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/ice.floe/mvc/ice.floe.controller',
    'plugins/widgets/ice.floe/mvc/ice.floe.model',
    'plugins/widgets/ice.floe/mvc/ice.floe.view',
    'plugins/widgets/ice.floe/mvc/ice.floe.event.manager',
    'plugins/widgets/ice.floe/mvc/ice.floe.permission'
], function defineIceFloe(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define IceFloe
     * @param containment
     * @param [opts]
     * @constructor
     * @class IceFloe
     * @extends AntHill
     */
    var IceFloe = function IceFloe(containment, opts) {

        /**
         * Define containment
         * @memberOf IceFloe
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf IceFloe
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
         * @memberOf IceFloe
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

    return IceFloe.extend('IceFloe', {

    }, AntHill.prototype);
});