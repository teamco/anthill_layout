/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/issuu/mvc/issuu.controller',
    'plugins/widgets/issuu/mvc/issuu.model',
    'plugins/widgets/issuu/mvc/issuu.view',
    'plugins/widgets/issuu/mvc/issuu.event.manager',
    'plugins/widgets/issuu/mvc/issuu.permission'
], function defineIssuu(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Issuu
     * @param containment
     * @param [opts]
     * @constructor
     * @class Issuu
     * @extends AntHill
     */
    var Issuu = function Issuu(containment, opts) {

        /**
         * Define containment
         * @memberOf Issuu
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Issuu
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
         * @memberOf Issuu
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

    return Issuu.extend('Issuu', {

    }, AntHill.prototype);
});
