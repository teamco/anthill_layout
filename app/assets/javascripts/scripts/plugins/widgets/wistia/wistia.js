/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/wistia/mvc/wistia.controller',
    'plugins/widgets/wistia/mvc/wistia.model',
    'plugins/widgets/wistia/mvc/wistia.view',
    'plugins/widgets/wistia/mvc/wistia.event.manager',
    'plugins/widgets/wistia/mvc/wistia.permission'
], function defineWistia(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Wistia
     * @param containment
     * @param [opts]
     * @constructor
     * @class Wistia
     * @extends AntHill
     */
    var Wistia = function Wistia(containment, opts) {

        /**
         * Define containment
         * @property Wistia
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Wistia
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
         * @property Wistia
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

    return Wistia.extend('Wistia', {}, AntHill.prototype);
});
