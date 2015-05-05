/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/ictv/mvc/ictv.controller',
    'plugins/widgets/ictv/mvc/ictv.model',
    'plugins/widgets/ictv/mvc/ictv.view',
    'plugins/widgets/ictv/mvc/ictv.event.manager',
    'plugins/widgets/ictv/mvc/ictv.permission'
], function defineIctv(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Ictv
     * @param containment
     * @param [opts]
     * @constructor
     * @class Ictv
     * @extends AntHill
     */
    var Ictv = function Ictv(containment, opts) {

        /**
         * Define containment
         * @memberOf Ictv
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Ictv
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
         * @memberOf Ictv
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

    return Ictv.extend('Ictv', {

    }, AntHill.prototype);
});
