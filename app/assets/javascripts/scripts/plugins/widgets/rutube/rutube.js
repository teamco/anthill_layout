/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/rutube/mvc/rutube.controller',
    'plugins/widgets/rutube/mvc/rutube.model',
    'plugins/widgets/rutube/mvc/rutube.view',
    'plugins/widgets/rutube/mvc/rutube.event.manager',
    'plugins/widgets/rutube/mvc/rutube.permission'
], function defineRutube(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Rutube
     * @param containment
     * @param [opts]
     * @constructor
     * @class Rutube
     * @extends AntHill
     */
    var Rutube = function Rutube(containment, opts) {

        /**
         * Define containment
         * @memberOf Rutube
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Rutube
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
         * @memberOf Rutube
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

    return Rutube.extend('Rutube', {

    }, AntHill.prototype);
});