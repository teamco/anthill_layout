/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/portfolium/mvc/portfolium.controller',
    'plugins/widgets/portfolium/mvc/portfolium.model',
    'plugins/widgets/portfolium/mvc/portfolium.view',
    'plugins/widgets/portfolium/mvc/portfolium.event.manager',
    'plugins/widgets/portfolium/mvc/portfolium.permission'
], function definePortfolium(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Portfolium
     * @param containment
     * @param [opts]
     * @constructor
     * @class Portfolium
     * @extends AntHill
     */
    var Portfolium = function Portfolium(containment, opts) {

        /**
         * Define containment
         * @property Portfolium
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Portfolium
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
         * @property Portfolium
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

    return Portfolium.extend('Portfolium', {}, AntHill.prototype);
});
