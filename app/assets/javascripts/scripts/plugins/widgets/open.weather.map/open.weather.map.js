/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/open.weather.map/mvc/open.weather.map.controller',
    'plugins/widgets/open.weather.map/mvc/open.weather.map.model',
    'plugins/widgets/open.weather.map/mvc/open.weather.map.view',
    'plugins/widgets/open.weather.map/mvc/open.weather.map.event.manager',
    'plugins/widgets/open.weather.map/mvc/open.weather.map.permission'
], function defineOpenWeatherMap(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define OpenWeatherMap
     * @param containment
     * @param [opts]
     * @constructor
     * @class OpenWeatherMap
     * @extends AntHill
     */
    var OpenWeatherMap = function OpenWeatherMap(containment, opts) {

        /**
         * Define containment
         * @member OpenWeatherMap
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member OpenWeatherMap
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
         * Init observer
         * @member OpenWeatherMap
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member OpenWeatherMap
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member OpenWeatherMap
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member OpenWeatherMap
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member OpenWeatherMap
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [
                {
                    uuid: [
                        this.containment.model.getUUID(),
                        this.constructor.name.toDash()
                    ].join('')
                },
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

    return OpenWeatherMap.extend('OpenWeatherMap', {

    }, AntHill.prototype);
});