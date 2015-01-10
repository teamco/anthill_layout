/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/my.world/mvc/my.world.controller',
    'plugins/widgets/my.world/mvc/my.world.model',
    'plugins/widgets/my.world/mvc/my.world.view',
    'plugins/widgets/my.world/mvc/my.world.event.manager',
    'plugins/widgets/my.world/mvc/my.world.permission'
], function defineMyWorld(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define MyWorld
     * @param containment
     * @param [opts]
     * @constructor
     * @class MyWorld
     * @extends AntHill
     */
    var MyWorld = function MyWorld(containment, opts) {

        /**
         * Define containment
         * @member MyWorld
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member MyWorld
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
         * @member MyWorld
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

    return MyWorld.extend('MyWorld', {

    }, AntHill.prototype);
});
