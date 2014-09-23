/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/events/mvc/events.controller',
    'plugins/widgets/events/mvc/events.model',
    'plugins/widgets/events/mvc/events.view',
    'plugins/widgets/events/mvc/events.event.manager',
    'plugins/widgets/events/mvc/events.permission'
], function defineEvents(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Events
     * @param containment
     * @param [opts]
     * @constructor
     * @class Events
     * @extends AntHill
     */
    var Events = function Events(containment, opts) {

        /**
         * Define containment
         * @member Events
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member Events
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
         * @member Events
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

    return Events.extend('Events', {

    }, AntHill.prototype);
});