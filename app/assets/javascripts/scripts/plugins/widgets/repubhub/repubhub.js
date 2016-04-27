/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/repubhub/mvc/repubhub.controller',
    'plugins/widgets/repubhub/mvc/repubhub.model',
    'plugins/widgets/repubhub/mvc/repubhub.view',
    'plugins/widgets/repubhub/mvc/repubhub.event.manager',
    'plugins/widgets/repubhub/mvc/repubhub.permission'
], function defineRepubhub(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Repubhub
     * @param containment
     * @param [opts]
     * @constructor
     * @class Repubhub
     * @extends AntHill
     */
    var Repubhub = function Repubhub(containment, opts) {

        /**
         * Define containment
         * @property Repubhub
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Repubhub
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
         * @property Repubhub
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

    return Repubhub.extend('Repubhub', {}, AntHill.prototype);
});
