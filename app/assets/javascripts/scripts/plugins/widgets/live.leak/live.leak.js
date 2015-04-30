/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/live.leak/mvc/live.leak.controller',
    'plugins/widgets/live.leak/mvc/live.leak.model',
    'plugins/widgets/live.leak/mvc/live.leak.view',
    'plugins/widgets/live.leak/mvc/live.leak.event.manager',
    'plugins/widgets/live.leak/mvc/live.leak.permission'
], function defineLiveLeak(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define LiveLeak
     * @param containment
     * @param [opts]
     * @constructor
     * @class LiveLeak
     * @extends AntHill
     */
    var LiveLeak = function LiveLeak(containment, opts) {

        /**
         * Define containment
         * @memberOf LiveLeak
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf LiveLeak
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
            },
            regex: /ll_embed\?f=?(\w+)/,
            mask: 'http://www.liveleak.com/ll_embed?f={id}'
        };

        /**
         * Define MVC
         * @memberOf LiveLeak
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

    return LiveLeak.extend('LiveLeak', {

    }, AntHill.prototype);
});
