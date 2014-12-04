/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/channel.two/mvc/channel.two.controller',
    'plugins/widgets/channel.two/mvc/channel.two.model',
    'plugins/widgets/channel.two/mvc/channel.two.view',
    'plugins/widgets/channel.two/mvc/channel.two.event.manager',
    'plugins/widgets/channel.two/mvc/channel.two.permission'
], function defineChannelTwo(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define ChannelTwo
     * @param containment
     * @param [opts]
     * @constructor
     * @class ChannelTwo
     * @extends AntHill
     */
    var ChannelTwo = function ChannelTwo(containment, opts) {

        /**
         * Define containment
         * @member ChannelTwo
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member ChannelTwo
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
         * @member ChannelTwo
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

    return ChannelTwo.extend('ChannelTwo', {

    }, AntHill.prototype);
});
