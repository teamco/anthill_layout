/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/ren.tv/mvc/ren.tv.controller',
    'plugins/widgets/ren.tv/mvc/ren.tv.model',
    'plugins/widgets/ren.tv/mvc/ren.tv.view',
    'plugins/widgets/ren.tv/mvc/ren.tv.event.manager',
    'plugins/widgets/ren.tv/mvc/ren.tv.permission'
], function defineRenTv(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define RenTv
     * @param containment
     * @param [opts]
     * @constructor
     * @class RenTv
     * @extends AntHill
     */
    var RenTv = function RenTv(containment, opts) {

        /**
         * Define containment
         * @property RenTv
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property RenTv
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
         *          floating: boolean,
         *          padding: {
         *              top: number,
         *              right: number,
         *              bottom: number,
         *              left: number
         *          }
         *      }
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
         * @property RenTv
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

    return RenTv.extend('RenTv', {}, AntHill.prototype);
});
