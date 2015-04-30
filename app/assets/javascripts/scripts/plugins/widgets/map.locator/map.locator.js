/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/map.locator/mvc/map.locator.controller',
    'plugins/widgets/map.locator/mvc/map.locator.model',
    'plugins/widgets/map.locator/mvc/map.locator.view',
    'plugins/widgets/map.locator/mvc/map.locator.event.manager',
    'plugins/widgets/map.locator/mvc/map.locator.permission'
], function defineGeolocation(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define MapLocator
     * @param containment
     * @param [opts]
     * @constructor
     * @class MapLocator
     * @extends AntHill
     */
    var MapLocator = function MapLocator(containment, opts) {

        /**
         * Define containment
         * @memberOf MapLocator
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf MapLocator
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
         * @memberOf MapLocator
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

    return MapLocator.extend('MapLocator', {

    }, AntHill.prototype);
});