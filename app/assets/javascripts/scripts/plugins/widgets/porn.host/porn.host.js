/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/porn.host/mvc/porn.host.controller',
    'plugins/widgets/porn.host/mvc/porn.host.model',
    'plugins/widgets/porn.host/mvc/porn.host.view',
    'plugins/widgets/porn.host/mvc/porn.host.event.manager',
    'plugins/widgets/porn.host/mvc/porn.host.permission'
], function definePornHost(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define PornHost
     * @param containment
     * @param [opts]
     * @constructor
     * @class PornHost
     * @extends AntHill
     */
    var PornHost = function PornHost(containment, opts) {

        /**
         * Define containment
         * @memberOf PornHost
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf PornHost
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
         * @memberOf PornHost
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

    return PornHost.extend('PornHost', {

    }, AntHill.prototype);
});
