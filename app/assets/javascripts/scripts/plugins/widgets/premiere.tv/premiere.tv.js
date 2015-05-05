/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/premiere.tv/mvc/premiere.tv.controller',
    'plugins/widgets/premiere.tv/mvc/premiere.tv.model',
    'plugins/widgets/premiere.tv/mvc/premiere.tv.view',
    'plugins/widgets/premiere.tv/mvc/premiere.tv.event.manager',
    'plugins/widgets/premiere.tv/mvc/premiere.tv.permission'
], function definePremiereTv(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define PremiereTv
     * @param containment
     * @param [opts]
     * @constructor
     * @class PremiereTv
     * @extends AntHill
     */
    var PremiereTv = function PremiereTv(containment, opts) {

        /**
         * Define containment
         * @memberOf PremiereTv
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf PremiereTv
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
         * @memberOf PremiereTv
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

    return PremiereTv.extend('PremiereTv', {

    }, AntHill.prototype);
});
