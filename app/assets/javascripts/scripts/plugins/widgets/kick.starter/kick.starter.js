/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/kick.starter/mvc/kick.starter.controller',
    'plugins/widgets/kick.starter/mvc/kick.starter.model',
    'plugins/widgets/kick.starter/mvc/kick.starter.view',
    'plugins/widgets/kick.starter/mvc/kick.starter.event.manager',
    'plugins/widgets/kick.starter/mvc/kick.starter.permission'
], function defineKickStarter(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define KickStarter
     * @param containment
     * @param [opts]
     * @constructor
     * @class KickStarter
     * @extends AntHill
     */
    var KickStarter = function KickStarter(containment, opts) {

        /**
         * Define containment
         * @memberOf KickStarter
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf KickStarter
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
         * @memberOf KickStarter
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

    return KickStarter.extend('KickStarter', {

    }, AntHill.prototype);
});
