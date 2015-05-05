/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/quicktime/mvc/quicktime.controller',
    'plugins/widgets/quicktime/mvc/quicktime.model',
    'plugins/widgets/quicktime/mvc/quicktime.view',
    'plugins/widgets/quicktime/mvc/quicktime.event.manager',
    'plugins/widgets/quicktime/mvc/quicktime.permission'
], function defineQuicktime(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Quicktime
     * @param containment
     * @param [opts]
     * @constructor
     * @class Quicktime
     * @extends AntHill
     */
    var Quicktime = function Quicktime(containment, opts) {

        /**
         * Define containment
         * @memberOf Quicktime
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Quicktime
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
         * @memberOf Quicktime
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

    return Quicktime.extend('Quicktime', {

    }, AntHill.prototype);
});