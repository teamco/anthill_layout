/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/fapa.tv/mvc/fapa.tv.controller',
    'plugins/widgets/fapa.tv/mvc/fapa.tv.model',
    'plugins/widgets/fapa.tv/mvc/fapa.tv.view',
    'plugins/widgets/fapa.tv/mvc/fapa.tv.event.manager',
    'plugins/widgets/fapa.tv/mvc/fapa.tv.permission'
], function defineFapaTv(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define FapaTv
     * @param containment
     * @param [opts]
     * @constructor
     * @class FapaTv
     * @extends AntHill
     */
    var FapaTv = function FapaTv(containment, opts) {

        /**
         * Define containment
         * @member FapaTv
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member FapaTv
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
         * @member FapaTv
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

    return FapaTv.extend('FapaTv', {

    }, AntHill.prototype);
});
