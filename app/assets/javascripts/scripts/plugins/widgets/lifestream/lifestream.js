/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/lifestream/mvc/lifestream.controller',
    'plugins/widgets/lifestream/mvc/lifestream.model',
    'plugins/widgets/lifestream/mvc/lifestream.view',
    'plugins/widgets/lifestream/mvc/lifestream.event.manager',
    'plugins/widgets/lifestream/mvc/lifestream.permission'
], function defineLifestream(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Lifestream
     * @param containment
     * @param [opts]
     * @constructor
     * @class Lifestream
     * @extends AntHill
     */
    var Lifestream = function Lifestream(containment, opts) {

        /**
         * Define containment
         * @memberOf Lifestream
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Lifestream
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
         * @memberOf Lifestream
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

    return Lifestream.extend('Lifestream', {

    }, AntHill.prototype);
});
