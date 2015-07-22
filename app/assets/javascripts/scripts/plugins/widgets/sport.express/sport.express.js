/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/sport.express/mvc/sport.express.controller',
    'plugins/widgets/sport.express/mvc/sport.express.model',
    'plugins/widgets/sport.express/mvc/sport.express.view',
    'plugins/widgets/sport.express/mvc/sport.express.event.manager',
    'plugins/widgets/sport.express/mvc/sport.express.permission'
], function defineSportExpress(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define SportExpress
     * @param containment
     * @param [opts]
     * @constructor
     * @class SportExpress
     * @extends AntHill
     */
    var SportExpress = function SportExpress(containment, opts) {

        /**
         * Define containment
         * @memberOf SportExpress
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf SportExpress
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
         * @memberOf SportExpress
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

    return SportExpress.extend('SportExpress', {

    }, AntHill.prototype);
});
