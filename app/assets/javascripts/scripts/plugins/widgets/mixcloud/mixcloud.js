/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/mixcloud/mvc/mixcloud.controller',
    'plugins/widgets/mixcloud/mvc/mixcloud.model',
    'plugins/widgets/mixcloud/mvc/mixcloud.view',
    'plugins/widgets/mixcloud/mvc/mixcloud.event.manager',
    'plugins/widgets/mixcloud/mvc/mixcloud.permission'
], function defineMixcloud(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Mixcloud
     * @param containment
     * @param [opts]
     * @constructor
     * @class Mixcloud
     * @extends AntHill
     */
    var Mixcloud = function Mixcloud(containment, opts) {

        /**
         * Define containment
         * @memberOf Mixcloud
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Mixcloud
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
         * @memberOf Mixcloud
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

    return Mixcloud.extend('Mixcloud', {

    }, AntHill.prototype);
});
