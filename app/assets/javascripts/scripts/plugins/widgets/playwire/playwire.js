/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/playwire/mvc/playwire.controller',
    'plugins/widgets/playwire/mvc/playwire.model',
    'plugins/widgets/playwire/mvc/playwire.view',
    'plugins/widgets/playwire/mvc/playwire.event.manager',
    'plugins/widgets/playwire/mvc/playwire.permission'
], function definePlaywire(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Playwire
     * @param containment
     * @param [opts]
     * @constructor
     * @class Playwire
     * @extends AntHill
     */
    var Playwire = function Playwire(containment, opts) {

        /**
         * Define containment
         * @property Playwire
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Playwire
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
         * @property Playwire
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

    return Playwire.extend('Playwire', {}, AntHill.prototype);
});
