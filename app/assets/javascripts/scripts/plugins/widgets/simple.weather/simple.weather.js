/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/simple.weather/mvc/simple.weather.controller',
    'plugins/widgets/simple.weather/mvc/simple.weather.model',
    'plugins/widgets/simple.weather/mvc/simple.weather.view',
    'plugins/widgets/simple.weather/mvc/simple.weather.event.manager',
    'plugins/widgets/simple.weather/mvc/simple.weather.permission'
], function defineSimpleWeather(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define SimpleWeather
     * @param containment
     * @param [opts]
     * @constructor
     * @class SimpleWeather
     * @extends AntHill
     */
    var SimpleWeather = function SimpleWeather(containment, opts) {

        /**
         * Define containment
         * @member SimpleWeather
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member SimpleWeather
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
         * @member SimpleWeather
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

    return SimpleWeather.extend('SimpleWeather', {

    }, AntHill.prototype);
});