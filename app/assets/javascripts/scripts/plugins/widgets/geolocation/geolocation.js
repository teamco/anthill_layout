/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/geolocation/mvc/geolocation.controller',
    'plugins/widgets/geolocation/mvc/geolocation.model',
    'plugins/widgets/geolocation/mvc/geolocation.view',
    'plugins/widgets/geolocation/mvc/geolocation.event.manager',
    'plugins/widgets/geolocation/mvc/geolocation.permission'
], function defineGeolocation(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Geolocation
     * @param containment
     * @param [opts]
     * @constructor
     * @class Geolocation
     * @extends AntHill
     */
    var Geolocation = function Geolocation(containment, opts) {

        /**
         * Define containment
         * @memberOf Geolocation
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Geolocation
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
         * @memberOf Geolocation
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

    return Geolocation.extend('Geolocation', {

    }, AntHill.prototype);
});