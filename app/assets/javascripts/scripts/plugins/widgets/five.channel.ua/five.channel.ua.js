/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/five.channel.ua/mvc/five.channel.ua.controller',
    'plugins/widgets/five.channel.ua/mvc/five.channel.ua.model',
    'plugins/widgets/five.channel.ua/mvc/five.channel.ua.view',
    'plugins/widgets/five.channel.ua/mvc/five.channel.ua.event.manager',
    'plugins/widgets/five.channel.ua/mvc/five.channel.ua.permission'
], function defineFiveChannelUa(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define FiveChannelUa
     * @param containment
     * @param [opts]
     * @constructor
     * @class FiveChannelUa
     * @extends AntHill
     */
    var FiveChannelUa = function FiveChannelUa(containment, opts) {

        /**
         * Define containment
         * @member FiveChannelUa
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member FiveChannelUa
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
         * @member FiveChannelUa
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

    return FiveChannelUa.extend('FiveChannelUa', {

    }, AntHill.prototype);
});
