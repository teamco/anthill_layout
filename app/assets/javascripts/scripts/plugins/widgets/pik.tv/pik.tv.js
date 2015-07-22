/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/pik.tv/mvc/pik.tv.controller',
    'plugins/widgets/pik.tv/mvc/pik.tv.model',
    'plugins/widgets/pik.tv/mvc/pik.tv.view',
    'plugins/widgets/pik.tv/mvc/pik.tv.event.manager',
    'plugins/widgets/pik.tv/mvc/pik.tv.permission'
], function definePikTv(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define PikTv
     * @param containment
     * @param [opts]
     * @constructor
     * @class PikTv
     * @extends AntHill
     */
    var PikTv = function PikTv(containment, opts) {

        /**
         * Define containment
         * @memberOf PikTv
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf PikTv
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
         * @memberOf PikTv
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

    return PikTv.extend('PikTv', {

    }, AntHill.prototype);
});
