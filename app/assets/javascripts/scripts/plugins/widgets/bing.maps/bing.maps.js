/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/bing.maps/mvc/bing.maps.controller',
    'plugins/widgets/bing.maps/mvc/bing.maps.model',
    'plugins/widgets/bing.maps/mvc/bing.maps.view',
    'plugins/widgets/bing.maps/mvc/bing.maps.event.manager',
    'plugins/widgets/bing.maps/mvc/bing.maps.permission'
], function defineBingMaps(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define BingMaps
     * @param containment
     * @param [opts]
     * @constructor
     * @class BingMaps
     * @extends AntHill
     */
    var BingMaps = function BingMaps(containment, opts) {

        /**
         * Define containment
         * @property BingMaps
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property BingMaps
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
         * @property BingMaps
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

    return BingMaps.extend('BingMaps', {}, AntHill.prototype);
});
