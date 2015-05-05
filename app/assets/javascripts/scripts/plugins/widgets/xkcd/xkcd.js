/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/xkcd/mvc/xkcd.controller',
    'plugins/widgets/xkcd/mvc/xkcd.model',
    'plugins/widgets/xkcd/mvc/xkcd.view',
    'plugins/widgets/xkcd/mvc/xkcd.event.manager',
    'plugins/widgets/xkcd/mvc/xkcd.permission'
], function defineXkcd(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Xkcd
     * @param containment
     * @param [opts]
     * @constructor
     * @class Xkcd
     * @extends AntHill
     */
    var Xkcd = function Xkcd(containment, opts) {

        /**
         * Define containment
         * @memberOf Xkcd
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Xkcd
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
         * @memberOf Xkcd
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

    return Xkcd.extend('Xkcd', {

    }, AntHill.prototype);
});
