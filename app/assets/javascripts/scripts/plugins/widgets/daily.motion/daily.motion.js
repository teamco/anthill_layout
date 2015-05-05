/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/daily.motion/mvc/daily.motion.controller',
    'plugins/widgets/daily.motion/mvc/daily.motion.model',
    'plugins/widgets/daily.motion/mvc/daily.motion.view',
    'plugins/widgets/daily.motion/mvc/daily.motion.event.manager',
    'plugins/widgets/daily.motion/mvc/daily.motion.permission'
], function defineDailyMotion(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define DailyMotion
     * @param containment
     * @param [opts]
     * @constructor
     * @class DailyMotion
     * @extends AntHill
     */
    var DailyMotion = function DailyMotion(containment, opts) {

        /**
         * Define containment
         * @memberOf DailyMotion
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf DailyMotion
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
            regex: /dai.ly\/(\w+)/,
            mask: '//www.dailymotion.com/embed/video/{id}'
        };

        /**
         * Define MVC
         * @memberOf DailyMotion
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

    return DailyMotion.extend('DailyMotion', {

    }, AntHill.prototype);
});
