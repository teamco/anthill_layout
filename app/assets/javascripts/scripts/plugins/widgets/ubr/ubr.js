/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/ubr/mvc/ubr.controller',
    'plugins/widgets/ubr/mvc/ubr.model',
    'plugins/widgets/ubr/mvc/ubr.view',
    'plugins/widgets/ubr/mvc/ubr.event.manager',
    'plugins/widgets/ubr/mvc/ubr.permission'
], function defineUbr(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Ubr
     * @param containment
     * @param [opts]
     * @constructor
     * @class Ubr
     * @extends AntHill
     */
    var Ubr = function Ubr(containment, opts) {

        /**
         * Define containment
         * @memberOf Ubr
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Ubr
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
            regex: /^.*(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i,
            mask: 'https://www.youtube.com/embed/{videoId}'
        };

        /**
         * Define MVC
         * @memberOf Ubr
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

    return Ubr.extend('Ubr', {

    }, AntHill.prototype);
});
